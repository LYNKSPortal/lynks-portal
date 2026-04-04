import { NextRequest, NextResponse } from 'next/server';
import mux from '@/lib/mux';

export async function POST(request: NextRequest) {
  try {
    const upload = await mux.video.uploads.create({
      cors_origin: '*',
      new_asset_settings: {
        playback_policy: ['public'],
        encoding_tier: 'baseline',
      },
    });

    return NextResponse.json({
      uploadId: upload.id,
      url: upload.url,
    });
  } catch (error) {
    console.error('Error creating Mux upload:', error);
    return NextResponse.json(
      { error: 'Failed to create upload URL' },
      { status: 500 }
    );
  }
}
