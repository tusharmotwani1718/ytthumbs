import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, TrendingUp, Users, Play } from "lucide-react";

// Using 6 duplicated examples for demo purposes, adjust as needed!
const exampleThumbnails = [
  {
    before: "/images/hc.png",
    after: "/images/edited.png"
  },
  {
    before: "/images/sg.png",
    after: "/images/edited_sg.png"
  },
  {
    before: "/images/pg.webp",
    after: "/images/pg_enhanced.png"
  }
]

const stats = [
  { icon: Users, value: "50K+", label: "Creators Trust Us" },
  { icon: Zap, value: "2M+", label: "Thumbnails Generated" },
  { icon: TrendingUp, value: "300%", label: "Average CTR Boost" },
];

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-gray-900 via-[#161618] to-gray-900 min-h-screen text-gray-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-sm">
              <Play className="w-4 h-4 fill-current" />
              AI-Powered Thumbnail Magic
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
            Make Your YouTube{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-orange-400 animate-pulse">
              Thumbnails Pop!
            </span>
          </h1>

          <p className="max-w-4xl mx-auto text-xl md:text-2xl text-gray-300 font-medium mb-12 leading-relaxed">
            Transform ordinary photos into click-magnet thumbnails in seconds.
            <span className="text-red-400 font-semibold"> Stand out, grow faster, go viral.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link
              to="/login"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 font-bold px-10 py-4 rounded-full text-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-red-500/50"
            >
              Try YTThumbs Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <button className="group inline-flex items-center gap-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 backdrop-blur-sm">
              <Play className="w-5 h-5 fill-current text-red-400 group-hover:scale-110 transition-transform duration-300" />
              Watch Demo
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map(({ icon: Icon, value, label }, idx) => (
              <div key={idx} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-full mb-3 group-hover:bg-red-500/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-red-400" />
                </div>
                <div className="text-3xl font-black text-white mb-1">{value}</div>
                <div className="text-gray-400 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              From{" "}
              <span className="text-gray-500 line-through decoration-red-500 decoration-4">
                Boring
              </span>{" "}
              to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                Viral
              </span>
              <br />
              <span className="text-gray-300">In Just Seconds</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See the magic happen. Real photos, real results, real growth.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {exampleThumbnails.map((item, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-red-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/10"
              >
                <div className="space-y-6">
                  {/* Before Image */}
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 z-10">
                      <span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        Before
                      </span>
                    </div>
                    <div className="rounded-2xl overflow-hidden border-2 border-gray-600 shadow-lg">
                      <img
                        src={item.before}
                        alt="Original"
                        className="w-full h-75 object-cover grayscale brightness-75 group-hover:brightness-50 transition-all duration-500"
                      />
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="bg-red-500 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <ArrowRight className="w-6 h-6 text-white rotate-90" />
                    </div>
                  </div>

                  {/* After Image */}
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 z-10">
                      <span className="bg-gradient-to-r from-red-500 to-red-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        After ✨
                      </span>
                    </div>
                    <div className="rounded-2xl overflow-hidden border-2 border-red-500 shadow-xl shadow-red-500/20">
                      <img
                        src={item.after}
                        alt="Generated Thumbnail"
                        className="w-full h-75 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm font-medium">Click-through rate increased by</p>
                    <p className="text-2xl font-black text-red-400">+284%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 px-6">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              10x Your Views?
            </span>
          </h3>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of creators who've transformed their channels with YTThumbs's AI magic.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/login"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-500 hover:via-red-400 hover:to-orange-400 font-black px-12 py-5 rounded-full text-xl shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-red-500/50"
            >
              Start Creating for Free
              <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            No credit card required • Generate 5 thumbnails free • Upgrade anytime
          </p>
        </div>
      </section>
    </main>
  );
}
