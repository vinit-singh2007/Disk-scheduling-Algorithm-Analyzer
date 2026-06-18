import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import GraphVisualization from './components/GraphVisualization';
import LandingPage from './components/LandingPage';
import ComparisonPage from './components/ComparisonPage';

// Default backend API URL
const API_BASE_URL  = import.meta.env.VITE_API_URL || 'https://disk-scheduling-algorithm-analyzer.onrender.com';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'input', 'results', 'comparison'
  const [result, setResult] = useState(null);
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);
  const [formData, setFormData] = useState({
    requests: '82, 170, 43, 140, 24, 16, 190',
    head: '50',
    size: '200',
    direction: 'left',
    algorithm: 'SCAN'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentHead, setCurrentHead] = useState(null);

  const handleCalculate = async (formData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setCurrentHead(formData.head);
    
    try {
      const endpoint = formData.algorithm === 'SCAN' ? '/scan' : '/cscan';
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
        requests: formData.requests,
        head: formData.head,
        size: formData.size,
        direction: formData.direction
      });
      
      setResult(response.data);
      setCurrentView('results');
    } catch (err) {
      console.error('Error calculating algorithm:', err);
      setError(err.response?.data?.error || 'Failed to connect to the server. Is it running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompareBoth = async (formData) => {
    setIsLoading(true);
    setError(null);
    setResult1(null);
    setResult2(null);
    setCurrentHead(formData.head);
    
    try {
      const getScan = axios.post(`${API_BASE_URL}/scan`, {
        requests: formData.requests,
        head: formData.head,
        size: formData.size,
        direction: formData.direction
      });
      
      const getCscan = axios.post(`${API_BASE_URL}/cscan`, {
        requests: formData.requests,
        head: formData.head,
        size: formData.size,
        direction: formData.direction
      });
      
      const [scanRes, cscanRes] = await Promise.all([getScan, getCscan]);
      
      setResult1(scanRes.data);
      setResult2(cscanRes.data);
      setCurrentView('comparison');
    } catch (err) {
      console.error('Error comparing algorithms:', err);
      setError('Failed to connect to the server or calculate results.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompareSstf = async (formData) => {
    setIsLoading(true);
    setError(null);
    setResult1(null);
    setResult2(null);
    setCurrentHead(formData.head);
    
    try {
      const endpoint = formData.algorithm === 'SCAN' ? '/scan' : '/cscan';
      const getPrimary = axios.post(`${API_BASE_URL}${endpoint}`, {
        requests: formData.requests,
        head: formData.head,
        size: formData.size,
        direction: formData.direction
      });
      
      const getSstf = axios.post(`${API_BASE_URL}/sstf`, {
        requests: formData.requests,
        head: formData.head,
        size: formData.size,
        direction: formData.direction
      });
      
      const [primaryRes, sstfRes] = await Promise.all([getPrimary, getSstf]);
      
      setResult1(primaryRes.data);
      setResult2(sstfRes.data);
      setCurrentView('comparison');
    } catch (err) {
      console.error('Error comparing algorithms:', err);
      setError('Failed to connect to the server or calculate results.');
    } finally {
      setIsLoading(false);
    }
  };

  if (currentView === 'landing') {
    return <LandingPage onStart={() => setCurrentView('input')} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12 transition-colors duration-500">
      {/* Header */}
      <header className="bg-slate-900 shadow-md border-b border-slate-800 sticky top-0 z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Disk Scheduling Analyzer</h1>
              <p className="text-xs text-slate-400 font-medium">SCAN & C-SCAN Algorithms</p>
            </div>
          </div>
          
          {(currentView === 'results' || currentView === 'comparison') && (
            <button 
              onClick={() => setCurrentView('input')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors border border-slate-700 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Back to Configuration</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {error && (
          <div className="mb-6 bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-400 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'input' && (
          <div className="max-w-xl mx-auto flex flex-col gap-6 animate-fade-in">
            <InputForm 
              formData={formData} 
              setFormData={setFormData} 
              onSubmit={handleCalculate} 
              onCompareBoth={handleCompareBoth} 
              onCompareSstf={handleCompareSstf} 
              isLoading={isLoading} 
            />
          </div>
        )}

        {currentView === 'results' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            <div className="lg:col-span-4 flex flex-col gap-6">
              <ResultDisplay result={result} />
            </div>
            <div className="lg:col-span-8">
              <GraphVisualization result={result} head={currentHead} />
            </div>
          </div>
        )}

        {currentView === 'comparison' && result1 && result2 && (
          <div className="animate-fade-in w-full">
            <ComparisonPage result1={result1} result2={result2} head={currentHead} />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
