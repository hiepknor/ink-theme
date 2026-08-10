import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { Alert, Button, Checkbox, IconButton, InkProvider, Progress, RadioGroup, Select, Spinner, Surface, Switch, TextArea, TextField, inkDensities, type InkDensity } from '@hiepknor/ink-react-native';
import { DeploymentExample } from './DeploymentExample';

export function App() {
  const [density, setDensity] = useState<InkDensity>('touch');
  const [tracing, setTracing] = useState(true);
  const [region, setRegion] = useState('singapore');
  const [replica, setReplica] = useState('primary');
  const [deploymentProgress, setDeploymentProgress] = useState(42);

  return <SafeAreaProvider initialMetrics={initialWindowMetrics}><InkProvider density={density}>
    <SafeAreaView edges={['top', 'right', 'bottom', 'left']} style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView automaticallyAdjustKeyboardInsets contentContainerStyle={styles.page} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.eyebrow}>INK NATIVE WORKBENCH · 1.0.1</Text>
          <Text style={styles.title}>Component catalog</Text>
          <Text style={styles.summary}>Public React Native contracts rendered with platform-owned interaction and accessibility.</Text>
        </View>

        <DeploymentExample />

        <Surface accessibilityLabel="Workbench controls" style={styles.surface}>
          <SpecimenHeader title="Density" detail={`${density} · ${nativeTokens.controlHeight[density]}px`} />
          <View accessibilityRole="radiogroup" style={styles.actions}>
            {inkDensities.map((option) => <Button
              accessibilityState={{ selected: density === option }}
              key={option}
              onPress={() => setDensity(option)}
              variant={density === option ? 'primary' : 'secondary'}
            >{capitalize(option)}</Button>)}
          </View>
        </Surface>

        <Surface tone="recessed" style={styles.surface}>
          <SpecimenHeader title="Button" detail="Variants and states" />
          <View style={styles.actions}>
            <Button variant="primary">Deploy</Button>
            <Button>Review</Button>
            <Button variant="quiet">Cancel</Button>
            <Button disabled>Disabled</Button>
          </View>
          <Button loading loadingLabel="Deploying service">Deploying</Button>
        </Surface>

        <Surface tone="recessed" style={styles.surface}>
          <SpecimenHeader title="TextField" detail="Normal, invalid and read-only" />
          <TextField label="Service name" defaultValue="edge-router" description="Native TextInput with inherited Ink density." autoCapitalize="none" />
          <TextField label="Invalid service" defaultValue="x" error="Use at least three characters" />
          <TextField label="Read-only region" defaultValue="ap-southeast" editable={false} />
        </Surface>

        <Surface tone="recessed" style={styles.surface}>
          <SpecimenHeader title="Checkbox" detail="Controlled and disabled" />
          <Checkbox checked={tracing} label="Enable tracing" onCheckedChange={setTracing} />
          <Text accessibilityLiveRegion="polite" style={styles.stateCopy}>Tracing is {tracing ? 'enabled' : 'disabled'}.</Text>
          <Checkbox checked={false} disabled label="Unavailable option" />
        </Surface>

        <Surface tone="recessed" style={styles.surface}>
          <SpecimenHeader title="Extended forms" detail="Native interaction contracts" />
          <View style={styles.actions}><IconButton label="Add service">＋</IconButton><IconButton label="Refresh services" variant="quiet">↻</IconButton></View>
          <TextArea label="Description" defaultValue="Routes regional traffic." description="Native multiline input." />
          <RadioGroup label="Replica role" options={[{ label: 'Primary', value: 'primary' }, { label: 'Replica', value: 'replica' }]} value={replica} onValueChange={setReplica} />
          <Switch checked={tracing} label="Continuous tracing" onCheckedChange={setTracing} />
          <Select label="Catalog deployment region" description="Single-value native modal sheet." options={regions} value={region} onValueChange={setRegion} />
          <Text accessibilityLiveRegion="polite" style={styles.stateCopy}>Deploying to {region} as {replica}.</Text>
        </Surface>

        <Surface tone="recessed" style={styles.surface}>
          <SpecimenHeader title="Feedback" detail="Live regions and progress" />
          <Alert title="Deployment queued">The service will deploy after validation.</Alert>
          <Alert live="polite" title="Configuration saved" tone="ok">All settings are synchronized.</Alert>
          <Alert live="assertive" title="Deployment blocked" tone="danger">Resolve the failed health check before retrying.</Alert>
          <Spinner label="Validating deployment" />
          <Progress label="Deployment" value={deploymentProgress} />
          <Progress label="Preparing artifacts" />
          <Button onPress={() => setDeploymentProgress((current) => Math.min(100, current + 25))}>Advance deployment</Button>
        </Surface>

        <Surface padding={false} tone="elevated">
          <View style={styles.toneRow}><Text style={styles.toneTitle}>Surface</Text><Text style={styles.stateCopy}>default · elevated · recessed</Text></View>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  </InkProvider></SafeAreaProvider>;
}

const regions = [
  { label: 'Singapore', value: 'singapore' },
  { label: 'Tokyo', value: 'tokyo' },
  { disabled: true, label: 'Frankfurt — unavailable', value: 'frankfurt' },
];

const initialWindowMetrics = {
  frame: { height: 0, width: 0, x: 0, y: 0 },
  insets: { bottom: 0, left: 0, right: 0, top: 0 },
};

function SpecimenHeader({ detail, title }: { detail: string; title: string }) {
  return <View style={styles.specimenHeader}><Text accessibilityRole="header" style={styles.sectionTitle}>{title}</Text><Text style={styles.detail}>{detail}</Text></View>;
}

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: nativeTokens.colors.background, flex: 1 },
  page: { gap: nativeTokens.spacing.lg, padding: nativeTokens.spacing.lg, paddingBottom: nativeTokens.spacing['2xl'] },
  header: { borderBottomColor: nativeTokens.colors.borderStrong, borderBottomWidth: nativeTokens.borderWidth.strong, gap: nativeTokens.spacing.sm, paddingBottom: nativeTokens.spacing.lg },
  eyebrow: { color: nativeTokens.colors.foregroundSubtle, fontSize: 11, fontWeight: nativeTokens.fontWeight.bold, letterSpacing: 1.2 },
  title: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.lg, fontWeight: nativeTokens.fontWeight.bold },
  summary: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm, lineHeight: 21 },
  surface: { gap: nativeTokens.spacing.lg },
  specimenHeader: { alignItems: 'baseline', borderBottomColor: nativeTokens.colors.border, borderBottomWidth: nativeTokens.borderWidth.default, flexDirection: 'row', flexWrap: 'wrap', gap: nativeTokens.spacing.xs, justifyContent: 'space-between', paddingBottom: nativeTokens.spacing.sm },
  sectionTitle: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.lg, fontWeight: nativeTokens.fontWeight.bold },
  detail: { color: nativeTokens.colors.foregroundSubtle, fontSize: nativeTokens.fontSize.sm },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: nativeTokens.spacing.sm },
  stateCopy: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm },
  toneRow: { gap: nativeTokens.spacing.xs, padding: nativeTokens.spacing.lg },
  toneTitle: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.md, fontWeight: nativeTokens.fontWeight.bold },
});
