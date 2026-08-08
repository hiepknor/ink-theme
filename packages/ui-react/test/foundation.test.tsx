import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, Avatar, Banner, Badge,
  Breadcrumb, BreadcrumbLink, Button, ButtonGroup, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Combobox, Dialog,
  DataTable, DataTableToolbar, DialogContent, DialogTrigger, Drawer, DrawerContent, DrawerTrigger, EmptyState, ErrorBoundary, ErrorMessage, ErrorState, FileList, FileUpload, FilterChip, FormErrorSummary,
  IconButton, ImageGallery, ImageSurface, Inline, Menu, MenuContent, MenuItem, MenuTrigger, Panel, Popover,
  Pagination, PaginationButton, PaginationEllipsis, PaginationLink, PaginationStatus, PopoverContent, PopoverTrigger, Progress, RadioGroup,
  Select, Separator, Sidebar, Skeleton, Spinner,
  Stack, StatusBar, StatusMark, Switch, Tabs, TabsContent, TabsList, TabsTrigger,
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
  TextArea, TextField, Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport,
  Toolbar, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, VisuallyHidden,
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

test('card composition preserves article hierarchy', () => {
  render(<Card><CardHeader><CardTitle>Gateway</CardTitle><CardDescription>Production service</CardDescription></CardHeader><CardContent>Healthy</CardContent><CardFooter><Button>Inspect</Button></CardFooter></Card>);
  const card = screen.getByRole('article');
  expect(card).toHaveClass('ink-ui-card');
  expect(screen.getByRole('heading', { name: 'Gateway', level: 3 })).toBeInTheDocument();
  expect(card).toHaveTextContent('Production serviceHealthyInspect');
});

test('file upload exposes native input and reports selected files', async () => {
  const user = userEvent.setup();
  const onFilesChange = vi.fn();
  render(<FileUpload label="Artwork" accept="image/png" description="PNG only" onFilesChange={onFilesChange} />);
  const input = screen.getByLabelText('Artwork');
  const file = new File(['image'], 'service.png', { type: 'image/png' });
  await user.upload(input, file);
  expect(input).toHaveAttribute('type', 'file');
  expect(input).toHaveAttribute('accept', 'image/png');
  expect(onFilesChange).toHaveBeenCalledWith([file]);
  expect(screen.getByText('PNG only')).toHaveAttribute('id', expect.stringContaining('-description'));
});

test('image surface preserves alt text and renders an error fallback', () => {
  render(<ImageSurface src="broken.png" alt="Service topology" aspectRatio="video" fallback="Preview unavailable" caption="Topology" />);
  const image = screen.getByRole('img', { name: 'Service topology' });
  expect(screen.getByRole('status')).toHaveTextContent('Loading image');
  fireEvent.error(image);
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Service topology' })).toHaveTextContent('Preview unavailable');
  expect(screen.getByText('Topology').tagName).toBe('FIGCAPTION');
});

test('file list exposes upload progress and controlled retry and remove actions', async () => {
  const user = userEvent.setup();
  const retry = vi.fn();
  const remove = vi.fn();
  render(<FileList items={[{ id: 'one', name: 'art.png', status: 'uploading', progress: 45 }, { id: 'two', name: 'source.psd', status: 'error', error: 'Network failed' }]} onRetry={retry} onRemove={remove} />);
  expect(screen.getByRole('progressbar', { name: 'Uploading art.png' })).toHaveAttribute('value', '45');
  await user.click(screen.getByRole('button', { name: 'Retry source.psd' }));
  expect(retry).toHaveBeenCalledWith(expect.objectContaining({ id: 'two' }));
  await user.click(screen.getByRole('button', { name: 'Remove art.png' }));
  expect(remove).toHaveBeenCalledWith(expect.objectContaining({ id: 'one' }));
});

test('avatar falls back to initials and gallery opens an accessible lightbox', async () => {
  const user = userEvent.setup();
  render(<><Avatar name="Ink Theme" /><ImageGallery items={[{ src: 'one.png', alt: 'First diagram' }, { src: 'two.png', alt: 'Second diagram' }]} /></>);
  expect(screen.getByRole('img', { name: 'Ink Theme' })).toHaveTextContent('IT');
  await user.click(screen.getByRole('button', { name: 'Open First diagram' }));
  expect(screen.getByRole('dialog', { name: 'Image preview' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'First diagram' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Next' }));
  expect(screen.getByRole('img', { name: 'Second diagram' })).toBeInTheDocument();
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
  const onRegionChange = vi.fn();
  render(<><TextArea label="Notes" description="Deployment notes" /><RadioGroup label="Tier" name="tier" options={[{ label: 'Primary', value: 'primary' }, { label: 'Replica', value: 'replica' }]} onValueChange={onValueChange} /><Switch label="Tracing" /><Select label="Region" defaultValue="sg" onValueChange={onRegionChange} options={[{ label: 'Singapore', value: 'sg' }, { label: 'Tokyo', value: 'jp' }]} /></>);
  await user.type(screen.getByRole('textbox', { name: 'Notes' }), 'Ready');
  expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveValue('Ready');
  await user.click(screen.getByRole('radio', { name: 'Replica' }));
  expect(onValueChange).toHaveBeenCalledWith('replica');
  await user.click(screen.getByRole('switch', { name: 'Tracing' }));
  expect(screen.getByRole('switch')).toBeChecked();
  await user.click(screen.getByRole('combobox', { name: 'Region' }));
  await user.keyboard('{ArrowDown}{Enter}');
  expect(screen.getByRole('combobox', { name: 'Region' })).toHaveTextContent('Tokyo');
  expect(onRegionChange).toHaveBeenCalledWith('jp');
});

test('feedback components keep meaning in accessible text', () => {
  render(<><Badge tone="warning">Pending</Badge><StatusMark tone="danger" label="Failed" /><Spinner label="Syncing" /><EmptyState title="No services" description="Create the first service" actions={<Button>Create</Button>} /></>);
  expect(screen.getByText('Pending')).toBeInTheDocument();
  expect(screen.getByText('Failed')).toBeInTheDocument();
  expect(screen.getByRole('status', { name: 'Syncing' })).toBeInTheDocument();
  expect(screen.getByText('No services')).toBeInTheDocument();
});

test('extended feedback exposes live semantics and progress values', () => {
  render(<ToastProvider><Alert tone="danger" live="assertive" title="Failed">Retry deployment</Alert><Progress label="Upload" value={40} /><Skeleton label="Loading table" /><Toast open><ToastTitle>Saved</ToastTitle><ToastDescription>Configuration updated</ToastDescription></Toast><ToastViewport /></ToastProvider>);
  expect(screen.getByRole('alert')).toHaveTextContent('Retry deployment');
  expect(screen.getByRole('progressbar', { name: 'Upload' })).toHaveAttribute('aria-valuenow', '40');
  expect(screen.getByRole('status', { name: 'Loading table' })).toBeInTheDocument();
  expect(screen.getByText('Saved')).toBeInTheDocument();
});

test('visual severity remains separate from live announcement priority', () => {
  render(<><Alert tone="danger" title="Static failure">Already present</Alert><Alert tone="danger" live="assertive" title="New failure">Just happened</Alert><ErrorMessage live="polite">Name is unavailable</ErrorMessage></>);
  expect(screen.getByText('Already present').closest('.ink-ui-alert')).not.toHaveAttribute('role');
  expect(screen.getByRole('alert')).toHaveTextContent('Just happened');
  expect(screen.getByRole('status')).toHaveTextContent('Name is unavailable');
});

test('form error summary focuses after submit and links to invalid controls', async () => {
  render(<><FormErrorSummary focusOnMount errors={[{ fieldId: 'service-name', label: 'Service name', message: 'Required' }]} /><TextField id="service-name" label="Service name" error="Required" /></>);
  const summary = await screen.findByRole('alert');
  expect(summary).toHaveFocus();
  expect(screen.getByRole('link', { name: 'Service name: Required' })).toHaveAttribute('href', '#service-name');
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'service-name-error');
});

test('persistent banners and scoped error states expose explicit recovery hierarchy', () => {
  render(<><Banner title="Offline" actions={<Button>Reconnect</Button>}>Changes are stored locally.</Banner><ErrorState title="Preview unavailable" description="Renderer timed out" actions={<Button>Retry</Button>} details="Request 42" /></>);
  expect(screen.getByRole('status', { name: 'System notice' })).toHaveTextContent('Offline');
  expect(screen.getByText('Preview unavailable').closest('.ink-ui-error-state')).toHaveTextContent('Retry');
  expect(screen.getByText('Technical details')).toBeInTheDocument();
});

test('error boundary reports render failures and resets when application keys change', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
  const onError = vi.fn();
  function Unstable({ fail }: { fail: boolean }) { if (fail) throw new Error('Render failed'); return <div>Recovered content</div>; }
  const { rerender } = render(<ErrorBoundary resetKeys={[0]} onError={onError} fallback={({ error }) => <div>Fallback: {error.message}</div>}><Unstable fail /></ErrorBoundary>);
  expect(screen.getByText('Fallback: Render failed')).toBeInTheDocument();
  expect(onError).toHaveBeenCalledWith(expect.any(Error), expect.objectContaining({ componentStack: expect.any(String) }));
  rerender(<ErrorBoundary resetKeys={[1]} onError={onError}><Unstable fail={false} /></ErrorBoundary>);
  expect(screen.getByText('Recovered content')).toBeInTheDocument();
  consoleError.mockRestore();
});

test('combobox, disclosure, navigation, and table preserve native semantics', async () => {
  const user = userEvent.setup();
  render(<><Combobox label="Runtime" options={[{ label: 'Node 20', value: 'node-20' }]} /><Accordion type="single" collapsible><AccordionItem value="one"><AccordionTrigger>Details</AccordionTrigger><AccordionContent>Architecture notes</AccordionContent></AccordionItem></Accordion><Breadcrumb><BreadcrumbLink href="/">Home</BreadcrumbLink><span aria-current="page">Components</span></Breadcrumb><Pagination><PaginationLink href="?page=1" current>1</PaginationLink><PaginationLink href="?page=2">2</PaginationLink></Pagination><Table><TableCaption>Services</TableCaption><TableHeader><TableRow><TableHead scope="col">Name</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Router</TableCell></TableRow></TableBody></Table></>);
  expect(screen.getByRole('combobox', { name: 'Runtime' })).toHaveAttribute('list');
  await user.click(screen.getByRole('button', { name: 'Details' }));
  expect(screen.getByText('Architecture notes')).toBeVisible();
  expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '1' })).toHaveAttribute('aria-current', 'page');
  expect(screen.getByRole('table', { name: 'Services' })).toBeInTheDocument();
});

test('data table composes controlled search, sort, selection, filters, and pagination', async () => {
  const user = userEvent.setup();
  const onSearchChange = vi.fn();
  const onSortChange = vi.fn();
  const onSelectionChange = vi.fn();
  const onPageChange = vi.fn();
  const onRemove = vi.fn();
  const rows = [{ id: 'router', name: 'Router', region: 'Singapore' }];
  render(<DataTable caption="Services" columns={[{ id: 'name', header: 'Name', sortable: true, cell: (row) => row.name }, { id: 'region', header: 'Region', cell: (row) => row.region }]} rows={rows} getRowId={(row) => row.id} selectedRowIds={[]} onSelectionChange={onSelectionChange} onSortChange={onSortChange} toolbar={<DataTableToolbar onSearchChange={onSearchChange} filters={<FilterChip label="Healthy" onRemove={onRemove} />} />} pagination={{ page: 1, pageCount: 2, onPageChange, totalLabel: '2 services' }} />);
  expect(screen.getByRole('table', { name: 'Services' })).toBeInTheDocument();
  await user.type(screen.getByRole('searchbox', { name: 'Search table' }), 'route');
  expect(onSearchChange).toHaveBeenLastCalledWith('route');
  await user.click(screen.getByRole('button', { name: /Name/ }));
  expect(onSortChange).toHaveBeenCalledWith({ columnId: 'name', direction: 'ascending' });
  await user.click(screen.getByRole('checkbox', { name: 'Select row router' }));
  expect(onSelectionChange).toHaveBeenCalledWith(['router']);
  await user.click(screen.getByRole('button', { name: 'Remove filter' }));
  expect(onRemove).toHaveBeenCalled();
  await user.click(screen.getByRole('button', { name: 'Next page' }));
  expect(onPageChange).toHaveBeenCalledWith(2);
});

test('data table announces loading, empty, and error states inside the table', () => {
  const props = { caption: 'Jobs', columns: [{ id: 'name', header: 'Name', cell: (row: { id: string; name: string }) => row.name }], rows: [], getRowId: (row: { id: string }) => row.id };
  const { rerender } = render(<DataTable {...props} loading loadingLabel="Loading jobs" />);
  expect(screen.getByRole('table', { name: 'Jobs' })).toHaveTextContent('Loading jobs');
  rerender(<DataTable {...props} empty="No jobs found" />);
  expect(screen.getByRole('table')).toHaveTextContent('No jobs found');
  rerender(<DataTable {...props} error="Jobs unavailable" />);
  expect(screen.getByRole('table')).toHaveTextContent('Jobs unavailable');
});

test('data table pagination uses the shared page controls and compacts long ranges', () => {
  render(<DataTable caption="Services" columns={[{ id: 'name', header: 'Name', cell: (row: { id: string; name: string }) => row.name }]} rows={[]} getRowId={(row) => row.id} pagination={{ page: 5, pageCount: 10, onPageChange: vi.fn(), totalLabel: '100 services' }} />);
  const pagination = screen.getByRole('navigation', { name: 'Table pagination' });
  expect(pagination).toHaveTextContent('←1…456…10→');
  expect(screen.getByRole('button', { name: 'Page 5' })).toHaveAttribute('aria-current', 'page');
  expect(screen.getByText('Page 5 of 10')).toHaveAttribute('aria-live', 'polite');
});

test('link and button pagination primitives share current and ellipsis semantics', () => {
  render(<Pagination><PaginationLink href="?page=1">1</PaginationLink><PaginationButton current>2</PaginationButton><PaginationEllipsis /><PaginationStatus>Page 2 of 8</PaginationStatus></Pagination>);
  expect(screen.getByRole('button', { name: '2' })).toHaveClass('ink-ui-pagination-item');
  expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page');
  expect(screen.getAllByText('…')[0]).toHaveAttribute('aria-hidden', 'true');
});

test('data table can preserve stale rows while exposing a refresh recovery alert', async () => {
  const user = userEvent.setup();
  const retry = vi.fn();
  const rows = [{ id: 'router', name: 'Router' }];
  render(<DataTable caption="Services" columns={[{ id: 'name', header: 'Name', cell: (row) => row.name }]} rows={rows} getRowId={(row) => row.id} error="Refresh timed out" errorMode="stale" errorActions={<Button onClick={retry}>Retry refresh</Button>} />);
  expect(screen.getByRole('table')).toHaveTextContent('Router');
  expect(screen.getByRole('status')).toHaveTextContent('Refresh timed out');
  await user.click(screen.getByRole('button', { name: 'Retry refresh' }));
  expect(retry).toHaveBeenCalled();
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

test('drawer exposes its side and closes with Escape', async () => {
  const user = userEvent.setup();
  render(<Drawer><DrawerTrigger asChild><Button>Open inspector</Button></DrawerTrigger><DrawerContent side="left" title="Inspector" description="Deployment settings"><Button>Save</Button></DrawerContent></Drawer>);
  await user.click(screen.getByRole('button', { name: 'Open inspector' }));
  expect(screen.getByRole('dialog', { name: 'Inspector' })).toHaveAttribute('data-side', 'left');
  expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog', { name: 'Inspector' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open inspector' })).toHaveFocus();
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
