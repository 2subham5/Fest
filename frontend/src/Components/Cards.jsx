import React, { useState, useEffect, useRef } from 'react';

const Cards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  // Sample image placeholders - replace with actual festival images
  const galleryImages = [
    {
      id: 1,
      title: "Opening Ceremony",
      description: "The grand opening with spectacular performances",
      size: "large", // large, medium, small
      src : "/card2.jpg",
      delay: 100
    },
    {
      id: 2,
      title: "Music",
      description: "Performances",
      size: "medium",
      src : "/card3.jpg",
      delay: 200
    },
    {
      id: 3,
      title: "Music Concert",
      description: "Electrifying musical performances",
      size: "medium",
      src : "/card9.jpg",
      delay: 300
    },
    {
      id: 4,
      title: "Art Exhibition",
      description: "Symphony on display",
      size: "large",
      src : "/card10.jpg",
      delay: 400
    },
    {
      id: 5,
      title: "Moments",
      description: "Feel Good moments",
      size: "medium",
      src : "/card1.jpg",
      delay: 500
    },
    {
      id: 6,
      title: "Stage Performance",
      description: "Music, crowd and all",
      size: "medium",
      src : "/card8.jpg",
      delay: 600
    },
    {
      id: 7,
      title: "Crowd Moments",
      description: "Audience enjoying the festivities",
      size: "small",
      src : "/card5.jpg",
      delay: 700
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getCardSize = (size) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2 h-80 md:h-96';
      case 'medium':
        return 'md:col-span-1 md:row-span-1 h-64';
      case 'small':
        return 'md:col-span-1 md:row-span-1 h-48';
      default:
        return 'md:col-span-1 md:row-span-1 h-64';
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20  overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/10 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
       <div className="relative z-10 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent">
          Glimpses from Festivibe 2024
        </h2>
        <div className="mt-3 w-24 h-1 mx-auto bg-gradient-to-r from-purple-400 to-blue-500 rounded-full" />
      </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className={`
                ${getCardSize(image.size)}
                group cursor-pointer relative overflow-hidden rounded-2xl bg-gray-200 shadow-lg
                transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25
                ${isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
                }
              `}
              style={{
                transitionDelay: isVisible ? `${image.delay}ms` : '0ms'
              }}
              onMouseEnter={() => setHoveredCard(image.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image placeholder - replace with actual images */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 via-blue-500/30 to-purple-600/30" />
              
              {/* Placeholder pattern */}
              {/* <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-white/5 via-transparent to-white/10" />
              </div> */}

              {/* Replace above placeholders with actual images: */}
              <img 
                src={image.src} 
                alt={image.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content overlay */}
              <div className={`
                absolute bottom-0 left-0 right-0 p-4 text-white
                transform translate-y-full group-hover:translate-y-0
                transition-transform duration-300 ease-out
                ${hoveredCard === image.id ? 'opacity-100' : 'opacity-0'}
              `}>
                <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                <p className="text-sm text-gray-200">{image.description}</p>
              </div>

              {/* Hover glow effect */}
              <div className={`
                absolute inset-0 rounded-2xl transition-all duration-300
                ${hoveredCard === image.id 
                  ? 'bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20' 
                  : ''
                }
              `} />

              {/* Image icon placeholder */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/30 text-4xl">
                📸
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {/* <div className={`text-center transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button className="px-8 py-3 bg-transparent border-2 border-purple-500 text-purple-400 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30">
            View More
          </button>
        </div> */}

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-cyan-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-purple-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-purple-300 rounded-full opacity-30 animate-pulse" style={{animationDelay: '0.5s'}} />
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </section>
  );
};

export default Cards;