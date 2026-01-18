import { useEffect, useRef } from "react";

const YOUTUBE_VIDEO_ID = "ePdbj2bZ-Ro";
const LOOP_AT_SECONDS = 60;

const HeroSection = () => {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }

      // Load script ONLY ONCE
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = initPlayer;
    };

    const initPlayer = () => {
      if (cancelled || playerRef.current) return;

      playerRef.current = new window.YT.Player("hero-youtube-player", {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();

            // Loop logic (start AFTER ready)
            intervalRef.current = setInterval(() => {
              const time = event.target.getCurrentTime();
              if (time >= LOOP_AT_SECONDS) {
                event.target.seekTo(0, true);
              }
            }, 1000);
          },
        },
      });
    };

    // ⏱ Delay loading so page can render first (IMPORTANT)
    const timeout = setTimeout(loadYouTubeAPI, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      clearInterval(intervalRef.current);

      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* YouTube Player */}
      <div className="absolute inset-0">
        <div
          id="hero-youtube-player"
          className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <div className="mb-40 space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
            Galaxy Event
          </h1>
          <p className="text-xl md:text-2xl">
            Oct. 21, 2025 at 10:00 PM EDT
          </p>
          <p className="text-xl md:text-2xl pb-4">
            Live on Samsung.com
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
            Reserve now
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-5 left-5 text-white/50 z-20">
        <span className="text-2xl">&copy;</span>
      </div>

      {/* Feedback */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 -rotate-90 origin-bottom-right p-2 bg-gray-700/80 text-white text-xs font-medium z-20">
        FEEDBACK
      </div>
    </div>
  );
};

export default HeroSection;
