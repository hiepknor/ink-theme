import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Badge, Button, EmptyState, IconButton, Inline, Panel, Sidebar, Stack, StatusBar, StatusMark, Tabs, TabsContent, TabsList, TabsTrigger, Toolbar } from '@hiepknor/ink-ui-react';
import './app.css';

function DesktopApp() {
  return <main className="desktop-frame"><Toolbar aria-label="Application tools"><IconButton label="New service">+</IconButton><Button density="compact">Refresh</Button><span className="desktop-spacer" /><Badge>TAURI</Badge></Toolbar><div className="desktop-content"><Sidebar aria-label="Project navigation"><Stack gap="sm"><strong>INK DESKTOP</strong><Button variant="quiet">Services</Button><Button variant="quiet">Deployments</Button><Button variant="quiet">Settings</Button></Stack></Sidebar><Panel><Tabs defaultValue="services"><TabsList aria-label="Workspace views"><TabsTrigger value="services">Services</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger></TabsList><TabsContent value="services"><EmptyState title="No local services" description="This native shell consumes only @hiepknor/ink-ui-react package exports." actions={<Button variant="primary">Create service</Button>} /></TabsContent><TabsContent value="activity"><StatusMark tone="ok" label="Desktop runtime ready" /></TabsContent></Tabs></Panel></div><StatusBar><span>Ink Desktop Example</span><Inline gap="sm"><StatusMark tone="ok" label="Connected" /><span>0.1.0</span></Inline></StatusBar></main>;
}

const root = document.querySelector('#root');
if (!root) throw new Error('Tauri root is missing');
createRoot(root).render(<StrictMode><DesktopApp /></StrictMode>);
