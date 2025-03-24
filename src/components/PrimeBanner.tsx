import { Play, Star } from "lucide-react";

export function PrimeBanner() {
  const handleStartWatching = () => {
    window.location.href = "https://www.primevideo.com/";
  };

  return (
    <div className="relative mb-12 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
      <img
        src="https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=1600&auto=format&fit=crop&q=80"
        alt="Prime Video Banner"
        className="w-full h-[500px] object-cover"
      />
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Stream Exclusive Content
            </h2>
            <p className="text-xl text-gray-200 mb-6">
              Watch the latest movies, TV shows, and award-winning Amazon
              Originals
            </p>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
              </div>
              <span className="text-white">4.8/5 from 250K+ reviews</span>
            </div>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg inline-flex items-center transition-colors duration-300"
              onClick={handleStartWatching}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Watching Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
