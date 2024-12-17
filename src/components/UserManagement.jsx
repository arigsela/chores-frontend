import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    is_admin: false 
  });
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newUser)
      });
      if (!response.ok) throw new Error('Failed to create user');
      fetchUsers();
      setNewUser({ username: '', email: '', password: '', is_admin: false });
    } catch (err) {
      setError('Failed to create user');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">User Management</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={createUser} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 bg-gray-700 border-gray-600 rounded text-white"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 bg-gray-700 border-gray-600 rounded text-white"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 bg-gray-700 border-gray-600 rounded text-white"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={newUser.is_admin}
            onChange={(e) => setNewUser({ ...newUser, is_admin: e.target.checked })}
          />
          <label className="text-white">Is Admin</label>
        </div>
        <button 
          type="submit" 
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create User
        </button>
      </form>

      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="p-4 bg-gray-700 border border-gray-600 rounded">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-white">{user.username}</div>
                <div className="text-sm text-gray-400">{user.email}</div>
              </div>
              <div className="text-sm">
                {user.is_admin ? 
                  <span className="text-green-400">Admin</span> : 
                  <span className="text-gray-400">User</span>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;