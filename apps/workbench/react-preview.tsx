import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  Select,
  Separator,
  Sidebar,
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
  Toolbar,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type InkDensity,
} from '@hiepknor/ink-ui-react';

const densities: InkDensity[] = ['compact', 'default', 'touch'];

function DesktopFoundation() {
  return (
    <Stack gap="lg">
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
            <TabsContent value="editor"><Stack><TextArea label="Description" defaultValue="Routes public traffic." /><RadioGroup label="Tier" name="preview-tier" defaultValue="primary" options={[{ label: 'Primary', value: 'primary' }, { label: 'Replica', value: 'replica' }]} /><Switch label="Tracing enabled" defaultChecked /><Select label="Region" defaultValue="sg"><option value="sg">Singapore</option><option value="jp">Tokyo</option></Select></Stack></TabsContent>
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
          <Surface variant={density === 'default' ? 'elevated' : 'recessed'} className="grid gap-4">
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
    </Surface>
    </TooltipProvider>
  );
}

const root = document.querySelector('#react-preview');
if (!root) throw new Error('React preview root is missing');
createRoot(root).render(<StrictMode><ReactPreview /></StrictMode>);
