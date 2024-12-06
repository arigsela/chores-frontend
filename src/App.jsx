import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './components/ui/alert';
import { WeekSelector } from './components/WeekSelector';
import { AddChildForm, ChildList } from './components/ChildList';
import { AddChoreForm, ChoreList } from './components/ChoreList';
import { getCurrentWeekStart } from './utils/dateUtils';
import * as api from './services/api';


const App = () => {
  const [children, setChildren] = useState([]);
  const [chores, setChores] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeekStart);
  const [newChild, setNewChild] = useState({ name: '', weekly_allowance: 0 });
  const [newChore, setNewChore] = useState({ name: '', description: '', points: 0 });
  const [selectedChores, setSelectedChores] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [childrenData, choresData] = await Promise.all([
          api.fetchChildren(),
          api.fetchChores()
        ]);
        
        setChildren(childrenData);
        setChores(choresData);
        
        const assignmentsData = {};
        await Promise.all(
          childrenData.map(async (child) => {
            const weeklyAssignments = await api.fetchAssignmentsForWeek(child.id, selectedWeek);
            assignmentsData[child.id] = weeklyAssignments;
          })
        );
        setAssignments(assignmentsData);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedWeek]);

  const handleAddChild = async (e) => {
    e.preventDefault();
    try {
      const child = await api.addChild(newChild);
      setChildren([...children, child]);
      setNewChild({ name: '', weekly_allowance: 0 });
    } catch (err) {
      setError('Failed to add child. Please try again.');
    }
  };

  const handleAddChore = async (e) => {
    e.preventDefault();
    try {
      const chore = await api.addChore(newChore);
      setChores([...chores, chore]);
      setNewChore({ name: '', description: '', points: 0 });
    } catch (err) {
      setError('Failed to add chore. Please try again.');
    }
  };

  const deleteChore = async (choreId) => {
    try {
      await api.deleteChore(choreId);
      setChores(chores.filter(chore => chore.id !== choreId));
      
      // Update assignments and selected chores
      const newAssignments = { ...assignments };
      Object.keys(newAssignments).forEach(childId => {
        newAssignments[childId] = newAssignments[childId].filter(
          assignment => assignment.chore.id !== choreId
        );
      });
      setAssignments(newAssignments);
      
      setSelectedChores(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(childId => {
          updated[childId] = updated[childId].filter(id => id !== choreId);
        });
        return updated;
      });
    } catch (err) {
      setError('Failed to delete chore. Please try again.');
    }
  };
  
  const handleAssignChores = async (childId) => {
    const choresToAssign = selectedChores[childId] || [];
    if (choresToAssign.length === 0) {
      setError('Please select at least one chore to assign');
      return;
    }

    try {
      const newAssignments = await api.assignChores(childId, choresToAssign, selectedWeek);
      
      const updatedAssignments = await api.fetchAssignmentsForWeek(childId, selectedWeek);
      setAssignments(prev => ({
        ...prev,
        [childId]: updatedAssignments
      }));

      setSelectedChores(prev => ({
        ...prev,
        [childId]: []
      }));
    } catch (err) {
      setError('Failed to assign chores. Please try again.');
      console.error('Error:', err);
    }
  };

  const handleCompleteChore = async (assignmentId) => {
    try {
      const result = await api.completeChore(assignmentId);
      
      const newAssignments = { ...assignments };
      Object.keys(newAssignments).forEach(childId => {
        newAssignments[childId] = newAssignments[childId].map(assignment => 
          assignment.id === assignmentId 
            ? { ...assignment, is_completed: true, completion_date: result.completed_date }
            : assignment
        );
      });
      setAssignments(newAssignments);
    } catch (err) {
      setError('Failed to complete chore. Please try again.');
      console.error('Error completing chore:', err);
    }
  };

  if (loading) return <div className="p-4 text-2xl text-white">Loading...</div>;
  
  if (error) {
    console.error('Application error:', error);
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-white">Family Chores Tracker</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <WeekSelector 
          selectedWeek={selectedWeek} 
          onWeekChange={setSelectedWeek} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Children Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Children</h2>
            
            <AddChildForm
              newChild={newChild}
              setNewChild={setNewChild}
              onSubmit={handleAddChild}
            />
            
            <ChildList
              children={children}
              assignments={assignments}
              chores={chores}
              selectedChores={selectedChores}
              setSelectedChores={setSelectedChores}
              onAssignChores={handleAssignChores}
              onCompleteChore={handleCompleteChore}
            />
          </div>
          
          {/* Chores Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Chores</h2>
            
            <AddChoreForm
              newChore={newChore}
              setNewChore={setNewChore}
              onSubmit={handleAddChore}
            />
            
            <ChoreList chores={chores} onDeleteChore={deleteChore} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;