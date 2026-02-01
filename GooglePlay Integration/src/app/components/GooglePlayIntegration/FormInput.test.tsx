import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormInput } from './FormInput';

describe('FormInput', () => {
  it('should render with label', () => {
    render(<FormInput label="Email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('should show required indicator when required', () => {
    render(<FormInput label="Email" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should show help text when provided', () => {
    render(<FormInput label="Email" helpText="Enter your email address" />);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('should show error message when provided', () => {
    render(<FormInput label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should have error styling when error is provided', () => {
    render(<FormInput label="Email" error="Invalid email" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
  });

  it('should accept user input', async () => {
    const user = userEvent.setup();
    render(<FormInput label="Email" />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test@example.com');

    expect(input).toHaveValue('test@example.com');
  });

  it('should set aria-required when required', () => {
    render(<FormInput label="Email" required />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
  });

  it('should set aria-invalid when error is present', () => {
    render(<FormInput label="Email" error="Invalid" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should link input to help text with aria-describedby', () => {
    render(<FormInput label="Email" helpText="Help text" id="email-input" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'email-input-help');
  });
});
