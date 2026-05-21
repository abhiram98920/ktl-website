/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const pdf2img = require('pdf-img-convert');

async function extract() {
  console.log("Converting Logo...");
  try {
    const logoOutput = await pdf2img.convert('../KTL_Interior_logo_.pdf', {
      width: 1000,
      page_numbers: [1]
    });
    fs.writeFileSync('./public/logo-from-pdf.png', logoOutput[0]);
    console.log("Logo converted and saved to public/logo-from-pdf.png");
  } catch (err) {
    console.error("Error converting logo:", err);
  }

  console.log("Extracting pages from KTL_Profile_.pdf...");
  try {
    const profileOutput = await pdf2img.convert('../KTL_Profile_.pdf', {
      width: 1200
    });
    for (let i = 0; i < profileOutput.length; i++) {
      fs.writeFileSync(`./public/profile-page-${i + 1}.png`, profileOutput[i]);
      console.log(`Saved profile-page-${i + 1}.png`);
    }
  } catch (err) {
    console.error("Error converting profile PDF:", err);
  }
}

extract();
