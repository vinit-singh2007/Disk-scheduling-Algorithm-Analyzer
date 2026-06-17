import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  Legend
} from 'recharts';
import ResultDisplay from './ResultDisplay';

const ComparisonPage = ({ result1, result2, head }) => {
  if (!result1 || !result2) return null;

  const parsedHead = parseInt(head, 10);
  
  // Prepare combined data for the graph
  const maxLen = Math.max(result1.seek_sequence.length, result2.seek_sequence.length);
  const data = [];
  
  for (let i = 0; i <= maxLen; i++) {
    const obj = { step: i };
    if (i === 0) {
      obj.res1 = parsedHead;
      obj.res2 = parsedHead;
    } else {
      if (i - 1 < result1.seek_sequence.length) obj.res1 = result1.seek_sequence[i - 1];
      if (i - 1 < result2.seek_sequence.length) obj.res2 = result2.seek_sequence[i - 1];
    }
    data.push(obj);
  }

  const total1 = result1.seek_time;
  const total2 = result2.seek_time;
  const difference = Math.abs(total1 - total2);
  
  let winnerText = '';
  if (total1 < total2) {
    winnerText = `${result1.algorithm} is more efficient by ${difference} cylinders for this configuration.`;
  } else if (total2 < total1) {
    winnerText = `${result2.algorithm} is more efficient by ${difference} cylinders for this configuration.`;
  } else {
    winnerText = `Both algorithms have the same total seek time (${total1} cylinders).`;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur shadow-xl border border-slate-700 p-4 rounded-lg transform transition-all duration-200">
          <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Sequence Step: {label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 mb-2">
              <span className="font-bold whitespace-nowrap" style={{ color: entry.color }}>
                {entry.name}:
              </span>
              <span className="text-white font-mono text-sm">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Analysis Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch">
        <ResultDisplay result={result1} title={`${result1.algorithm} Analysis`} />
        <ResultDisplay result={result2} title={`${result2.algorithm} Analysis`} />
      </div>

      <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-6 rounded-xl border border-indigo-500/30 shadow-lg flex flex-col justify-center items-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400 mb-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <h3 className="text-white text-lg font-bold mb-2 tracking-wide">Comparison Conclusion</h3>
        <p className="text-emerald-300 font-medium text-lg">{winnerText}</p>
      </div>

      {/* Graph Section */}
      <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400 mb-6 border-b border-slate-800 pb-2">Combined Head Movement Comparison</h2>
        <div className="w-full h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={true} horizontal={true}/>
              
              <XAxis 
                type="number" 
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
              <Legend verticalAlign="top" height={36}/>
              
              <Line
                name={result1.algorithm}
                type="monotone"
                dataKey="res1"
                stroke="#60a5fa"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, stroke: '#1e293b', fill: '#60a5fa' }}
                activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff', fill: '#60a5fa' }}
                animationDuration={1500}
                connectNulls={true}
              />
              
              <Line
                name={result2.algorithm}
                type="monotone"
                dataKey="res2"
                stroke="#f472b6"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, stroke: '#1e293b', fill: '#f472b6' }}
                activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff', fill: '#f472b6' }}
                animationDuration={1500}
                connectNulls={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
