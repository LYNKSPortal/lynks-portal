'use client';

import { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import MuxPlayer from '@mux/mux-player-react';

interface UploadedVideo {
  playbackId: string;
  assetId: string;
  status: string;
}

export default function VideoUploader() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState<UploadedVideo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const response = await fetch('/api/mux/upload', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to create upload URL');
      }

      const { uploadId, url } = await response.json();

      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(progress);
        }
      });

      xhr.addEventListener('load', async () => {
        if (xhr.status === 200) {
          await pollForAsset(uploadId);
        } else {
          throw new Error('Upload failed');
        }
      });

      xhr.addEventListener('error', () => {
        throw new Error('Upload failed');
      });

      xhr.open('PUT', url);
      xhr.send(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setUploading(false);
    }
  };

  const pollForAsset = async (uploadId: string) => {
    const maxAttempts = 60;
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await fetch(`/api/mux/assets?uploadId=${uploadId}`);
        const data = await response.json();

        if (data.asset && data.asset.playback_ids && data.asset.playback_ids.length > 0) {
          setUploadedVideo({
            playbackId: data.asset.playback_ids[0].id,
            assetId: data.asset.id,
            status: data.asset.status,
          });
          setUploading(false);
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 2000);
        } else {
          throw new Error('Timeout waiting for video processing');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to process video');
        setUploading(false);
      }
    };

    poll();
  };

  return (
    <div className="w-full">
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <h3 className="text-2xl font-bold text-white mb-6">Upload Video</h3>

        {!uploadedVideo && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full bg-[#dbf72c] text-[#0c0f17] px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-[#dbf72c]/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Uploading... {uploadProgress}%
                </>
              ) : (
                <>
                  <Upload size={24} />
                  Select Video File
                </>
              )}
            </button>

            {uploading && (
              <div className="mt-4">
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-[#dbf72c] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2 text-center">
                  {uploadProgress < 100 ? 'Uploading...' : 'Processing video...'}
                </p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-center gap-2 text-red-400">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}

        {uploadedVideo && (
          <div>
            <div className="mb-4 p-4 bg-green-900/20 border border-green-500 rounded-lg flex items-center gap-2 text-green-400">
              <CheckCircle size={20} />
              <span>Video uploaded successfully!</span>
            </div>

            <div className="rounded-lg overflow-hidden">
              <MuxPlayer
                playbackId={uploadedVideo.playbackId}
                metadata={{
                  video_title: 'Uploaded Video',
                }}
                streamType="on-demand"
                style={{ width: '100%', aspectRatio: '16/9' }}
              />
            </div>

            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">
                <strong className="text-white">Asset ID:</strong> {uploadedVideo.assetId}
              </p>
              <p className="text-sm text-gray-400 mb-2">
                <strong className="text-white">Playback ID:</strong> {uploadedVideo.playbackId}
              </p>
              <p className="text-sm text-gray-400">
                <strong className="text-white">Status:</strong> {uploadedVideo.status}
              </p>
            </div>

            <button
              onClick={() => {
                setUploadedVideo(null);
                setUploadProgress(0);
              }}
              className="mt-4 w-full bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Upload Another Video
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
