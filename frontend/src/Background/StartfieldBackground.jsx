import React, { useState, useEffect, useRef } from 'react';

const StarfieldBackground = () => {
  const [stars, setStars] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Generate initial stars
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      const starCount = 150;
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 2 + 1,
          baseOpacity: Math.random() * 0.6 + 0.4,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Animate twinkling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStars(prevStars => 
        prevStars.map(star => {
          const distanceFromMouse = Math.sqrt(
            Math.pow(star.x - mousePosition.x, 2) + 
            Math.pow(star.y - mousePosition.y, 2)
          );
          
          const mouseInfluence = Math.max(0, 1 - (distanceFromMouse / 30));
          const twinkleIntensity = 0.3 + (mouseInfluence * 0.7);
          
          return {
            ...star,
            opacity: star.baseOpacity + 
              (Math.sin(Date.now() * 0.001 * star.twinkleSpeed) * 0.4 * twinkleIntensity),
            size: star.size * (1 + mouseInfluence * 0.5),
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {/* Animated stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white transition-all duration-75 ease-out"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${Math.max(1, star.size)}px`,
            height: `${Math.max(1, star.size)}px`,
            opacity: Math.max(0.1, Math.min(1, star.opacity)),
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity * 0.5})`,
          }}
        />
      ))}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-30" />
      
      {/* Moving light effect following mouse */}
      <div
        className="absolute w-96 h-96 rounded-full transition-all duration-300 ease-out pointer-events-none"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 30%, transparent 70%)`,
        }}
      />

      {/* Content overlay */}
    

      {/* Example of additional content that would go over the background */}
      {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-center text-white opacity-60">
        <p className="text-sm">Move your mouse to interact with the stars</p>
      </div> */}
    </div>
  );
};

export default StarfieldBackground;