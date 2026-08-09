import { fireEvent, render, screen } from '@testing-library/react-native';
import { DeploymentExample } from '../src/DeploymentExample';

describe('product-shaped deployment workflow', () => {
  it('recovers from validation and completes a controlled deployment', async () => {
    await render(<DeploymentExample />);

    await fireEvent.press(screen.getByRole('button', { name: 'Deploy service' }));
    expect(screen.getByRole('alert')).toHaveTextContent(/Use at least three characters/);
    expect(screen.queryByRole('progressbar', { name: 'Deployment progress' })).toBeNull();

    await fireEvent.changeText(screen.getByLabelText('Service name'), 'edge-router');
    await fireEvent.press(screen.getByRole('button', { name: 'Deployment region' }));
    await fireEvent.press(screen.getByRole('menuitem', { name: 'Tokyo' }));
    await fireEvent.press(screen.getByRole('radio', { name: 'Replica' }));
    await fireEvent.press(screen.getByRole('switch', { name: 'Enable tracing' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Deploy service' }));

    expect(screen.getByText('Target: tokyo · replica · tracing off')).toBeOnTheScreen();
    expect(screen.getByRole('progressbar', { name: 'Deployment progress' })).toHaveAccessibilityValue({ min: 0, max: 100, now: 20, text: '20%' });

    await fireEvent.press(screen.getByRole('button', { name: 'Advance deployment' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Advance deployment' }));
    expect(screen.getByText('Deployment complete')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Deployed' })).toBeDisabled();
  });
});
