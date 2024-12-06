import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { WeekSelector } from '../WeekSelector';

describe('WeekSelector', () => {
  it('allows week selection', () => {
    const mockOnChange = jest.fn();
    const { container } = render(
      <WeekSelector selectedWeek="2024-01-01" onWeekChange={mockOnChange} />
    );

    const select = container.querySelector('select');
    const targetDate = select.options[1].value;
    fireEvent.change(select, { target: { value: targetDate } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});