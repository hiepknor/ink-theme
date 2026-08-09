import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button, Checkbox, IconButton, InkProvider, RadioGroup, Select, Switch, TextArea, TextField } from '@hiepknor/ink-ui-native';
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

  it('exposes labelled icon and multiline controls', async () => {
    const onPress = jest.fn(); const onChangeText = jest.fn();
    await render(<><IconButton label="Add service" onPress={onPress}>＋</IconButton><TextArea label="Description" onChangeText={onChangeText} /></>);
    await fireEvent.press(screen.getByRole('button', { name: 'Add service' }));
    await fireEvent.changeText(screen.getByLabelText('Description'), 'Regional route');
    expect(onPress).toHaveBeenCalledTimes(1); expect(onChangeText).toHaveBeenCalledWith('Regional route');
  });

  it('delivers controlled radio and switch changes', async () => {
    const onValueChange = jest.fn(); const onCheckedChange = jest.fn();
    await render(<><RadioGroup label="Role" options={[{ label: 'Primary', value: 'primary' }, { label: 'Replica', value: 'replica' }]} value="primary" onValueChange={onValueChange} /><Switch checked={false} label="Tracing" onCheckedChange={onCheckedChange} /></>);
    await fireEvent.press(screen.getByRole('radio', { name: 'Replica' })); await fireEvent.press(screen.getByRole('switch', { name: 'Tracing' }));
    expect(onValueChange).toHaveBeenCalledWith('replica'); expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('opens a select and chooses one enabled option', async () => {
    const onValueChange = jest.fn();
    await render(<Select label="Region" options={[{ label: 'Singapore', value: 'sg' }, { label: 'Tokyo', value: 'tyo' }]} value="sg" onValueChange={onValueChange} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Region' }));
    await fireEvent.press(screen.getByRole('menuitem', { name: 'Tokyo' }));
    expect(onValueChange).toHaveBeenCalledWith('tyo');
  });
});

describe('native workbench', () => {
  it('changes density and controlled checkbox state through visible controls', async () => {
    await render(<App />);

    await fireEvent.press(screen.getByRole('button', { name: 'Compact' }));
    expect(screen.getByText('compact · 32px')).toBeOnTheScreen();

    await fireEvent.press(screen.getByRole('checkbox', { checked: true }));
    expect(screen.getByText('Tracing is disabled.')).toBeOnTheScreen();

    await fireEvent.press(screen.getByRole('button', { name: 'Deployment region' }));
    await fireEvent.press(screen.getByRole('menuitem', { name: 'Tokyo' }));
    expect(screen.getByText('Deploying to tokyo as primary.')).toBeOnTheScreen();
  });
});
