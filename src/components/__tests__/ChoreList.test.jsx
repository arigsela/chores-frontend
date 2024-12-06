import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ChoreList } from '../ChoreList';

describe('ChoreList', () => {
  const mockChores = [
    { id: 1, name: 'Clean Room', description: 'Make bed, vacuum', points: 5 },
    { id: 2, name: 'Do Dishes', description: 'Wash and dry dishes', points: 3 }
  ];

  it('renders correctly when empty', () => {
    const { container } = render(<ChoreList chores={[]} onDeleteChore={() => {}} />);
    expect(container.querySelector('.space-y-2')).toBeEmptyDOMElement();
  });

  it('displays chore points correctly', () => {
    const { getByText } = render(<ChoreList chores={mockChores} onDeleteChore={() => {}} />);
    expect(getByText('5 pts')).toBeInTheDocument();
  });
});