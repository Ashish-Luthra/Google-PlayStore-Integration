import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConnectionStatusBanner } from './ConnectionStatusBanner';

describe('ConnectionStatusBanner', () => {
  it('should render nothing when status is idle', () => {
    const { container } = render(<ConnectionStatusBanner status="idle" />);
    expect(container.firstChild).toBeNull();
  });

  it('should render success message when status is success', () => {
    render(<ConnectionStatusBanner status="success" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/connection test successful/i)).toBeInTheDocument();
  });

  it('should render error message when status is error', () => {
    render(<ConnectionStatusBanner status="error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/connection test failed/i)).toBeInTheDocument();
  });

  it('should have success styling when status is success', () => {
    render(<ConnectionStatusBanner status="success" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-green-50');
    expect(alert).toHaveClass('text-green-800');
  });

  it('should have error styling when status is error', () => {
    render(<ConnectionStatusBanner status="error" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-red-50');
    expect(alert).toHaveClass('text-red-800');
  });

  it('should have aria-live for accessibility', () => {
    render(<ConnectionStatusBanner status="success" />);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite');
  });
});
