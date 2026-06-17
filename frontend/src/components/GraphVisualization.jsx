import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';

const GraphVisualization = ({ result, head }) => {
  if (!result || !result.seek_sequence) {
    return (
        <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800 h-96 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500 border-2 border-dashed border-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
             </div>
             <p className="text-slate-400 font-medium">Run an algorithm to view the disk movement graph</p>
        </div>
    );
  }

  // Define proper data sequence for Recharts
  const data = [
    { step: 0, track: parseInt(head) },
    ...result.seek_sequence.map((track, index) => ({
      step: index + 1,
      track
    }))
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur shadow-xl border border-slate-700 p-4 rounded-lg transform transition-all duration-200">
          <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Step {label}</p>
          <p className="text-xl font-extrabold text-blue-400">
            Track <span className="text-white">{payload[0].value}</span>
          </p>
          {label > 0 && (
            <div className="mt-2 pt-2 border-t border-slate-700">
              <p className="text-xs font-medium text-slate-400 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Moved: <span className="text-slate-300">{Math.abs(payload[0].value - data[label - 1].track)}</span> cylinders
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const lineGradient = result.algorithm === 'SCAN' ? 'url(#colorScan)' : 'url(#colorCscan)';

  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800 animate-fade-in-up">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-6 border-b border-slate-800 pb-2">Disk Head Movement</h2>
      <div className="w-full h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorScan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.8}/>
              </linearGradient>
              <linearGradient id="colorCscan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f472b6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={true} horizontal={true}/>
            
            <XAxis 
              type="number" 
              dataKey="track" 
              domain={['dataMin - 10', 'dataMax + 10']}
              stroke="#64748b"
              tick={{fill: '#94a3b8', fontWeight: 500, fontSize: 12}}
              tickMargin={10}
            >
              <Label value="Disk Tracks" position="bottom" offset={0} style={{ fill: '#cbd5e1', fontWeight: 'bold' }} />
            </XAxis>
            
            <YAxis 
              type="number" 
              dataKey="step" 
              reversed={true}
              stroke="#64748b"
              tick={{fill: '#94a3b8', fontWeight: 500, fontSize: 12}}
              tickMargin={10}
            >
               <Label value="Sequence Step" angle={-90} position="left" style={{ textAnchor: 'middle', fill: '#cbd5e1', fontWeight: 'bold' }} />
            </YAxis>
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#475569', strokeWidth: 2, fill: 'transparent' }}/>
            
            <Line
              type="monotone"
              dataKey="track"
              stroke={result.algorithm === 'SCAN' ? '#818cf8' : '#f472b6'}
              strokeWidth={4}
              dot={{ r: 6, strokeWidth: 2, stroke: '#1e293b', fill: result.algorithm === 'SCAN' ? '#818cf8' : '#f472b6' }}
              activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff', fill: '#34d399' }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphVisualization;
