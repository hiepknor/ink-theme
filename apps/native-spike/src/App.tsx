import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
import { Button, Checkbox, InkProvider, Surface, TextField } from '@hiepknor/ink-ui-native';

export function App() {
  const [tracing, setTracing] = useState(true);
  return <InkProvider density="touch">
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.header}><Text style={styles.eyebrow}>NATIVE ARCHITECTURE SPIKE</Text><Text style={styles.title}>Ink UI</Text><Text style={styles.summary}>Shared visual decisions, native interaction semantics.</Text></View>
        <Surface tone="recessed" style={styles.surface}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.actions}><Button variant="primary">Deploy</Button><Button>Review</Button><Button variant="quiet">Cancel</Button></View>
          <Button loading loadingLabel="Deploying service">Deploying</Button>
        </Surface>
        <Surface tone="recessed" style={styles.surface}>
          <Text style={styles.sectionTitle}>Fields</Text>
          <TextField label="Service name" defaultValue="edge-router" description="Native TextInput with shared Ink density." autoCapitalize="none" />
          <TextField label="Invalid service" defaultValue="x" error="Use at least three characters" />
          <TextField label="Read-only region" defaultValue="ap-southeast" editable={false} />
          <Checkbox checked={tracing} label="Enable tracing" onCheckedChange={setTracing} />
          <Checkbox checked={false} disabled label="Unavailable option" />
        </Surface>
      </ScrollView>
    </SafeAreaView>
  </InkProvider>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: nativeTokens.colors.background, flex: 1 },
  page: { gap: nativeTokens.spacing.lg, padding: nativeTokens.spacing.lg },
  header: { borderBottomColor: nativeTokens.colors.borderStrong, borderBottomWidth: nativeTokens.borderWidth.default, gap: nativeTokens.spacing.sm, paddingBottom: nativeTokens.spacing.lg },
  eyebrow: { color: nativeTokens.colors.foregroundSubtle, fontSize: 11, fontWeight: nativeTokens.fontWeight.bold, letterSpacing: 1.2 },
  title: { color: nativeTokens.colors.foreground, fontSize: 28, fontWeight: nativeTokens.fontWeight.bold },
  summary: { color: nativeTokens.colors.foregroundMuted, fontSize: nativeTokens.fontSize.sm },
  surface: { gap: nativeTokens.spacing.lg },
  sectionTitle: { color: nativeTokens.colors.foreground, fontSize: nativeTokens.fontSize.lg, fontWeight: nativeTokens.fontWeight.bold },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: nativeTokens.spacing.sm },
});
