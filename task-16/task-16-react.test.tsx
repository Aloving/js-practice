// @no-ai-suggestions
// @disable-autocomplete
import React from 'react';
import { render, screen } from '@testing-library/react';
import { 16 } from './task-16-react';

describe('Task 16: React - Custom Hooks и State Management', () => {
    test('должен рендерить компонент', () => {
        render(<16 />);
        expect(screen.getByText(/Task 16/)).toBeInTheDocument();
    });
});
