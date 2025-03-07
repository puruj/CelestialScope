import React, { useState } from 'react';
import { ApodData } from '../services/nasaApi';

interface ApodCardProps {
  apod: ApodData;
}

const ApodCard: React.FC<ApodCardProps> = ({ apod }) => {
  const [showInfo, setShowInfo] = useState(false);

  // 1) If the API didn’t return a valid URL for some reason, show a fallback message
  if (!apod.url) {
    return (
      <div className="hero min-h-screen bg-black flex flex-col justify-center items-center text-white">
        <h2 className="text-2xl mb-2">
          No APOD media found for "{apod.date}"
        </h2>
        <p className="mb-4">
          Please try a different date or ensure your NASA API key is correct.
        </p>
        <button
          className="btn btn-info"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    );
  }

  // 2) If APOD is a VIDEO
  if (apod.media_type === 'video') {
    return (
      <div className="hero min-h-screen bg-black">
        <div className="hero-content text-center text-neutral-content flex flex-col max-w-2xl mx-auto">
          <div className="w-full md:w-3/4 lg:w-3/4">
            <iframe
              src={apod.url}
              title={apod.title}
              className="w-full h-64 md:h-96"
              allowFullScreen
            />
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-bold">
            {apod.title}
          </h1>
          <p className="text-sm md:text-base opacity-80 mt-2">
            Date: {apod.date}
          </p>

          <button
            className="btn btn-info mt-4"
            onClick={() => setShowInfo(!showInfo)}
          >
            {showInfo ? 'Hide Info' : 'Show Info'}
          </button>

          {showInfo && (
            <div className="mt-4 bg-black/60 p-4 rounded-md">
              <p>{apod.explanation}</p>
              {apod.copyright && (
                <p className="text-xs opacity-60 mt-2">
                  © {apod.copyright}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3) Otherwise, APOD is an IMAGE
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${apod.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for readability */}
      <div className="hero-overlay bg-black/10"></div>

      {/* Hero content */}
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-xl">
          <h1 className="mb-5 text-3xl md:text-5xl font-bold">
            {apod.title}
          </h1>
          <p className="mb-2 text-sm md:text-base opacity-80">
            Date: {apod.date}
          </p>

          <button
            className="btn btn-info mb-4"
            onClick={() => setShowInfo(!showInfo)}
          >
            {showInfo ? 'Hide Info' : 'Show Info'}
          </button>

          {showInfo && (
            <div className="bg-black/60 p-4 rounded-md transition-all duration-300">
              <p>{apod.explanation}</p>
              {apod.copyright && (
                <p className="text-xs opacity-60 mt-2">
                  © {apod.copyright}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApodCard;
