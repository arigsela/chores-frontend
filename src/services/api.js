const API_BASE_URL = import.meta.env.VITE_API_URL || '__API_URL_PLACEHOLDER__';

export const login = async (username, password) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  console.log('Attempting login to:', `${API_BASE_URL}/token`);
  
  const res = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    body: formData,
    credentials: 'include',  // Add this line
  });
  
  if (!res.ok) {
    console.error('Login failed:', res.status, res.statusText);
    throw new Error('Login failed');
  }
  const data = await res.json();
  localStorage.setItem('token', data.access_token);
  return data;
};

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

export const fetchChildren = async () => {
  const res = await fetch(`${API_BASE_URL}/api/children/`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch children');
  return res.json();
};

export const fetchChores = async () => {
  const res = await fetch(`${API_BASE_URL}/api/chores/`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch chores');
  return res.json();
};

export const fetchAssignmentsForWeek = async (childId, weekStart) => {
  const res = await fetch(`${API_BASE_URL}/api/weekly-assignments/${childId}?week_start=${weekStart}`, {
    headers: getHeaders()
  });
  if (!res.ok) return [];
  return res.json();
};

export const addChild = async (childData) => {
  const res = await fetch(`${API_BASE_URL}/api/children/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(childData)
  });
  if (!res.ok) throw new Error('Failed to add child');
  return res.json();
};

export const deleteChore = async (choreId) => {
  const res = await fetch(`${API_BASE_URL}/api/chores/${choreId}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete chore');
  return res.json();
};

export const addChore = async (choreData) => {
  const res = await fetch(`${API_BASE_URL}/api/chores/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(choreData)
  });
  if (!res.ok) throw new Error('Failed to add chore');
  return res.json();
};

export const assignChores = async (childId, choreIds, weekStart) => {
  const res = await fetch(`${API_BASE_URL}/api/weekly-assignments/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ child_id: childId, chore_ids: choreIds, week_start: weekStart })
  });
  if (!res.ok) throw new Error('Failed to assign chores');
  return res.json();
};

export const completeChore = async (assignmentId) => {
  const res = await fetch(`${API_BASE_URL}/api/assignments/${assignmentId}/complete`, {
    method: 'PUT',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to complete chore');
  return res.json();
};

export const deleteAssignment = async (assignmentId) => {
  const res = await fetch(`${API_BASE_URL}/api/assignments/${assignmentId}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete assignment');
};