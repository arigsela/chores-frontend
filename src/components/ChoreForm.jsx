// src/components/ChoreForm.jsx
import React, { useState } from 'react';

export const ChoreForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency_per_week: '1'
  });
  const [error, setError] = useState('');

  // Generate array of frequencies 1-7
  const frequencies = Array.from({ length: 7 }, (_, i) => i + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Chore name is required');
      return;
    }

    onSubmit({
      ...formData,
      frequency_per_week: parseInt(formData.frequency_per_week)
    });
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      frequency_per_week: '1'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="Chore name"
        className="w-full p-2 bg-gray-700 border-gray-600 rounded text-white placeholder-gray-400"
        value={formData.name}
        onChange={(e) => {
          setFormData(prev => ({ ...prev, name: e.target.value }));
          setError('');
        }}
      />
      
      <input
        type="text"
        placeholder="Description"
        className="w-full p-2 bg-gray-700 border-gray-600 rounded text-white placeholder-gray-400"
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
      />

      <select
        value={formData.frequency_per_week}
        onChange={(e) => setFormData(prev => ({ ...prev, frequency_per_week: e.target.value }))}
        className="w-full p-2 bg-gray-700 border-gray-600 rounded text-white"
      >
        {frequencies.map(freq => (
          <option key={freq} value={freq.toString()}>
            {freq} {freq === 1 ? 'time' : 'times'} per week
          </option>
        ))}
      </select>

      {error && (
        <div className="text-red-400 text-sm">{error}</div>
      )}

      <button 
        type="submit" 
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Chore
      </button>
    </form>
  );
};