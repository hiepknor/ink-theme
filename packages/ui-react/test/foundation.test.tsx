import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import {
  Badge, Button, ButtonGroup, Dialog, DialogContent, DialogTrigger, EmptyState,
  IconButton, Inline, Menu, MenuContent, MenuItem, MenuTrigger, Panel, Popover,
  PopoverContent, PopoverTrigger, RadioGroup, Select, Separator, Sidebar, Spinner,
  Stack, StatusBar, StatusMark, Switch, Tabs, TabsContent, TabsList, TabsTrigger,
  TextArea, Toolbar, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
  VisuallyHidden,
} from '../src/index.js';

test('layout and desktop shell preserve semantic roles', () => {
  render(<Stack data-testid="stack"><Inline><Separator decorative={false} /><VisuallyHidden>Hidden context</VisuallyHidden></Inline><Toolbar aria-label="Editor tools" /><Sidebar aria-label="Navigation" /><Panel aria-label="Inspector" /><StatusBar>Ready</StatusBar></Stack>);
  expect(screen.getByTestId('stack')).toHaveClass('ink-ui-stack');
  expect(screen.getByRole('separator')).toBeInTheDocument();
  expect(screen.getByRole('toolbar', { name: 'Editor tools' })).toBeInTheDocument();
  expect(screen.getByRole('complementary', { name: 'Navigation' })).toBeInTheDocument();
  expect(screen.getByRole('region', { name: 'Inspector' })).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Ready');
});

test('actions expose names and grouped density', () => {
  render(<ButtonGroup label="View controls" density="touch"><IconButton label="Refresh">↻</IconButton><Button>Apply</Button></ButtonGroup>);
  expect(screen.getByRole('group', { name: 'View controls' })).toHaveAttribute('data-density', 'touch');
  expect(screen.getByRole('button', { name: 'Refresh' })).toHaveAttribute('data-density', 'touch');
  expect(screen.getByRole('button', { name: 'Apply' })).toHaveAttribute('data-density', 'touch');
});

test('native form controls support keyboard and controlled values', async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  render(<><TextArea label="Notes" description="Deployment notes" /><RadioGroup label="Tier" name="tier" options={[{ label: 'Primary', value: 'primary' }, { label: 'Replica', value: 'replica' }]} onValueChange={onValueChange} /><Switch label="Tracing" /><Select label="Region" defaultValue="sg"><option value="sg">Singapore</option><option value="jp">Tokyo</option></Select></>);
  await user.type(screen.getByRole('textbox', { name: 'Notes' }), 'Ready');
  expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveValue('Ready');
  await user.click(screen.getByRole('radio', { name: 'Replica' }));
  expect(onValueChange).toHaveBeenCalledWith('replica');
  await user.click(screen.getByRole('switch', { name: 'Tracing' }));
  expect(screen.getByRole('switch')).toBeChecked();
  await user.selectOptions(screen.getByRole('combobox', { name: 'Region' }), 'jp');
  expect(screen.getByRole('combobox')).toHaveValue('jp');
});

test('feedback components keep meaning in accessible text', () => {
  render(<><Badge tone="warning">Pending</Badge><StatusMark tone="danger" label="Failed" /><Spinner label="Syncing" /><EmptyState title="No services" description="Create the first service" actions={<Button>Create</Button>} /></>);
  expect(screen.getByText('Pending')).toBeInTheDocument();
  expect(screen.getByText('Failed')).toBeInTheDocument();
  expect(screen.getByRole('status', { name: 'Syncing' })).toBeInTheDocument();
  expect(screen.getByText('No services')).toBeInTheDocument();
});

test('tabs provide keyboard navigation and panel semantics', async () => {
  const user = userEvent.setup();
  render(<Tabs defaultValue="one"><TabsList aria-label="Views"><TabsTrigger value="one">Overview</TabsTrigger><TabsTrigger value="two">Logs</TabsTrigger></TabsList><TabsContent value="one">Overview panel</TabsContent><TabsContent value="two">Log panel</TabsContent></Tabs>);
  await user.click(screen.getByRole('tab', { name: 'Overview' }));
  await user.keyboard('{ArrowRight}');
  expect(screen.getByRole('tab', { name: 'Logs' })).toHaveAttribute('data-state', 'active');
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Log panel');
});

test('dialog traps interaction and closes with Escape', async () => {
  const user = userEvent.setup();
  render(<Dialog><DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger><DialogContent title="Edit service" description="Change service metadata"><Button>Save</Button></DialogContent></Dialog>);
  await user.click(screen.getByRole('button', { name: 'Open dialog' }));
  expect(screen.getByRole('dialog', { name: 'Edit service' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open dialog' })).toHaveFocus();
});

test('popover, tooltip, and menu expose keyboard-accessible content', async () => {
  const user = userEvent.setup();
  const onSelect = vi.fn();
  render(<TooltipProvider delayDuration={0}><Popover><PopoverTrigger asChild><Button>Details</Button></PopoverTrigger><PopoverContent>Popover details</PopoverContent></Popover><Tooltip><TooltipTrigger asChild><IconButton label="Help">?</IconButton></TooltipTrigger><TooltipContent>Helpful text</TooltipContent></Tooltip><Menu><MenuTrigger asChild><Button>Actions</Button></MenuTrigger><MenuContent><MenuItem onSelect={onSelect}>Rename</MenuItem></MenuContent></Menu></TooltipProvider>);
  await user.click(screen.getByRole('button', { name: 'Details' }));
  expect(screen.getByText('Popover details')).toBeInTheDocument();
  await user.hover(screen.getByRole('button', { name: 'Help' }));
  expect(await screen.findByText('Helpful text')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Actions' }));
  await user.keyboard('{ArrowDown}{Enter}');
  expect(onSelect).toHaveBeenCalledOnce();
});
