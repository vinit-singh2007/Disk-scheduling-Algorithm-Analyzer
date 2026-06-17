import React, { useState } from 'react';

const InputForm = ({ formData, setFormData, onSubmit, isLoading, onCompareBoth, onCompareSstf }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800 h-full">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-6 border-b border-slate-800 pb-2">Configuration</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Algorithm
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={`py-2 px-4 text-sm font-medium rounded-lg transition-all ${
                formData.algorithm === 'SCAN' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
              onClick={() => setFormData({...formData, algorithm: 'SCAN'})}
            >
              SCAN
            </button>
            <button
              type="button"
              className={`py-2 px-4 text-sm font-medium rounded-lg transition-all ${
                formData.algorithm === 'C-SCAN' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
              onClick={() => setFormData({...formData, algorithm: 'C-SCAN'})}
            >
              C-SCAN
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Disk Requests (comma separated)
          </label>
          <input
            type="text"
            name="requests"
            value={formData.requests}
            onChange={handleChange}
            placeholder="e.g. 82, 170, 43, 140, 24, 16, 190"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Initial Head
            </label>
            <input
              type="number"
              name="head"
              value={formData.head}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Disk Size
            </label>
            <input
              type="number"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Direction
          </label>
          <select
            name="direction"
            value={formData.direction}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors hover:cursor-pointer"
          >
            <option value="left" className="bg-slate-800">Left (Towards 0)</option>
            <option value="right" className="bg-slate-800">Right (Towards max)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-bold shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500/30"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculating...
            </span>
          ) : 'Run Algorithm'}
        </button>

        <div className="flex flex-col gap-3 mt-4">
          {onCompareBoth && (
            <button
              type="button"
              onClick={() => onCompareBoth(formData)}
              disabled={isLoading}
              className="w-full bg-slate-800 text-white py-3 px-4 rounded-lg font-bold shadow-md hover:bg-slate-700 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700"
            >
              Compare SCAN and C-SCAN
            </button>
          )}

          {onCompareSstf && (
            <button
              type="button"
              onClick={() => onCompareSstf(formData)}
              disabled={isLoading}
              className="w-full bg-slate-800 text-white py-3 px-4 rounded-lg font-bold shadow-md hover:bg-slate-700 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700"
            >
              Compare {formData.algorithm} with SSTF
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InputForm;
