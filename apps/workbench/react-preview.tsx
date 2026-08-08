import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  Badge,
  Breadcrumb,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Checkbox,
  Combobox,
  Dialog,
  DialogContent,
  DialogTrigger,
  EmptyState,
  IconButton,
  InkProvider,
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
} from '@hiepknor/ink-ui-react';

const densities: InkDensity[] = ['compact', 'default', 'touch'];

function ComponentBreadth() {
  const [toastOpen, setToastOpen] = useState(false);
  return <ToastProvider swipeDirection="right"><Stack gap="lg" data-testid="component-breadth">
    <div><p className="text-sm font-semibold">Extended component library</p><p className="text-xs text-fg-3">Navigation, disclosure, data, and application feedback contracts.</p></div>
    <Breadcrumb><BreadcrumbLink href="#react-preview">Workbench</BreadcrumbLink><BreadcrumbLink href="#components">Components</BreadcrumbLink><span aria-current="page">Feedback</span></Breadcrumb>
    <div className="grid gap-3 md:grid-cols-2"><Alert title="Deployment ready" tone="ok">All validation gates passed.</Alert><Alert title="Action required" tone="danger">Two environment variables are missing.</Alert></div>
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
    </Surface>
    </TooltipProvider>
  );
}

const root = document.querySelector('#react-preview');
if (!root) throw new Error('React preview root is missing');
createRoot(root).render(<StrictMode><ReactPreview /></StrictMode>);
