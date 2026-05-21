"use client";
import { useEffect, useState } from 'react';

export default function ExtractPage() {
  const [status, setStatus] = useState('Initializing...');

  useEffect(() => {
    const extractPdf = async (
      pdfjsLib: typeof import('pdfjs-dist'),
      pdfUrl: string,
      filenamePrefix: string,
      scale: number = 2
    ) => {
      setStatus(`Loading ${pdfUrl}...`);
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      
      for (let i = 1; i <= pdf.numPages; i++) {
        setStatus(`Extracting ${pdfUrl} Page ${i}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvas,
          canvasContext: context!,
          viewport: viewport
        };
        
        await page.render(renderContext).promise;
        const base64 = canvas.toDataURL('image/png');
        
        const filename = `${filenamePrefix}-${i}.png`;
        setStatus(`Saving ${filename}...`);
        
        await fetch('/api/save-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename, base64 })
        });
      }
    };

    const run = async () => {
      try {
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        await extractPdf(pdfjsLib, '/ktl_logo.pdf', 'extracted-logo', 3);
        await extractPdf(pdfjsLib, '/ktl_profile.pdf', 'extracted-profile', 2);
        setStatus('All done! You can close this page.');
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setStatus(`Error: ${message}`);
      }
    };

    run();
  }, []);

  return (
    <div style={{ padding: 50, color: 'white', fontSize: 24 }}>
      <h1>PDF Image Extractor</h1>
      <p>{status}</p>
    </div>
  );
}
