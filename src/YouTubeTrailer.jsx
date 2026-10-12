import React, { useState } from "react";

export default function YouTubeTrailer({ videoId, poster, title, language }) {
  const [loaded, setLoaded] = useState(false);
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) return null;
  const chinese = language === "zh";
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  return (
    <div className="youtube-trailer">
      <div className="youtube-frame">
        {loaded ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            className="youtube-launch"
            type="button"
            onClick={() => setLoaded(true)}
            aria-label={
              chinese ? "播放 Two Sisters 预告片" : "Play Two Sisters trailer"
            }
          >
            <img src={poster} alt="" loading="lazy" />
            <span className="youtube-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
            <span className="youtube-label">
              {chinese ? "播放预告片 / YOUTUBE" : "WATCH TRAILER / YOUTUBE"}
            </span>
          </button>
        )}
      </div>
      <a
        className="youtube-external"
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {chinese ? "在 YouTube 上观看" : "Watch on YouTube"}
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
