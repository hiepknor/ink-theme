import { useState, type ReactNode } from 'react';

const surfaces = [
  ['Background', 'bg', 'bg-bg'],
  ['Surface', 'surface', 'bg-surface'],
  ['Elevated', 'elevated', 'bg-elevated'],
  ['Recessed', 'recessed', 'bg-recessed'],
  ['Line', 'line', 'bg-line'],
  ['Strong line', 'line-strong', 'bg-line-strong'],
] as const;

const marks = [
  ['Solid', 'ink-tone-solid'],
  ['Split', 'ink-tone-split'],
  ['Dots', 'ink-tone-dots'],
  ['Hatch', 'ink-tone-hatch'],
  ['Cancelled', 'ink-tone-cancelled'],
  ['Outline', 'ink-tone-outline'],
] as const;

const rows = [
  ['edge-router', 'Healthy', 'ink-tone-solid', '12,840', '1m ago'],
  ['event-worker', 'Starting', 'ink-tone-dots', '842', '3m ago'],
  ['archive-store', 'Degraded', 'ink-tone-hatch', '97', '8m ago'],
] as const;

function GallerySection({ id, title, children, ...props }: { id: string; title: string; children: ReactNode; 'data-testid'?: string }) {
  return <section className="grid gap-3" aria-labelledby={`${id}-title`} {...props}>
    <h2 id={`${id}-title`} className="gallery-label">{title}</h2>
    {children}
  </section>;
}

function NativeCompatibility() {
  return <GallerySection id="controls" title="Native HTML compatibility" data-testid="native-compatibility">
    <p className="mb-3 text-xs text-fg-3">Raw browser controls verify the CSS theme fallback. Ink React components—including the custom Select—are reviewed in the next section.</p>
    <div className="gallery-section grid gap-px bg-line md:grid-cols-2">
      <form className="grid gap-4 bg-surface p-4" aria-label="Control examples">
        <label className="grid gap-1.5 text-xs font-semibold">Service name<input className="gallery-control" name="service" defaultValue="edge-router" /></label>
        <label className="grid gap-1.5 text-xs font-semibold">Native browser select<select className="gallery-control" name="environment" defaultValue="Production"><option>Production</option><option>Staging</option><option disabled>Unavailable region</option></select></label>
        <label className="grid gap-1.5 text-xs font-semibold"><span>Deployment tag <span className="font-normal text-fg-3">(required)</span></span><input className="gallery-control" name="tag" placeholder="release-2026-08" required /></label>
        <label className="grid gap-1.5 text-xs font-semibold">Description<textarea className="gallery-control min-h-20 resize-y" name="description" readOnly defaultValue="Routes public traffic." /></label>
        <div className="flex flex-wrap gap-4 text-xs">
          <label className="gallery-native-choice"><input type="checkbox" name="tracing" className="size-4 accent-accent" defaultChecked /> Tracing</label>
          <label className="gallery-native-choice"><input type="radio" name="tier" className="size-4 accent-accent" defaultChecked /> Primary</label>
          <label className="gallery-native-choice"><input type="radio" name="tier" className="size-4 accent-accent" /> Replica</label>
          <label className="gallery-native-choice text-fg-3"><input type="checkbox" name="unavailable-option" className="size-4 accent-accent" disabled /> Unavailable</label>
        </div>
      </form>
      <div className="grid content-start gap-4 bg-surface p-4">
        <div><p className="text-xs font-semibold">Button states</p><p className="mt-1 text-xs text-fg-3">Use Tab to review keyboard focus.</p></div>
        <div className="flex flex-wrap gap-3"><button type="button" className="ink-lift min-h-9 border border-line-strong bg-fg px-3 text-xs font-semibold text-bg">Primary</button><button type="button" className="min-h-9 border border-line-strong bg-surface px-3 text-xs font-semibold">Secondary</button><button type="button" className="min-h-9 border border-line bg-recessed px-3 text-xs text-fg-3" disabled>Disabled</button></div>
        <label className="grid gap-1.5 text-xs font-semibold">Invalid service<input className="gallery-control" name="invalid-service" defaultValue="duplicate" aria-invalid="true" aria-describedby="native-service-error" /><span id="native-service-error" className="border-l-2 border-line-strong pl-2 font-medium">Service already exists</span></label>
        <label className="grid gap-1.5 text-xs font-semibold">Disabled field<input className="gallery-control" name="disabled-service" defaultValue="Unavailable" disabled /></label>
        <a className="w-fit text-xs font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" href="#composition-title">Text link with focus state</a>
      </div>
    </div>
  </GallerySection>;
}

export function LegacyGallery({ componentPreview }: { componentPreview: ReactNode }) {
  const [strict, setStrict] = useState(true);
  return <main id="theme-preview" className={`${strict ? 'ink-strict ' : ''}mx-auto grid max-w-[1080px] gap-6 px-4 py-8 sm:px-8`}>
    <header className="grid gap-3 border-b border-line-strong pb-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"><div className="grid gap-2"><p className="gallery-label">Visual foundation</p><h1 className="text-2xl font-semibold tracking-tight">Ink Tailwind</h1><p className="max-w-[64ch] text-sm text-fg-2">Square geometry, monochrome surfaces, dense typography, semantic screentone, and hard lift.</p></div><code className="font-mono text-xs text-fg-3">@hiepknor/ink-tailwind · 1.0.0</code></header>

    <section className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border border-line-strong bg-surface p-3" aria-label="Preview controls"><div><p className="text-sm font-semibold">Scoped strict preview</p><p id="strict-status" className="text-xs text-fg-3" aria-live="polite">{strict ? 'Square geometry enabled' : 'Application geometry visible'}</p></div><label className="flex min-h-9 cursor-pointer items-center gap-2 border border-line px-3 text-xs font-semibold"><input id="strict-toggle" type="checkbox" className="size-4 accent-accent" checked={strict} onChange={(event) => setStrict(event.currentTarget.checked)} />Apply <code className="font-mono">.ink-strict</code></label></section>

    <GallerySection id="surfaces" title="Surfaces"><div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">{surfaces.map(([label, token, color]) => <div className="bg-surface p-3" key={token}><div className={`h-12 border border-line ${color}`} /><p className="mt-2 text-xs">{label}</p><code className="font-mono text-[11px] text-fg-3">{token}</code></div>)}</div></GallerySection>
    <GallerySection id="type" title="Typography"><div className="gallery-section grid gap-3 p-4"><p className="text-2xl font-semibold tracking-tight">Page title — 24 / 600</p><p className="text-sm font-semibold">Section heading — 14 / 600</p><p className="text-sm text-fg-2">Body copy carries explanation without competing with primary ink.</p><p className="font-mono text-xs text-fg-3">req_01INK_THEME · 2026-08-07T10:24:00Z</p><p className="gallery-label">Uppercase label — 11 / 500</p></div></GallerySection>
    <GallerySection id="marks" title="Screentone marks"><div className="gallery-section grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-6">{marks.map(([label, tone]) => <div className="flex items-center gap-3 bg-surface p-3" key={tone}><span className={`${tone} size-3 border border-line-strong`} aria-hidden="true" /><span className="text-xs">{label}</span></div>)}</div></GallerySection>
    <GallerySection id="lift" title="Hard lift"><div className="gallery-section flex flex-wrap gap-5 p-4"><button className="ink-lift min-h-9 border border-line-strong bg-surface px-3 text-[13px] font-semibold">Standard lift</button><button className="ink-lift-strong min-h-9 border border-line-strong bg-fg px-3 text-[13px] font-semibold text-bg">Strong lift</button><button className="ink-pressable min-h-9 border border-line-strong bg-surface px-3 text-[13px] font-semibold">Pressable</button><span className="ink-inset inline-flex min-h-9 items-center border border-line bg-recessed px-3 text-[13px]">Inset surface</span></div></GallerySection>
    <NativeCompatibility />
    <GallerySection id="react-ui" title="React UI vertical slice"><div id="react-preview">{componentPreview}</div></GallerySection>
    <GallerySection id="scope" title="Strict scope check"><div className="gallery-section grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"><div><p className="text-sm font-semibold">Third-party radius simulation</p><p className="mt-1 max-w-[64ch] text-xs text-fg-3">Toggle strict mode above. This sample declares its own rounded geometry, so the scoped lock should square it without affecting anything outside this preview root.</p></div><div className="gallery-radius-sample flex size-24 items-center justify-center border border-line-strong bg-elevated text-center text-[11px] font-semibold">Radius<br />9999px</div></div></GallerySection>
    <GallerySection id="composition" title="Composition"><div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]"><div className="gallery-section min-w-0 overflow-x-auto"><header className="flex min-h-14 items-center justify-between gap-4 border-b border-line px-4"><div><h3 className="text-sm font-semibold">Service registry</h3><p className="text-xs text-fg-3">Three current records</p></div><button className="ink-lift min-h-9 border border-line-strong bg-fg px-3 text-[13px] font-semibold text-bg transition-transform hover:-translate-x-px hover:-translate-y-px motion-reduce:transition-none">Create service</button></header><table className="w-full min-w-[560px] border-collapse text-[13px]"><thead><tr className="border-b border-line bg-recessed text-left"><th className="gallery-label h-10 px-3">Service</th><th className="gallery-label h-10 px-3">State</th><th className="gallery-label h-10 px-3 text-right">Requests</th><th className="gallery-label h-10 px-3">Observed</th></tr></thead><tbody>{rows.map(([service, state, tone, requests, observed], index) => <tr className={index < rows.length - 1 ? 'border-b border-line hover:bg-elevated' : 'hover:bg-elevated'} key={service}><td className="h-11 px-3 font-mono">{service}</td><td className="h-11 px-3"><span className="inline-flex items-center gap-2"><span className={`${tone} size-2.5 border border-line-strong`} />{state}</span></td><td className="h-11 px-3 text-right font-mono tabular">{requests}</td><td className="h-11 px-3 text-fg-2">{observed}</td></tr>)}</tbody></table></div><aside className="gallery-section"><header className="border-b border-line p-4"><p className="gallery-label">Inspector</p><h3 className="mt-1 font-mono text-sm font-semibold">edge-router</h3></header><dl className="grid grid-cols-[120px_minmax(0,1fr)] text-xs"><dt className="border-b border-line bg-recessed p-3 text-fg-3">Environment</dt><dd className="border-b border-line p-3">Production</dd><dt className="border-b border-line bg-recessed p-3 text-fg-3">Version</dt><dd className="border-b border-line p-3 font-mono">1.8.0</dd><dt className="bg-recessed p-3 text-fg-3">Region</dt><dd className="p-3 font-mono">ap-southeast</dd></dl></aside></div></GallerySection>
  </main>;
}
