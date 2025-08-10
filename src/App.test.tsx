import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  // You might want to add more specific assertions here based on what App renders
  // For now, we just check if the component renders without throwing an error.
  expect(screen.getByRole('heading', { name: /Graeco-Latin Square Generator/i })).toBeInTheDocument();
});
