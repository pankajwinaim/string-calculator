import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StringCalculator from '../pages/StringCalculator';

test('renders the calculator and handles empty string input', async () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByRole('textbox', { name: /numbers-input/i }), { target: { value: '' } });
  fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
  expect(await screen.findByLabelText('sum-result')).toHaveTextContent('Sum: 0');
});

test('handles single number input', async () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByRole('textbox', { name: /numbers-input/i }), { target: { value: '1' } });
  fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
  expect(await screen.findByLabelText('sum-result')).toHaveTextContent('Sum: 1');
});

test('handles multiple numbers input', async () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByRole('textbox', { name: /numbers-input/i }), { target: { value: '1,2,3' } });
  fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
  expect(await screen.findByLabelText('sum-result')).toHaveTextContent('Sum: 6');
});

test('handles new lines between numbers', async () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByRole('textbox', { name: /numbers-input/i }), { target: { value: '1\n,2,3' } });
  fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
  expect(await screen.findByLabelText('sum-result')).toHaveTextContent('Sum: 6');
});

test('supports different delimiters', async () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByRole('textbox', { name: /numbers-input/i }), { target: { value: "//;\n1;2" } });
  fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
  expect(await screen.findByLabelText('sum-result')).toHaveTextContent('Sum: 3');
});

test('throws exception for negative numbers', async () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByRole('textbox', { name: /numbers-input/i }), { target: { value: '1,-2,3' } });
  fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
  expect(await screen.findByRole('alert')).toHaveTextContent('negative numbers not allowed: -2');
});

test('shows all negative numbers in the exception message', async () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByRole('textbox', { name: /numbers-input/i }), { target: { value: '-1,-2,3' } });
  fireEvent.click(screen.getByRole('button', { name: /calculate/i }));
  expect(await screen.findByRole('alert')).toHaveTextContent('negative numbers not allowed: -1, -2');
});