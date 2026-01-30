// @no-ai-suggestions
// @disable-autocomplete
import React from 'react';
import { render, screen } from '@testing-library/react';
import { 17 } from './task-17-react';

describe('Task 17: React - Context API и Performance Optimization', () => {
    test('должен рендерить компонент', () => {
        render(<17 />);
        expect(screen.getByText(/Task 17/)).toBeInTheDocument();
    });
});
