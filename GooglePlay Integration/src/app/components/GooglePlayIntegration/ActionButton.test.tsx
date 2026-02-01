import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActionButton } from './ActionButton';

describe('ActionButton', () => {
  it('should render with children', () => {
    render(<ActionButton>Click me</ActionButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ActionButton onClick={handleClick}>Click me</ActionButton>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<ActionButton disabled>Click me</ActionButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should be disabled when isLoading is true', () => {
    render(<ActionButton isLoading>Click me</ActionButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should show loading spinner when isLoading', () => {
    render(<ActionButton isLoading>Click me</ActionButton>);
    // Loader2 component should be present
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  it('should apply primary variant styles', () => {
    render(<ActionButton variant="primary">Primary</ActionButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[#2773ff]');
  });

  it('should apply secondary variant styles', () => {
    render(<ActionButton variant="secondary">Secondary</ActionButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[#edf2f7]');
  });

  it('should apply ghost variant styles', () => {
    render(<ActionButton variant="ghost">Ghost</ActionButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-[#ccd6e0]');
  });
});
