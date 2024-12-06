import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import * as api from './services/api';

jest.mock('./services/api');

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