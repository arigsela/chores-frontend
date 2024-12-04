import React from 'react';
import { PlusCircle } from 'lucide-react';

export const AddChoreForm = ({ newChore, setNewChore, onSubmit }) => (
  <form onSubmit={onSubmit} className="mb-4">
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Chore name"
        className="w-full p-2 bg-gray-700 border-gray-600 rounded text-white placeholder-gray-400"
        value={newChore.name}
        onChange={(e) => setNewChore({ ...newChore, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        className="w-full p-2 bg-gray-700 border-gray-600 rounded text-white placeholder-gray-400"
        value={newChore.description}
        onChange={(e) => setNewChore({ ...newChore, description: e.target.value })}
      />
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Points"
          className="w-24 p-2 bg-gray-700 border-gray-600 rounded text-white placeholder-gray-400"
          value={newChore.points}
          onChange={(e) => setNewChore({ ...newChore, points: parseInt(e.target.value) })}
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <PlusCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  </form>
);

export const ChoreList = ({ chores }) => (
  <div className="space-y-2">
    {chores.map(chore => (
      <div key={chore.id} className="p-3 border border-gray-700 rounded bg-gray-800">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-white">{chore.name}</div>
            <div className="text-sm text-gray-400">{chore.description}</div>
          </div>
          <span className="text-blue-400">{chore.points} pts</span>
        </div>
      </div>
    ))}
  </div>
);