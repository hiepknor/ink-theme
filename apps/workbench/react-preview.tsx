import { StrictMode, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  Avatar,
  Banner,
  Badge,
  Breadcrumb,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Combobox,
  Dialog,
  DialogContent,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DataTable,
  DataTableFilter,
  DataTableToolbar,
  EmptyState,
  ErrorState,
  FileList,
  FileUpload,
  FormErrorSummary,
  IconButton,
  InkProvider,
  ImageSurface,
  ImageGallery,
  Inline,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Panel,
  Pagination,
  PaginationLink,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  Select,
  Separator,
  Sidebar,
  Skeleton,
  Spinner,
  Stack,
  StatusBar,
  StatusMark,
  Surface,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextArea,
  TextField,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Toolbar,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type InkDensity,
  type DataTableSort,
  type UploadFileItem,
} from '@hiepknor/ink-ui-react';

const densities: InkDensity[] = ['compact', 'default', 'touch'];

const serviceRows = [
  { id: 'edge-router', name: 'Edge router', owner: 'Platform', region: 'Singapore', status: 'Healthy' },
  { id: 'audit-worker', name: 'Audit worker', owner: 'Security', region: 'Tokyo', status: 'Pending' },
  { id: 'archive-store', name: 'Archive store', owner: 'Data', region: 'Frankfurt', status: 'Degraded' },
  { id: 'web-gateway', name: 'Web gateway', owner: 'Platform', region: 'Singapore', status: 'Healthy' },
  { id: 'event-relay', name: 'Event relay', owner: 'Platform', region: 'Tokyo', status: 'Healthy' },
];

function ErrorExperienceWorkbench() {
  const [submitted, setSubmitted] = useState(true);
  const [focusSummary, setFocusSummary] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [tableError, setTableError] = useState(true);
  const errors = submitted ? [
    { fieldId: 'error-service-name', label: 'Service name', message: 'Use at least three characters' },
    { fieldId: 'error-region', label: 'Region', message: 'Select a deployment region' },
  ] : [];
  return <ToastProvider swipeDirection="right"><Stack gap="lg" data-testid="error-experience">
    <div><p className="text-sm font-semibold">Error hierarchy and recovery</p><p className="text-xs text-fg-3">Errors stay next to their source and escalate only when the affected scope grows.</p></div>
    <Banner tone="warning" title="Working offline" actions={<Button density="compact">Reconnect</Button>}>Changes remain on this device until the connection returns.</Banner>
    <div className="grid gap-4 md:grid-cols-2">
      <Card><CardHeader><CardTitle>Field and form errors</CardTitle><CardDescription>Submit-level summary links back to each invalid control.</CardDescription></CardHeader><CardContent><form className="grid gap-3" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); setFocusSummary(true); }}><FormErrorSummary errors={errors} focusOnMount={focusSummary} /><TextField id="error-service-name" label="Service name" defaultValue="x" error={submitted ? 'Use at least three characters' : undefined} /><Select id="error-region" label="Region" placeholder="Choose a region" error={submitted ? 'Select a deployment region' : undefined} options={[{ label: 'Singapore', value: 'sg' }, { label: 'Tokyo', value: 'jp' }]} /><Inline><Button type="submit" variant="primary">Validate form</Button><Button onClick={() => { setSubmitted(false); setFocusSummary(false); }}>Clear errors</Button></Inline></form></CardContent></Card>
      <Card><CardHeader><CardTitle>Section failure</CardTitle><CardDescription>Replace only the region that cannot render.</CardDescription></CardHeader><CardContent><ErrorState title="Preview unavailable" description="The rendering service did not respond." details="Request ID: req_01INK_THEME" actions={<><Button density="compact" variant="primary">Retry</Button><Button density="compact">Open logs</Button></>} /></CardContent></Card>
    </div>
    <DataTable caption="Service health cache" columns={[{ id: 'name', header: 'Service', cell: (row) => row.name }, { id: 'region', header: 'Region', cell: (row) => row.region }, { id: 'status', header: 'Last known status', cell: (row) => row.status }]} rows={serviceRows.slice(0, 3)} getRowId={(row) => row.id} error={tableError ? 'Refresh failed. Showing data from two minutes ago.' : undefined} errorMode="stale" errorTitle="Could not refresh services" errorActions={tableError && <Button density="compact" onClick={() => setTableError(false)}>Retry refresh</Button>} />
    <Inline wrap><Dialog><DialogTrigger asChild><Button>Open failed dialog</Button></DialogTrigger><DialogContent title="Create service" description="The dialog remains open so entered data is preserved."><Stack><Alert tone="danger" live="off" title="Service was not created">The name is already in use.<div className="ink-ui-alert-actions"><Button density="compact">Check availability</Button></div></Alert><TextField label="Service name" defaultValue="edge-router" /><Button variant="primary">Try again</Button></Stack></DialogContent></Dialog><Button onClick={() => setToastOpen(true)}>Show background error</Button></Inline>
    <Toast open={toastOpen} onOpenChange={setToastOpen} tone="danger"><ToastTitle>Sync interrupted</ToastTitle><ToastDescription>Your edits are safe and will retry automatically.</ToastDescription><ToastAction altText="Retry synchronization">Retry now</ToastAction><ToastClose aria-label="Dismiss notification">×</ToastClose></Toast><ToastViewport />
  </Stack></ToastProvider>;
}

function DataTableWorkbench() {
  const [query, setQuery] = useState('');
  const [owner, setOwner] = useState('all');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState<string[]>([]);
  const [sort, setSort] = useState<DataTableSort>({ columnId: 'name', direction: 'ascending' });
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const filtered = useMemo(() => serviceRows.filter((row) => (owner === 'all' || row.owner.toLowerCase() === owner) && (status === 'all' || row.status.toLowerCase() === status) && Object.values(row).some((value) => value.toLowerCase().includes(query.toLowerCase()))).sort((left, right) => {
    const first = String(left[sort.columnId as keyof typeof left]);
    const second = String(right[sort.columnId as keyof typeof right]);
    return first.localeCompare(second) * (sort.direction === 'ascending' ? 1 : -1);
  }), [owner, query, sort, status]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  useEffect(() => setPage(1), [query, owner, status]);
  return <Stack gap="lg" data-testid="data-table-workbench">
    <div><p className="text-sm font-semibold">Controlled data table</p><p className="text-xs text-fg-3">Search, filter, sort, selection and pagination stay composable with product-owned data.</p></div>
    <DataTable
      caption="Service inventory"
      columns={[
        { id: 'name', header: 'Service', sortable: true, cell: (row) => <strong>{row.name}</strong> },
        { id: 'owner', header: 'Owner', sortable: true, cell: (row) => row.owner },
        { id: 'region', header: 'Region', sortable: true, cell: (row) => row.region },
        { id: 'status', header: 'Status', sortable: true, cell: (row) => <StatusMark tone={row.status === 'Healthy' ? 'ok' : row.status === 'Pending' ? 'warning' : 'danger'} label={row.status} /> },
      ]}
      rows={visible}
      getRowId={(row) => row.id}
      selectedRowIds={selected}
      onSelectionChange={setSelected}
      sort={sort}
      onSortChange={setSort}
      empty="No services match these filters."
      toolbar={<DataTableToolbar searchValue={query} onSearchChange={setQuery} searchPlaceholder="Search services" filters={<><DataTableFilter label="Filter by owner" value={owner} onValueChange={setOwner} options={[{ label: 'All owners', value: 'all' }, { label: 'Owner: Platform', value: 'platform' }, { label: 'Owner: Security', value: 'security' }, { label: 'Owner: Data', value: 'data' }]} /><DataTableFilter label="Filter by status" value={status} onValueChange={setStatus} options={[{ label: 'All statuses', value: 'all' }, { label: 'Status: Healthy', value: 'healthy' }, { label: 'Status: Pending', value: 'pending' }, { label: 'Status: Degraded', value: 'degraded' }]} /></>} actions={<>{(query || owner !== 'all' || status !== 'all') && <Button density="compact" variant="quiet" onClick={() => { setQuery(''); setOwner('all'); setStatus('all'); }}>Clear filters</Button>}{selected.length > 0 && <Button density="compact">Archive {selected.length}</Button>}</>} />}
      pagination={{ page, pageCount, onPageChange: setPage, totalLabel: `${filtered.length} services` }}
    />
  </Stack>;
}

function MediaWorkbench() {
  const [preview, setPreview] = useState('/sample-media.svg');
  const [fileName, setFileName] = useState('sample-media.svg');
  const [files, setFiles] = useState<UploadFileItem[]>([
    { id: 'artwork', name: 'service-artwork.svg', size: 184320, status: 'success' },
    { id: 'screens', name: 'screenshots.zip', size: 2411724, status: 'uploading', progress: 64 },
    { id: 'brand', name: 'brand-source.psd', size: 8921170, status: 'error', error: 'Connection interrupted' },
  ]);
  useEffect(() => () => { if (preview.startsWith('blob:')) URL.revokeObjectURL(preview); }, [preview]);
  return <Stack gap="lg" data-testid="media-workbench">
    <div><p className="text-sm font-semibold">Upload and image workflows</p><p className="text-xs text-fg-3">Native input semantics, app-controlled queue state, resilient imagery and an accessible lightbox.</p></div>
    <div className="grid gap-4 md:grid-cols-2">
      <FileUpload label="Service artwork" accept="image/png,image/jpeg,image/svg+xml" description={fileName ? `Selected: ${fileName}` : 'Maximum size is validated by the product.'} onFilesChange={(files) => { const file = files[0]; if (!file) return; setPreview(URL.createObjectURL(file)); setFileName(file.name); }} />
      <ImageSurface src={preview} alt="Abstract service architecture preview" aspectRatio="video" caption={fileName} />
    </div>
    <FileList items={files} onRemove={(item) => setFiles((current) => current.filter((candidate) => candidate.id !== item.id))} onRetry={(item) => setFiles((current) => current.map((candidate) => candidate.id === item.id ? { ...candidate, status: 'uploading', progress: 0, error: undefined } : candidate))} />
    <Inline align="center"><Avatar name="Hiep Knor" src="/sample-avatar.svg" size="lg" /><Avatar name="Ink Theme" /><Avatar name="Unavailable User" src="/missing-avatar.png" /></Inline>
    <ImageGallery items={[{ src: '/sample-media.svg', alt: 'Contained architecture artwork', caption: 'Architecture' }, { src: '/sample-media.svg', alt: 'Service topology artwork', caption: 'Topology' }, { src: '/sample-media.svg', alt: 'Deployment artwork', caption: 'Deployment' }]} />
    <ImageSurface src="/missing-image.png" alt="Unavailable service artwork" aspectRatio="video" fallback="No preview available" caption="Error fallback" />
  </Stack>;
}

function ComponentBreadth() {
  const [toastOpen, setToastOpen] = useState(false);
  return <ToastProvider swipeDirection="right"><Stack gap="lg" data-testid="component-breadth">
    <div><p className="text-sm font-semibold">Extended component library</p><p className="text-xs text-fg-3">Navigation, disclosure, data, and application feedback contracts.</p></div>
    <Breadcrumb><BreadcrumbLink href="#react-preview">Workbench</BreadcrumbLink><BreadcrumbLink href="#components">Components</BreadcrumbLink><span aria-current="page">Feedback</span></Breadcrumb>
    <div className="grid gap-3 md:grid-cols-2"><Alert title="Deployment ready" tone="ok">All validation gates passed.</Alert><Alert title="Action required" tone="danger">Two environment variables are missing.</Alert></div>
    <div className="grid gap-4 md:grid-cols-3" data-testid="card-composition">
      <Card><CardHeader><CardTitle>API gateway</CardTitle><CardDescription>Production service</CardDescription></CardHeader><CardContent><StatusMark tone="ok" label="Healthy" /></CardContent><CardFooter><Button density="compact">Inspect</Button></CardFooter></Card>
      <Card><CardHeader><CardTitle>Event worker</CardTitle><CardDescription>Background queue</CardDescription></CardHeader><CardContent><StatusMark tone="warning" label="Starting" /></CardContent><CardFooter><Button density="compact">Inspect</Button></CardFooter></Card>
      <Card><CardHeader><CardTitle>Archive store</CardTitle><CardDescription>Cold storage</CardDescription></CardHeader><CardContent><StatusMark tone="danger" label="Degraded" /></CardContent><CardFooter><Button density="compact" variant="primary">Resolve</Button></CardFooter></Card>
    </div>
    <Progress label="Package coverage" value={72} />
    <Skeleton style={{ width: '55%' }} />
    <Combobox label="Runtime" description="Type or choose a supported runtime" options={[{ label: 'Node.js 20', value: 'node-20' }, { label: 'Node.js 22', value: 'node-22' }, { label: 'Node.js 24', value: 'node-24' }]} />
    <Accordion type="single" collapsible defaultValue="architecture"><AccordionItem value="architecture"><AccordionTrigger>Architecture</AccordionTrigger><AccordionContent>Tokens are shared; renderers stay platform-specific.</AccordionContent></AccordionItem><AccordionItem value="release"><AccordionTrigger>Release policy</AccordionTrigger><AccordionContent>Every published contract passes the aggregate CI gate.</AccordionContent></AccordionItem></Accordion>
    <Table><TableCaption>Representative service inventory</TableCaption><TableHeader><TableRow><TableHead scope="col">Service</TableHead><TableHead scope="col">Region</TableHead><TableHead scope="col">Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>edge-router</TableCell><TableCell>Singapore</TableCell><TableCell><StatusMark tone="ok" label="Ready" /></TableCell></TableRow><TableRow><TableCell>audit-worker</TableCell><TableCell>Tokyo</TableCell><TableCell><StatusMark tone="warning" label="Pending" /></TableCell></TableRow></TableBody></Table>
    <Inline justify="between"><Pagination><PaginationLink href="#previous" aria-label="Previous page">←</PaginationLink><PaginationLink href="#page-1" current>1</PaginationLink><PaginationLink href="#page-2">2</PaginationLink><PaginationLink href="#next" aria-label="Next page">→</PaginationLink></Pagination><Button onClick={() => setToastOpen(true)}>Show toast</Button></Inline>
    <Toast open={toastOpen} onOpenChange={setToastOpen} tone="ok"><ToastTitle>Changes saved</ToastTitle><ToastDescription>The service configuration is up to date.</ToastDescription><ToastClose aria-label="Close">×</ToastClose></Toast><ToastViewport />
  </Stack></ToastProvider>;
}

function DesktopFoundation() {
  return (
    <Stack gap="lg" data-testid="desktop-foundation">
      <Inline justify="between">
        <div><p className="text-sm font-semibold">Desktop application shell</p><p className="text-xs text-fg-3">Built only from public Ink APIs</p></div>
        <Inline gap="sm"><StatusMark tone="ok" label="Connected" /><Badge>v0.1</Badge></Inline>
      </Inline>
      <Panel className="p-0">
        <Toolbar aria-label="Workspace tools">
          <ButtonGroup label="Document actions" density="compact"><IconButton label="Add">+</IconButton><IconButton label="Refresh">↻</IconButton></ButtonGroup>
          <Separator orientation="vertical" />
          <Menu><MenuTrigger asChild><Button density="compact">Actions</Button></MenuTrigger><MenuContent><MenuItem>Rename</MenuItem><MenuItem>Duplicate</MenuItem></MenuContent></Menu>
          <Tooltip><TooltipTrigger asChild><IconButton density="compact" label="Help">?</IconButton></TooltipTrigger><TooltipContent>Keyboard shortcuts</TooltipContent></Tooltip>
        </Toolbar>
        <div className="grid min-h-72 md:grid-cols-[220px_minmax(0,1fr)]">
          <Sidebar aria-label="Project navigation"><Stack gap="sm"><strong className="text-xs">PROJECT</strong><Button variant="quiet">Overview</Button><Button variant="quiet">Services</Button></Stack></Sidebar>
          <Tabs defaultValue="editor">
            <TabsList aria-label="Workspace views"><TabsTrigger value="editor">Editor</TabsTrigger><TabsTrigger value="preview">Preview</TabsTrigger></TabsList>
            <TabsContent value="editor"><Stack><TextArea label="Description" defaultValue="Routes public traffic." /><RadioGroup label="Tier" name="preview-tier" defaultValue="primary" options={[{ label: 'Primary', value: 'primary' }, { label: 'Replica', value: 'replica' }]} /><Switch label="Tracing enabled" defaultChecked /><Select label="Region" defaultValue="sg" options={[{ label: 'Singapore', value: 'sg' }, { label: 'Tokyo', value: 'jp' }, { label: 'Frankfurt', value: 'de' }]} /></Stack></TabsContent>
            <TabsContent value="preview"><EmptyState title="No preview selected" description="Choose a service from the sidebar." actions={<Button>Select service</Button>} /></TabsContent>
          </Tabs>
        </div>
        <StatusBar><span>main</span><Inline gap="sm"><Spinner label="Synchronizing" /><span>Ln 24, Col 8</span></Inline></StatusBar>
      </Panel>
      <Inline>
        <Dialog><DialogTrigger asChild><Button variant="primary">Open dialog</Button></DialogTrigger><DialogContent title="Create service" description="Review metadata before creating the service."><Stack><TextField label="Name" defaultValue="edge-router" /><Button variant="primary">Create</Button></Stack></DialogContent></Dialog>
        <Drawer><DrawerTrigger asChild><Button>Open drawer</Button></DrawerTrigger><DrawerContent title="Service inspector" description="Review deployment settings without leaving the workspace."><Stack><TextField label="Service" defaultValue="edge-router" /><Select label="Region" defaultValue="sg" options={[{ label: 'Singapore', value: 'sg' }, { label: 'Tokyo', value: 'jp' }]} /><Button variant="primary">Save changes</Button></Stack></DrawerContent></Drawer>
        <Popover><PopoverTrigger asChild><Button>Open popover</Button></PopoverTrigger><PopoverContent><StatusMark tone="warning" label="Pending review" /></PopoverContent></Popover>
      </Inline>
    </Stack>
  );
}

function ReactPreview() {
  const [service, setService] = useState('edge-router');
  const [tracing, setTracing] = useState(true);

  return (
    <TooltipProvider delayDuration={200}>
    <Surface aria-label="React component examples" className="grid gap-5">
      <div>
        <p className="text-sm font-semibold">Tailwind-free package output</p>
        <p className="mt-1 text-xs text-fg-3">Tab through native controls. Each row inherits density from InkProvider.</p>
      </div>

      {densities.map((density) => (
        <InkProvider density={density} key={density}>
          <Surface variant={density === 'default' ? 'elevated' : 'recessed'} className="grid gap-4" data-density-preview={density}>
            <header className="flex items-center justify-between gap-3">
              <strong className="font-mono text-xs">{density}</strong>
              <span className="text-xs text-fg-3">{density === 'compact' ? '32px' : density === 'touch' ? '48px' : '40px'}</span>
            </header>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button>Secondary</Button>
              <Button variant="quiet">Quiet</Button>
              <Button disabled>Disabled</Button>
              <Button loading loadingLabel="Creating service">Loading</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Service name"
                description="Controlled text input"
                value={service}
                onChange={(event) => setService(event.currentTarget.value)}
              />
              <TextField label="Read-only region" defaultValue="ap-southeast" readOnly />
              <TextField label="Invalid service" defaultValue="duplicate" error="Service already exists" />
              <TextField label="Disabled field" defaultValue="Unavailable" disabled />
              <Select label="Custom deployment region" defaultValue="sg" options={[{ label: 'Singapore', value: 'sg' }, { label: 'Tokyo', value: 'jp' }, { label: 'Frankfurt', value: 'de' }]} />
            </div>
            <div className="grid gap-2">
              <Checkbox
                label="Tracing"
                description="Controlled checkbox"
                checked={tracing}
                onChange={(event) => setTracing(event.currentTarget.checked)}
              />
              <Checkbox label="Required review" error="Confirm before deployment" />
              <Checkbox label="Unavailable option" disabled />
            </div>
          </Surface>
        </InkProvider>
      ))}
      <Separator />
      <DesktopFoundation />
      <Separator />
      <ComponentBreadth />
      <Separator />
      <ErrorExperienceWorkbench />
      <Separator />
      <DataTableWorkbench />
      <Separator />
      <MediaWorkbench />
    </Surface>
    </TooltipProvider>
  );
}

const root = document.querySelector('#react-preview');
if (!root) throw new Error('React preview root is missing');
createRoot(root).render(<StrictMode><ReactPreview /></StrictMode>);
