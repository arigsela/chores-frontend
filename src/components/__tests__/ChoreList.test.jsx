import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { WeekSelector } from '../WeekSelector';

describe('WeekSelector', () => {
  it('changes week when select value changes', () => {
    const mockOnChange = jest.fn();
    const currentDate = new Date('2024-01-01');
    const { container } = render(
      <WeekSelector selectedWeek={currentDate} onWeekChange={mockOnChange} />
    );
    
    const select = container.querySelector('select');
    fireEvent.change(select, { target: { value: '2024-01-08' }});
    
    expect(mockOnChange).toHaveBeenCalled();
  });
});