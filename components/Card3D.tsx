import React, { useRef, useState } from 'react';

interface Card3DProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  hoverColor: string;
  shadowColor: string;
  tooltip?: string;
}

const Card3D: React.FC<Card3DProps> = ({ icon, label, onClick, hoverColor, shadowColor, tooltip }) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / (rect.height / 2)) * 15;
    const rotateY = (mouseX / (rect.width / 2)) * -15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovering(true)}
      title={tooltip}
      className="group flex flex-col items-center space-y-4 transition-transform focus:outline-none perspective"
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl border border-slate-300 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
          isHovering
            ? `border-${hoverColor} shadow-lg shadow-${shadowColor}`
            : ''
        }`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(20px)`,
          transformStyle: 'preserve-3d' as const,
          transition: isHovering ? 'none' : 'transform 0.2s ease-out',
        }}
      >
        <div
          style={{
            transform: 'translateZ(40px)',
            transformStyle: 'preserve-3d' as const,
          }}
          className={`text-slate-700 dark:text-white ${
            isHovering ? `text-${hoverColor}` : ''
          } transition-colors`}
        >
          {icon}
        </div>
      </div>
      <span className="text-lg font-medium text-slate-700 dark:text-white tracking-widest uppercase">
        {label}
      </span>
    </button>
  );
};

export default Card3D;
