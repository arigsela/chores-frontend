import React from 'react';
import { PlusCircle } from 'lucide-react';
import { ChoreForm } from './ChoreForm';

export const AddChoreForm = ({ newChore, setNewChore, onSubmit }) => (
  <ChoreForm 
    onSubmit={onSubmit}
  />
);

// Rest of your ChoreList component stays the same...

export const ChoreList = ({ chores, onDeleteChore }) => (
  <div className="space-y-2">
    {chores.map(chore => (
      <div key={chore.id} className="p-3 border border-gray-700 rounded">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-white">{chore.name}</div>
            <div className="text-sm text-gray-400">{chore.description}</div>
            <div className="text-sm text-blue-400">
              {chore.frequency_per_week > 1 
                ? `${chore.frequency_per_week} times per week` 
                : 'Once per week'}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onDeleteChore(chore.id)}
              className="text-red-500 hover:text-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);