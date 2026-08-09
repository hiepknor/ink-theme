import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { Alert, Button, Progress, RadioGroup, Select, Surface, Switch, TextArea, TextField } from '@hiepknor/ink-ui-native';

const regions = [
  { label: 'Singapore', value: 'singapore' },
  { label: 'Tokyo', value: 'tokyo' },
  { disabled: true, label: 'Frankfurt — unavailable', value: 'frankfurt' },
];

export function DeploymentExample() {
  const [service, setService] = useState('');
  const [description, setDescription] = useState('Routes customer traffic.');
  const [region, setRegion] = useState('singapore');
  const [role, setRole] = useState('primary');
  const [tracing, setTracing] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState<number | undefined>();
  const error = submitted && service.trim().length < 3 ? 'Use at least three characters.' : undefined;
  const deploy = () => { setSubmitted(true); if (service.trim().length >= 3) setProgress(20); };
  const advance = () => setProgress((current) => current === undefined ? 20 : Math.min(100, current + 40));
  const complete = progress === 100;

  return <Surface accessibilityLabel="Deployment workflow" style={styles.card} tone="elevated">
    <View style={styles.header}><Text accessibilityRole="header" style={styles.title}>Deploy a service</Text><Text style={styles.copy}>Configure a regional service and review recoverable validation before deployment.</Text></View>
    {error ? <Alert live="assertive" title="Review service details" tone="danger">{error}</Alert> : null}
    {progress !== undefined ? <Alert live="polite" title={complete ? 'Deployment complete' : 'Deployment started'} tone="ok">{complete ? `${service} is healthy in ${region}.` : `${service} is deploying to ${region}.`}</Alert> : null}
    <TextField autoCapitalize="none" error={error} label="Service name" onChangeText={setService} placeholder="edge-router" value={service} />
    <TextArea label="Description" onChangeText={setDescription} value={description} />
    <Select label="Deployment region" onValueChange={setRegion} options={regions} value={region} />
    <RadioGroup label="Replica role" onValueChange={setRole} options={[{ label: 'Primary', value: 'primary' }, { label: 'Replica', value: 'replica' }]} value={role} />
    <Switch checked={tracing} label="Enable tracing" onCheckedChange={setTracing} />
    <Text style={styles.review}>Target: {region} · {role} · tracing {tracing ? 'on' : 'off'}</Text>
    {progress === undefined ? <Button onPress={deploy} variant="primary">Deploy service</Button> : <><Progress label="Deployment progress" value={progress} /><Button disabled={complete} onPress={advance}>{complete ? 'Deployed' : 'Advance deployment'}</Button></>}
  </Surface>;
}

const styles = StyleSheet.create({
  card: { gap: nativeTokens.spacing.lg }, header: { gap: nativeTokens.spacing.xs }, title: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.lg, fontWeight: nativeTokens.fontWeight.bold }, copy: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm, lineHeight: 21 }, review: { borderLeftColor: nativeTokens.colors.borderStrong, borderLeftWidth: nativeTokens.borderWidth.strong, color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm, paddingLeft: nativeTokens.spacing.sm },
});
