import React from 'react';

const AboutEterniaLogo = () => {
  return (
    <section className="relative py-20 text-white overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Logo Display */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl scale-150" />

            {/* Logo Container */}
            <div className="relative">
              {/* Since we can't embed the actual image, I'll create a stylized placeholder */}


              {/* Replace this placeholder with your actual logo: */}
              <img src="/logo3.png" alt="ETERNIA Logo" className="w-200 h-200 object-contain" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent">
                ABOUT ETERNIA
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full" />
            </div>

            {/* Description paragraphs */}
            <div className="space-y-4 text-gray-200 leading-relaxed">
              <p className="text-lg">
                The logo of ETERNIA 2026, themed “THE MYSTIC FUSION,” symbolizes the harmony of opposites and the magical convergence of diverse worlds. At its heart, the Yin-Yang represents the eternal balance between light and darkness, chaos and serenity, while the intertwining branches and delicate blossoms signify growth, interconnectedness, and renewal.

              </p>

              <p className="text-lg">

                The celestial moon and stars evoke mystery, imagination, and infinite possibilities, while the intricate circular patterns reflect unity and eternity. Together, these elements embody the spirit of THE MYSTIC FUSION — where art meets science, tradition embraces innovation, and diverse talents unite in an extraordinary celebration of creativity, culture, and endless possibilities.

              </p>

              {/* <p className="text-lg">
                The interplay of aqua blue and crimson red represents the perfect balance between calm and energy, mirroring ETERNIA’s essence — where every idea, performance, and emotion connects seamlessly.
                Together, these elements form the NEXUS — a radiant intersection of art, culture, and celebration, where every wave of joy and every spark of creativity flows into one eternal rhythm.

              </p> */}
            </div>

            {/* Decorative elements */}

          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-10 left-20 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-pulse" />
        <div className="absolute top-32 right-16 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-orange-400 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 right-1/3 w-3 h-3 bg-purple-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />

        {/* Subtle pattern overlay */}
        {/* <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] pointer-events-none" /> */}
      </div>
    </section>
  );
};

export default AboutEterniaLogo;