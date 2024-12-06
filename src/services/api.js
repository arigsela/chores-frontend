const API_BASE_URL = import.meta.env.VITE_API_URL || '__API_URL_PLACEHOLDER__';

export const fetchChildren = async () => {
  const res = await fetch(`${API_BASE_URL}/api/children/`);
  if (!res.ok) throw new Error('Failed to fetch children');
  return res.json();
};

export const fetchChores = async () => {
  const res = await fetch(`${API_BASE_URL}/api/chores/`);
  if (!res.ok) throw new Error('Failed to fetch chores');
  return res.json();
};

export const fetchAssignmentsForWeek = async (childId, weekStart) => {
  const res = await fetch(`${API_BASE_URL}/api/weekly-assignments/${childId}?week_start=${weekStart}`);
  if (!res.ok) return [];
  return res.json();
};

export const addChild = async (childData) => {
  const res = await fetch(`${API_BASE_URL}/api/children/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(childData)
  });
  if (!res.ok) throw new Error('Failed to add child');
  return res.json();
};

export const deleteChore = async (choreId) => {
  const res = await fetch(`${API_BASE_URL}/api/chores/${choreId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete chore');
  return res.json();
};

export const addChore = async (choreData) => {
  const res = await fetch(`${API_BASE_URL}/api/chores/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(choreData)
  });
  if (!res.ok) throw new Error('Failed to add chore');
  return res.json();
};

export const assignChores = async (childId, choreIds, weekStart) => {
  const res = await fetch(`${API_BASE_URL}/api/weekly-assignments/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ child_id: childId, chore_ids: choreIds, week_start: weekStart })
  });
  if (!res.ok) throw new Error('Failed to assign chores');
  return res.json();
};

export const completeChore = async (assignmentId) => {
  const res = await fetch(`${API_BASE_URL}/api/assignments/${assignmentId}/complete`, {
    method: 'PUT'
  });
  if (!res.ok) throw new Error('Failed to complete chore');
  return res.json();
};

export const deleteAssignment = async (assignmentId) => {
  const res = await fetch(`${API_BASE_URL}/api/assignments/${assignmentId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete assignment');
};