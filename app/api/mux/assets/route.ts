import { NextRequest, NextResponse } from 'next/server';
import mux from '@/lib/mux';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uploadId = searchParams.get('uploadId');

    if (!uploadId) {
      return NextResponse.json(
        { error: 'Upload ID is required' },
        { status: 400 }
      );
    }

    const upload = await mux.video.uploads.retrieve(uploadId);
    
    if (upload.asset_id) {
      const asset = await mux.video.assets.retrieve(upload.asset_id);
      return NextResponse.json({
        status: upload.status,
        asset: {
          id: asset.id,
          playback_ids: asset.playback_ids,
          status: asset.status,
          duration: asset.duration,
        },
      });
    }

    return NextResponse.json({
      status: upload.status,
    });
  } catch (error) {
    console.error('Error fetching Mux asset:', error);
    return NextResponse.json(
      { error: 'Failed to fetch asset' },
      { status: 500 }
    );
  }
}
