import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ChoreList } from '../ChoreList';

describe('ChoreList', () => {
  const mockChores = [
    { id: 1, name: 'Clean Room', description: 'Make bed, vacuum'},
    { id: 2, name: 'Do Dishes', description: 'Wash and dry dishes'}
  ];

  it('renders correctly when empty', () => {
    const { container } = render(<ChoreList chores={[]} onDeleteChore={() => {}} />);
    expect(container.querySelector('.space-y-2')).toBeEmptyDOMElement();
  });
});