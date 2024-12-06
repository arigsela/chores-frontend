import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./services/api', () => ({
  fetchChildren: () => Promise.resolve([]),
  fetchChores: () => Promise.resolve([]),
  fetchAssignmentsForWeek: () => Promise.resolve([])
}));

describe('App', () => {
  it('renders main sections', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Family Chores Tracker')).toBeInTheDocument();
      expect(screen.getByText('Children')).toBeInTheDocument();
      expect(screen.getByText('Chores')).toBeInTheDocument();
    });
  });
});