export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <div className="w-full max-w-md p-8 rounded-2xl bg-slate-800/60 backdrop-blur-xl shadow-2xl border border-slate-700">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-white">
            Loading Your Experience
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Preparing everything for you...
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-8">
          <div
            className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
            style={{
              animation: "loadingBar 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Skeleton UI */}
        <div className="space-y-4">
          <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-slate-700 rounded w-4/6 animate-pulse"></div>
        </div>

      </div>

      {/* Inline animation (no tailwind.config.js needed) */}
      <style>
        {`
          @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
}