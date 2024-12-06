import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import App from './App';
import * as api from './services/api';

jest.mock('./services/api', () => ({
  fetchChildren: jest.fn(),
  fetchChores: jest.fn(),
  fetchAssignmentsForWeek: jest.fn(),
  addChild: jest.fn(),
  addChore: jest.fn(),
  deleteChore: jest.fn(),
  deleteAssignment: jest.fn()
}));

describe('App Component', () => {
 beforeEach(() => {
   jest.clearAllMocks();
 });

 it('should handle loading state', () => {
   api.fetchChildren.mockImplementation(() => new Promise(() => {}));
   api.fetchChores.mockImplementation(() => new Promise(() => {}));
   render(<App />);
   expect(screen.getByRole('status')).toHaveTextContent('Loading...');
 });

 it('should handle deleting an assignment', async () => {
  const mockChild = { id: 1, name: 'Test Child' };
  const mockAssignment = { id: 1, chore: { id: 1, name: 'Test Chore' }, is_completed: false };
  
  api.fetchChildren.mockResolvedValue([mockChild]);
  api.fetchChores.mockResolvedValue([]);
  api.fetchAssignmentsForWeek.mockResolvedValue([mockAssignment]);
  
  await act(async () => {
    render(<App />);
  });

  const deleteButton = screen.getByRole('button', { name: /delete/i });
  await act(async () => {
    fireEvent.click(deleteButton);
  });

  expect(api.deleteAssignment).toHaveBeenCalledWith(mockAssignment.id);
});

 it('should render main sections after loading', async () => {
  api.fetchChildren.mockResolvedValue([]);
  api.fetchChores.mockResolvedValue([]);
  api.fetchAssignmentsForWeek.mockResolvedValue([]);
  
  render(<App />);
  await waitFor(() => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Family Chores Tracker');
    expect(screen.getByRole('heading', { level: 2, name: 'Children' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Chores' })).toBeInTheDocument();
  });
});

 it('should display error message on API failure', async () => {
   const mockError = new Error('API Error');
   api.fetchChildren.mockRejectedValue(mockError);
   
   render(<App />);
   await waitFor(() => {
     expect(screen.getByText(/Failed to load data/i)).toBeInTheDocument();
   });
 });

 it('should handle adding a new child', async () => {
   const mockChild = { id: 1, name: 'Test Child', weekly_allowance: 10 };
   api.fetchChildren.mockResolvedValue([]);
   api.fetchChores.mockResolvedValue([]);
   api.fetchAssignmentsForWeek.mockResolvedValue([]);
   api.addChild.mockResolvedValue(mockChild);
   
   render(<App />);
   await waitFor(() => screen.getByRole('heading', { name: /children/i }));
   
   const nameInput = screen.getByPlaceholderText('Name');
   const allowanceInput = screen.getByPlaceholderText('Allowance');
   
   fireEvent.change(nameInput, { target: { value: 'Test Child' } });
   fireEvent.change(allowanceInput, { target: { value: '10' } });
   fireEvent.submit(nameInput.closest('form'));
   
   await waitFor(() => {
     expect(screen.getByText('Test Child')).toBeInTheDocument();
   });
 });

 it('should handle adding a new chore', async () => {
  const mockChore = { id: 1, name: 'Test Chore', description: 'Test Description', points: 5 };
  api.fetchChildren.mockResolvedValue([]);
  api.fetchChores.mockResolvedValue([]);
  api.fetchAssignmentsForWeek.mockResolvedValue([]);
  api.addChore.mockResolvedValue(mockChore);
  
  render(<App />);
  await waitFor(() => screen.getByRole('heading', { level: 2, name: 'Chores' }));
 });
});