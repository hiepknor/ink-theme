import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button, Checkbox, InkProvider, TextField } from '@hiepknor/ink-ui-native';
import { App } from '../src/App';

describe('public native interactions', () => {
  it('delivers the inverse value from a controlled checkbox', async () => {
    const onCheckedChange = jest.fn();
    await render(<Checkbox checked={false} label="Enable tracing" onCheckedChange={onCheckedChange} />);

    await fireEvent.press(screen.getByRole('checkbox', { name: 'Enable tracing' }));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('blocks disabled and loading actions', async () => {
    const onPress = jest.fn();
    await render(<><Button disabled onPress={onPress}>Disabled</Button><Button loading onPress={onPress}>Deploying</Button></>);

    await fireEvent.press(screen.getByRole('button', { name: 'Disabled' }));
    await fireEvent.press(screen.getByRole('button', { busy: true }));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('forwards native text changes and exposes validation copy', async () => {
    const onChangeText = jest.fn();
    await render(<TextField error="Use at least three characters" label="Service name" onChangeText={onChangeText} />);

    await fireEvent.changeText(screen.getByLabelText('Service name'), 'edge-router');

    expect(onChangeText).toHaveBeenCalledWith('edge-router');
    expect(screen.getByText('Use at least three characters')).toBeOnTheScreen();
  });

  it('inherits touch density from the provider', async () => {
    await render(<InkProvider density="touch"><Button>Deploy</Button></InkProvider>);
    expect(screen.getByRole('button', { name: 'Deploy' })).toHaveStyle({ minHeight: 48 });
  });
});

describe('native workbench', () => {
  it('changes density and controlled checkbox state through visible controls', async () => {
    await render(<App />);

    await fireEvent.press(screen.getByRole('button', { name: 'Compact' }));
    expect(screen.getByText('compact · 32px')).toBeOnTheScreen();

    await fireEvent.press(screen.getByRole('checkbox', { checked: true }));
    expect(screen.getByText('Tracing is disabled.')).toBeOnTheScreen();
  });
});
