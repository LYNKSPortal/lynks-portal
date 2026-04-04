import VideoUploader from '@/components/VideoUploader';

export default function AdminVideos() {
  return (
    <div className="min-h-screen bg-[#0c0f17]">
      <section className="bg-[#0c0f17] text-white py-20 border-b border-gray-800">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Video Management</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Upload and manage your video content with Mux
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0c0f17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoUploader />
        </div>
      </section>
    </div>
  );
}
