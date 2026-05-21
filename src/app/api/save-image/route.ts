import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { filename, base64 } = await request.json();
    if (!filename || !base64) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

    const base64Data = base64.replace(/^data:image\/png;base64,/, "");
    const filepath = path.join(process.cwd(), 'public', filename);
    
    fs.writeFileSync(filepath, base64Data, 'base64');
    
    return NextResponse.json({ success: true, filepath });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
