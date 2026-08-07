import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Button,
  Checkbox,
  InkProvider,
  Surface,
  TextField,
  type InkDensity,
} from '@hiepknor/ink-ui-react';

const densities: InkDensity[] = ['compact', 'default', 'touch'];

function ReactPreview() {
  const [service, setService] = useState('edge-router');
  const [tracing, setTracing] = useState(true);

  return (
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
    </Surface>
  );
}

const root = document.querySelector('#react-preview');
if (!root) throw new Error('React preview root is missing');
createRoot(root).render(<StrictMode><ReactPreview /></StrictMode>);
