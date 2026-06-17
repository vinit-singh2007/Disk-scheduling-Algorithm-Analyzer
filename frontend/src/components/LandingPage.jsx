import React, { useEffect, useState } from 'react';

const LandingPage = ({ onStart }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[30%] left-[60%] w-[30%] h-[30%] rounded-full bg-cyan-600/10 blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>

      {/* Floating Elements (representing disk tracks/sectors) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 select-none pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full border border-blue-500/20 border-dashed animate-[spin_40s_linear_infinite]"></div>
        <div className="absolute w-[450px] h-[450px] rounded-full border border-indigo-500/30 border-dotted animate-[spin_30s_linear_infinite_reverse]"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-400/20 animate-[spin_20s_linear_infinite]"></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center text-center p-8 max-w-4xl mx-auto transition-all duration-1000 transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        
        {/* Animated Icon */}
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 rounded-full animate-pulse group-hover:opacity-75 transition-opacity duration-500"></div>
          <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl flex items-center justify-center relative z-10 shadow-2xl overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-tr before:from-blue-500/10 before:to-transparent">
            {/* Disk Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-400 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 12h3.5" />
            </svg>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
            Disk Scheduling
            <br />
            <span className="text-white">Algorithm Analyzer</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Visualize, analyze, and compare SCAN and C-SCAN disk scheduling algorithms with interactive graphs and real-time computation sequences.
          </p>
        </div>

        {/* Call to Action */}
        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 ease-in-out bg-transparent border-0 rounded-full cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        >
          <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"></div>
          <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 blur-md opacity-40 group-hover:opacity-60 group-hover:blur-lg transition-all duration-300 group-hover:scale-105"></div>
          
          <span className="relative z-10 flex items-center gap-2 text-lg">
            Get Started
            <svg 
              className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </span>
        </button>

      </div>
    </div>
  );
};

export default LandingPage;
