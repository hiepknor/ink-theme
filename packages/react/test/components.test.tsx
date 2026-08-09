import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { Button, Checkbox, InkProvider, Surface, TextField } from '../src/index.js';

describe('Button', () => {
  test('forwards native attributes and its DOM ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref} name="save" variant="primary">Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('name', 'save');
    expect(ref.current).toBe(screen.getByRole('button'));
  });

  test('activates from keyboard and communicates loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Run</Button>);
    await user.tab();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();

    rerender(<Button loading loadingLabel="Saving">Run</Button>);
    expect(screen.getByRole('button', { name: 'Saving' })).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  test('inherits provider density and permits a local override', () => {
    render(<InkProvider density="touch"><Button>Touch</Button><Button density="compact">Compact</Button></InkProvider>);
    expect(screen.getByRole('button', { name: 'Touch' })).toHaveAttribute('data-density', 'touch');
    expect(screen.getByRole('button', { name: 'Compact' })).toHaveAttribute('data-density', 'compact');
  });
});

describe('TextField', () => {
  test('associates label, description, and error while preserving input attributes', () => {
    const ref = createRef<HTMLInputElement>();
    render(<TextField ref={ref} label="Service" description="Public identifier" error="Already exists" required name="service" />);
    const input = screen.getByRole('textbox', { name: 'Service' });
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('name', 'service');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Public identifier Already exists');
    expect(ref.current).toBe(input);
  });

  test('supports uncontrolled typing', async () => {
    const user = userEvent.setup();
    render(<TextField label="Name" defaultValue="ink" />);
    const input = screen.getByRole('textbox', { name: 'Name' });
    await user.type(input, '-tailwind');
    expect(input).toHaveValue('ink-tailwind');
  });
});

describe('Checkbox', () => {
  test('toggles by keyboard and associates supporting copy', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Tracing" description="Collect spans" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Tracing' });
    expect(checkbox).toHaveAccessibleDescription('Collect spans');
    await user.tab();
    await user.keyboard(' ');
    expect(checkbox).toBeChecked();
  });
});

test('Surface preserves native attributes and forwards its ref', () => {
  const ref = createRef<HTMLDivElement>();
  render(<Surface ref={ref} variant="elevated" aria-label="Inspector">Content</Surface>);
  const surface = screen.getByLabelText('Inspector');
  expect(surface).toHaveAttribute('data-variant', 'elevated');
  expect(ref.current).toBe(surface);
});
