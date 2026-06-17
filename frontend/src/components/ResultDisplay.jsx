import React from 'react';

const ResultDisplay = ({ result, title }) => {
  if (!result) return null;

  return (
    <div className="h-full bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800 flex flex-col justify-start animate-fade-in">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-4 border-b border-slate-800 pb-2">
        {title || "Analysis Results"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 group-hover:bg-indigo-500 transition-colors"></div>
          <p className="text-sm text-slate-400 font-medium mb-1">Algorithm Executed</p>
          <p className="text-2xl font-bold text-white tracking-tight">{result.algorithm}</p>
          <span className="text-xs font-semibold px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full mt-2 inline-block shadow-sm">
            Dir: {result.direction}
          </span>
        </div>
        
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 group-hover:bg-teal-500 transition-colors"></div>
          <p className="text-sm text-slate-400 font-medium mb-1">Total Seek Time</p>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-extrabold text-white">{result.seek_time}</p>
            <p className="text-sm font-medium text-slate-500">cylinders</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold text-slate-300 mb-2">Seek Sequence:</h3>
        <div className="bg-slate-950 rounded-lg p-4 max-h-48 overflow-y-auto custom-scrollbar shadow-inner relative group border border-slate-800">
            <div className="flex flex-wrap gap-2 text-slate-200 font-mono text-sm leading-relaxed justify-start items-center">
            {result.seek_sequence.map((pos, index) => (
                <React.Fragment key={index}>
                <span className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded transition-colors border border-slate-700 shadow-sm text-slate-200">
                    {pos}
                </span>
                {index < result.seek_sequence.length - 1 && (
                    <span className="text-slate-600 font-bold opacity-70 group-hover:opacity-100 transition-opacity">→</span>
                )}
                </React.Fragment>
            ))}
            </div>
            {result.seek_sequence.length === 0 && (
                <p className="text-slate-500 italic text-center py-2">No sequence generated.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
