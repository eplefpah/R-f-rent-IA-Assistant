import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

interface Satellite {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  delay: number;
}

const SpaceBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [styles, setStyles] = useState<string>('');

  useEffect(() => {
    // Generate stars
    const generatedStars: Star[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generatedStars);

    // Generate satellites
    const generatedSatellites: Satellite[] = Array.from({ length: 12 }, (_, i) => {
      const startSide = Math.random() > 0.5 ? 'left' : 'top';
      let startX, startY, endX, endY;

      if (startSide === 'left') {
        startX = -5;
        startY = Math.random() * 100;
        endX = 105;
        endY = startY + (Math.random() - 0.5) * 40;
      } else {
        startX = Math.random() * 100;
        startY = -5;
        endX = startX + (Math.random() - 0.5) * 40;
        endY = 105;
      }

      return {
        id: i,
        startX,
        startY,
        endX,
        endY,
        duration: Math.random() * 15 + 20,
        delay: i * 2,
      };
    });
    setSatellites(generatedSatellites);

    // Generate CSS for each satellite with unique keyframes
    const satelliteStyles = generatedSatellites.map((sat) => `
      @keyframes satelliteMove${sat.id} {
        0% {
          transform: translate(${sat.startX}%, ${sat.startY}%);
          opacity: 0;
        }
        5% {
          opacity: 1;
        }
        95% {
          opacity: 1;
        }
        100% {
          transform: translate(${sat.endX}%, ${sat.endY}%);
          opacity: 0;
        }
      }
    `).join('');

    setStyles(satelliteStyles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--opacity); }
          50% { opacity: calc(var(--opacity) * 0.3); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(15px); }
        }

        .star {
          position: absolute;
          background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 70%);
          border-radius: 50%;
          box-shadow: 0 0 4px rgba(255,255,255,0.6);
        }

        .satellite {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #60a5fa;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(96, 165, 250, 1), 0 0 12px rgba(96, 165, 250, 0.8);
          filter: drop-shadow(0 0 4px rgba(96, 165, 250, 0.8));
        }

        ${styles}
      `}</style>

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="star dark:block hidden"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--opacity': star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite, float ${star.duration * 2}s ease-in-out infinite`,
          } as React.CSSProperties}
        />
      ))}

      {/* Satellites */}
      {satellites.map((satellite) => (
        <div
          key={`satellite-${satellite.id}`}
          className="satellite"
          style={{
            animation: `satelliteMove${satellite.id} ${satellite.duration}s linear infinite`,
            animationDelay: `${satellite.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Light stars for light mode */}
      {stars.slice(0, 20).map((star) => (
        <div
          key={`light-star-${star.id}`}
          className="star light:block hidden"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size * 0.6}px`,
            height: `${star.size * 0.6}px`,
            '--opacity': star.opacity * 0.4,
            animation: `twinkle ${star.duration}s ease-in-out infinite, float ${star.duration * 2}s ease-in-out infinite`,
            background: 'radial-gradient(circle, rgba(100,116,139,1) 0%, rgba(100,116,139,0.3) 70%)',
            boxShadow: '0 0 2px rgba(100,116,139,0.4)',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default SpaceBackground;
