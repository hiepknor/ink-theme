import { StrictMode, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { createRoot } from 'react-dom/client';
import { componentRegistry, findComponent, type ComponentDoc } from './component-registry';
import { LegacyGallery } from './legacy-gallery';
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
} from '@hiepknor/ink-react';

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
  const [fallbackPreview, setFallbackPreview] = useState('/missing-image.png');
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
    <Inline align="center"><Avatar name="Hiep Knor" src="/sample-avatar.svg" size="lg" /><Avatar name="Ink Tailwind" /><Avatar name="Unavailable User" src="/missing-avatar.png" /></Inline>
    <ImageGallery items={[{ src: '/sample-media.svg', alt: 'Contained architecture artwork', caption: 'Architecture' }, { src: '/sample-media.svg', alt: 'Service topology artwork', caption: 'Topology' }, { src: '/sample-media.svg', alt: 'Deployment artwork', caption: 'Deployment' }]} />
    <div className="max-w-xl"><ImageSurface src={fallbackPreview} alt="Unavailable service artwork" aspectRatio="video" fallback="Preview unavailable" fallbackDescription="The source could not be loaded. Retry or verify the file location." onRetry={() => setFallbackPreview('/sample-media.svg?recovered')} caption="Error fallback" /></div>
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

const catalogPages = [
  { id: 'overview', label: 'Overview', description: 'Coverage, principles, and entry points.', components: ['7 families', 'Web + desktop', 'Native-ready tokens'] },
  { id: 'foundations', label: 'Foundations', description: 'Density, geometry, type, color, and interaction rules.', components: ['InkProvider', 'Surface', 'Density'] },
  { id: 'forms', label: 'Forms', description: 'Input controls and their complete interaction states.', components: ['TextField', 'Select', 'Checkbox', 'Button'] },
  { id: 'feedback', label: 'Feedback', description: 'Status, validation, failures, recovery, and notifications.', components: ['Alert', 'Banner', 'ErrorState', 'Toast'] },
  { id: 'data', label: 'Data', description: 'Tables, filtering, selection, sorting, and pagination.', components: ['DataTable', 'Table', 'Pagination'] },
  { id: 'media', label: 'Media', description: 'Uploads, image surfaces, galleries, and resilient fallbacks.', components: ['FileUpload', 'ImageSurface', 'ImageGallery'] },
  { id: 'desktop', label: 'Desktop', description: 'Application shell, overlays, navigation, and status surfaces.', components: ['Toolbar', 'Sidebar', 'Dialog', 'Drawer'] },
] as const;

type CatalogPage = typeof catalogPages[number]['id'];
type CatalogRoute = CatalogPage | 'all' | `component/${string}`;

function readCatalogPage(): CatalogRoute {
  const route = window.location.hash.replace(/^#\/?/, '');
  if (route === 'all') return 'all';
  if (route.startsWith('component/') && findComponent(route.slice('component/'.length))) return route as `component/${string}`;
  return catalogPages.some((page) => page.id === route) ? route as CatalogPage : 'overview';
}

function CatalogHeader({ page }: { page: typeof catalogPages[number] }) {
  return <header className="ink-catalog-intro">
    <div>
      <p className="gallery-label">Component catalog</p>
      <h1 className="ink-catalog-title" tabIndex={-1} data-catalog-heading>{page.label}</h1>
      <p className="ink-catalog-summary">{page.description}</p>
    </div>
    <div className="ink-catalog-tags" aria-label="Page coverage">
      {page.components.map((component) => <Badge key={component}>{component}</Badge>)}
    </div>
  </header>;
}

function CatalogOverview() {
  return <div className="ink-catalog-overview" data-testid="catalog-overview">
    <Surface variant="elevated" className="grid gap-3">
      <p className="gallery-label">One visual language</p>
      <h2 className="text-xl font-semibold tracking-tight">A review surface for every product target.</h2>
      <p className="max-w-[68ch] text-sm text-fg-2">Inspect public components by responsibility instead of scrolling through a demo wall. Tokens remain portable to web, desktop, and mobile renderers; this catalog verifies the React implementation.</p>
      <Inline wrap><StatusMark tone="ok" label="Core contracts covered" /><StatusMark tone="warning" label="Native renderers planned" /></Inline>
    </Surface>
    <div className="ink-catalog-card-grid">
      {catalogPages.slice(1).map((page) => <a className="ink-catalog-card" href={`#/${page.id}`} key={page.id}>
        <span className="gallery-label">{page.components.length} focus areas</span>
        <strong>{page.label}</strong>
        <span>{page.description}</span>
        <span className="ink-catalog-card-action">Open section <span aria-hidden="true">→</span></span>
      </a>)}
    </div>
  </div>;
}

function FormWorkbench({ catalog = true }: { catalog?: boolean }) {
  const [service, setService] = useState('edge-router');
  const [tracing, setTracing] = useState(true);
  const examples = <>
    {densities.map((density) => <InkProvider density={density} key={density}>
      <Surface variant={density === 'default' ? 'elevated' : 'recessed'} className="grid gap-4" data-density-preview={density}>
        <header className="flex items-center justify-between gap-3"><strong className="font-mono text-xs">{density}</strong><span className="text-xs text-fg-3">{density === 'compact' ? '32px' : density === 'touch' ? '48px' : '40px'}</span></header>
        <div className="flex flex-wrap gap-3"><Button variant="primary">Primary</Button><Button>Secondary</Button><Button variant="quiet">Quiet</Button><Button disabled>Disabled</Button><Button loading loadingLabel="Creating service">Loading</Button></div>
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Service name" description="Controlled text input" value={service} onChange={(event) => setService(event.currentTarget.value)} />
          <TextField label="Read-only region" defaultValue="ap-southeast" readOnly />
          <TextField label="Invalid service" defaultValue="duplicate" error="Service already exists" />
          <TextField label="Disabled field" defaultValue="Unavailable" disabled />
          <Select label="Custom deployment region" defaultValue="sg" options={[{ label: 'Singapore', value: 'sg' }, { label: 'Tokyo', value: 'jp' }, { label: 'Frankfurt', value: 'de' }]} />
        </div>
        <div className="grid gap-2"><Checkbox label="Tracing" description="Controlled checkbox" checked={tracing} onChange={(event) => setTracing(event.currentTarget.checked)} /><Checkbox label="Required review" error="Confirm before deployment" /><Checkbox label="Unavailable option" disabled /></div>
      </Surface>
    </InkProvider>)}
  </>;
  if (!catalog) return examples;
  return <Stack gap="lg"><div><p className="text-sm font-semibold">Density and control states</p><p className="text-xs text-fg-3">Every control is shown across compact, default, and touch targets.</p></div>{examples}</Stack>;
}

function FoundationsWorkbench() {
  return <Stack gap="lg" data-testid="foundations-workbench">
    <Surface variant="recessed" className="grid gap-3"><p className="gallery-label">Renderer contract</p><h3 className="text-lg font-semibold">Tokens first, components second.</h3><p className="text-sm text-fg-2">Semantic color, spacing, typography, screentone, focus, and motion tokens are shared. Each platform renderer owns its native interaction semantics.</p></Surface>
    <div className="grid gap-3 md:grid-cols-3"><Card><CardHeader><CardTitle>Compact · 32px</CardTitle><CardDescription>Dense desktop tools and data.</CardDescription></CardHeader></Card><Card><CardHeader><CardTitle>Default · 40px</CardTitle><CardDescription>General web product surfaces.</CardDescription></CardHeader></Card><Card><CardHeader><CardTitle>Touch · 48px</CardTitle><CardDescription>Coarse pointer and mobile targets.</CardDescription></CardHeader></Card></div>
    <Alert title="Native fallback remains covered">Open the compatibility route to review raw HTML controls and strict-scope behavior.</Alert>
    <Button onClick={() => { window.location.hash = '/all'; }}>Open native compatibility matrix</Button>
  </Stack>;
}

function ComponentExample({ doc }: { doc: ComponentDoc }) {
  if (doc.slug === 'button') return <Inline wrap><Button variant="primary">Primary</Button><Button>Secondary</Button><Button variant="quiet">Quiet</Button><Button loading>Loading</Button><Button disabled>Disabled</Button></Inline>;
  if (doc.slug === 'text-field') return <div className="grid gap-4 md:grid-cols-2"><TextField label="Service name" defaultValue="edge-router" description="Persistent guidance" /><TextField label="Invalid service" defaultValue="x" error="Use at least three characters" /><TextField label="Read-only region" defaultValue="ap-southeast" readOnly /><TextField label="Unavailable" disabled /></div>;
  if (doc.slug === 'select') return <div className="max-w-md"><Select label="Deployment region" defaultValue="sg" options={[{ label: 'Singapore', value: 'sg' }, { label: 'Tokyo', value: 'jp' }, { label: 'Frankfurt', value: 'de' }]} /></div>;
  if (doc.slug === 'alert') return <div className="grid gap-3 md:grid-cols-2"><Alert title="Deployment ready" tone="ok">All gates passed.</Alert><Alert title="Action required" tone="danger">Two variables are missing.</Alert></div>;
  if (doc.slug === 'status-mark') return <Inline wrap><StatusMark label="Healthy" tone="ok" /><StatusMark label="Pending" tone="warning" /><StatusMark label="Degraded" tone="danger" /></Inline>;
  if (doc.slug === 'image-surface') return <div className="max-w-lg"><ImageSurface src="/sample-media.svg" alt="Abstract service architecture" aspectRatio="video" caption="Architecture preview" /></div>;
  if (doc.slug === 'dialog') return <Dialog><DialogTrigger asChild><Button variant="primary">Open dialog</Button></DialogTrigger><DialogContent title="Create service" description="Review metadata before continuing."><Stack><TextField label="Service name" defaultValue="edge-router" /><Button variant="primary">Create</Button></Stack></DialogContent></Dialog>;
  if (doc.slug === 'drawer') return <Drawer><DrawerTrigger asChild><Button>Open drawer</Button></DrawerTrigger><DrawerContent title="Service inspector" description="Review settings without leaving this page."><TextField label="Service" defaultValue="edge-router" /></DrawerContent></Drawer>;
  if (doc.slug === 'data-table') return <DataTable caption="Service inventory example" columns={[{ id: 'name', header: 'Service', cell: (row) => row.name }, { id: 'status', header: 'Status', cell: (row) => <StatusMark label={row.status} tone="ok" /> }]} rows={serviceRows.slice(0, 2)} getRowId={(row) => row.id} />;
  return <Surface variant="recessed" className="grid gap-3"><StatusMark tone="ok" label="Public contract available" /><p className="text-sm text-fg-2">The complete composition is demonstrated on the {doc.category} family page. This reference documents its public contract and required states.</p><Button density="compact" onClick={() => { window.location.hash = `/${categoryRoute(doc.category)}`; }}>Open family examples</Button></Surface>;
}

function categoryRoute(category: ComponentDoc['category']): CatalogPage {
  if (category === 'Layout') return 'foundations';
  if (category === 'Navigation' || category === 'Overlays') return 'desktop';
  return category.toLowerCase() as CatalogPage;
}

function ComponentDocumentation({ doc }: { doc: ComponentDoc }) {
  const related = componentRegistry.filter((component) => component.category === doc.category && component.slug !== doc.slug).slice(0, 5);
  return <Stack gap="xl" data-testid="component-documentation">
    <Breadcrumb><BreadcrumbLink href="#/overview">Catalog</BreadcrumbLink><BreadcrumbLink href={`#/${categoryRoute(doc.category)}`}>{doc.category}</BreadcrumbLink><span aria-current="page">{doc.name}</span></Breadcrumb>
    <section className="ink-doc-section" aria-labelledby="example-title"><div className="ink-doc-section-heading"><div><p className="gallery-label">Interactive example</p><h3 id="example-title">{doc.name} example</h3></div><Badge>Stable</Badge></div><div className="ink-doc-example"><ComponentExample doc={doc} /></div></section>
    <section className="ink-doc-section" aria-labelledby="states-title"><div className="ink-doc-section-heading"><div><p className="gallery-label">Visual contract</p><h3 id="states-title">Required states</h3></div><span className="text-xs text-fg-3">{doc.states.length} states</span></div><div className="ink-doc-state-grid">{doc.states.map((state) => <div key={state}><span className="ink-tone-outline" aria-hidden="true" /><span>{state}</span></div>)}</div></section>
    <section className="ink-doc-section" aria-labelledby="api-title"><div className="ink-doc-section-heading"><div><p className="gallery-label">Public API</p><h3 id="api-title">Key props</h3></div><code className="font-mono text-xs">@hiepknor/ink-react</code></div><div className="overflow-x-auto"><table className="ink-doc-prop-table"><thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Purpose</th></tr></thead><tbody>{doc.props.map((prop) => <tr key={prop.name}><td><code>{prop.name}</code></td><td><code>{prop.type}</code></td><td><code>{prop.defaultValue}</code></td><td>{prop.description}</td></tr>)}</tbody></table></div></section>
    <section className="ink-doc-section" aria-labelledby="a11y-title"><div className="ink-doc-section-heading"><div><p className="gallery-label">Accessibility</p><h3 id="a11y-title">Usage requirement</h3></div></div><Alert title="Contract">{doc.accessibility}</Alert></section>
    {related.length > 0 && <section className="ink-doc-section" aria-labelledby="related-title"><div className="ink-doc-section-heading"><div><p className="gallery-label">Continue exploring</p><h3 id="related-title">Related components</h3></div></div><div className="ink-doc-related">{related.map((component) => <a href={`#/component/${component.slug}`} key={component.slug}>{component.name}<span aria-hidden="true">→</span></a>)}</div></section>}
  </Stack>;
}

function ComponentSearch({ open, onOpenChange, triggerRef }: { open: boolean; onOpenChange: (open: boolean) => void; triggerRef: RefObject<HTMLButtonElement | null> }) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const results = normalizedQuery ? componentRegistry.filter((component) => `${component.name} ${component.category} ${component.description}`.toLowerCase().includes(normalizedQuery)).slice(0, 10) : [];
  const families = Array.from(new Set(componentRegistry.map((component) => component.category))).map((category) => ({ category, count: componentRegistry.filter((component) => component.category === category).length }));
  useEffect(() => { if (!open) setQuery(''); }, [open]);
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent title="Find a component" description="Search public Ink UI contracts by name, family, or purpose." onCloseAutoFocus={(event) => { event.preventDefault(); triggerRef.current?.focus(); }}>
    <Stack gap="md"><TextField autoFocus label="Search components" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Button, upload, navigation…" />
      {!normalizedQuery ? <div><p className="gallery-label mb-2">Browse by family</p><div className="ink-command-families">{families.map(({ category, count }) => <a href={`#/${categoryRoute(category)}`} onClick={() => onOpenChange(false)} key={category}><strong>{category}</strong><span>{count} components</span></a>)}</div></div>
        : <div><div className="mb-2 flex items-center justify-between gap-3"><p className="gallery-label">Component results</p><span className="text-xs text-fg-3">{results.length} found</span></div><div className="ink-command-results" role="list" aria-label="Component results">{results.map((component) => <a role="listitem" href={`#/component/${component.slug}`} onClick={() => onOpenChange(false)} key={component.slug}><span><strong>{component.name}</strong><small>{component.description}</small></span><Badge>{component.category}</Badge></a>)}{results.length === 0 && <EmptyState title="No component found" description="Try a component name, family, or purpose." />}</div></div>}
    </Stack>
  </DialogContent></Dialog>;
}

function ReactPreview() {
  const [activePage, setActivePage] = useState<CatalogRoute>(readCatalogPage);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const syncRoute = () => {
      const route = window.location.hash.replace(/^#\/?/, '');
      if (route !== 'all' && !catalogPages.some((page) => page.id === route) && !(route.startsWith('component/') && findComponent(route.slice('component/'.length)))) return;
      setActivePage(readCatalogPage());
      window.requestAnimationFrame(() => document.querySelector<HTMLElement>('[data-catalog-heading]')?.focus({ preventScroll: true }));
    };
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', openSearch);
    return () => window.removeEventListener('keydown', openSearch);
  }, []);

  useEffect(() => {
    document.body.dataset.catalogPage = activePage;
  }, [activePage]);

  const activeDoc = activePage.startsWith('component/') ? findComponent(activePage.slice('component/'.length)) : undefined;
  const currentPage = catalogPages.find((page) => page.id === activePage) ?? catalogPages[0];
  const content = activePage === 'overview' ? <CatalogOverview />
    : activePage === 'foundations' ? <FoundationsWorkbench />
    : activePage === 'forms' ? <FormWorkbench />
    : activePage === 'feedback' ? <Stack gap="xl"><ComponentBreadth /><Separator /><ErrorExperienceWorkbench /></Stack>
    : activePage === 'data' ? <DataTableWorkbench />
    : activePage === 'media' ? <MediaWorkbench />
    : activePage === 'desktop' ? <DesktopFoundation />
    : activeDoc ? <ComponentDocumentation doc={activeDoc} />
    : null;

  if (activePage === 'all') {
    const componentPreview = <TooltipProvider delayDuration={200}><Surface aria-label="React component examples" className="grid gap-5">
      <div><p className="text-sm font-semibold">Tailwind-free package output</p><p className="mt-1 text-xs text-fg-3">Tab through native controls. Each row inherits density from InkProvider.</p></div>
      <FormWorkbench catalog={false} /><Separator /><DesktopFoundation /><Separator /><ComponentBreadth /><Separator /><ErrorExperienceWorkbench /><Separator /><DataTableWorkbench /><Separator /><MediaWorkbench />
    </Surface></TooltipProvider>;
    return <LegacyGallery componentPreview={componentPreview} />;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="ink-catalog-shell" data-testid="catalog-shell">
        <aside className="ink-catalog-sidebar">
          <a className="ink-catalog-brand" href="#/overview"><span className="ink-tone-solid" aria-hidden="true" /> <span>Ink UI</span><small>Workbench</small></a>
          <button ref={searchTriggerRef} className="ink-catalog-search" type="button" onClick={() => setSearchOpen(true)}><span>Find component</span><kbd>{navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'} K</kbd></button>
          <nav className="ink-catalog-nav" aria-label="Component catalog">
            {catalogPages.map((page) => <a href={`#/${page.id}`} aria-current={activePage === page.id ? 'page' : undefined} key={page.id}>{page.label}</a>)}
          </nav>
          <p className="ink-catalog-version">@hiepknor/ink-react</p>
        </aside>
        <main className="ink-catalog-main" id="catalog-content">
          {activeDoc ? <header className="ink-catalog-intro"><div><p className="gallery-label">{activeDoc.category} component</p><h1 className="ink-catalog-title" tabIndex={-1} data-catalog-heading>{activeDoc.name}</h1><p className="ink-catalog-summary">{activeDoc.description}</p></div><div className="ink-catalog-tags"><Badge>Stable</Badge><Badge>{activeDoc.states.length} states</Badge></div></header> : <CatalogHeader page={currentPage} />}
          <Surface aria-label="React component examples" className="ink-catalog-content">{content}</Surface>
        </main>
        <ComponentSearch open={searchOpen} onOpenChange={setSearchOpen} triggerRef={searchTriggerRef} />
      </div>
    </TooltipProvider>
  );
}

const root = document.querySelector('#root');
if (!root) throw new Error('Workbench root is missing');
document.body.dataset.catalogPage = readCatalogPage();
createRoot(root).render(<StrictMode><ReactPreview /></StrictMode>);
