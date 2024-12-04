import React from 'react';
import { getWeekOptions } from '../utils/dateUtils';

export const WeekSelector = ({ selectedWeek, onWeekChange }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-300 mb-2">
      Select Week
    </label>
    <select
      value={selectedWeek}
      onChange={(e) => onWeekChange(e.target.value)}
      className="w-full md:w-64 p-2 bg-gray-700 border-gray-600 rounded-md text-white"
    >
      {getWeekOptions().map((week) => (
        <option key={week.value} value={week.value}>
          {week.label}
        </option>
      ))}
    </select>
  </div>
);