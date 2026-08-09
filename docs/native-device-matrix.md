# Native device accessibility matrix

This matrix records manual evidence required before `@hiepknor/ink-react-native`
can be published. Expo export and renderer tests are necessary but do not count
as device validation.

## Required matrix

| Platform | Representative target | Font scaling | Reduced motion | Screen reader | Software/hardware keyboard | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Android | Current stable emulator and one physical phone | Pending | Pending | TalkBack pending | Pending | Not validated |
| iOS | Current stable simulator and one physical iPhone | Pending | Pending | VoiceOver pending | Pending | Not validated |

## Pass criteria

- Text at the largest supported accessibility size remains readable without
  clipping controls, errors, selected values, or progress copy.
- Reduced-motion preference removes nonessential movement while retaining
  visible state changes and progress meaning.
- TalkBack and VoiceOver announce labels, checked/disabled/expanded state,
  validation alerts, selected options, and progress values once and in order.
- Opening and closing `Select` preserves a predictable accessibility position.
- Software keyboards do not obscure the active field or recovery action;
  return/next behavior follows platform convention.
- Hardware keyboard traversal never traps focus and every action remains
  operable without touch.

## Evidence record

For every run, record date, OS/device version, Expo build commit, tester,
result, and an issue link for each failure. Do not replace a failed row with a
new result; append the retest so the remediation history remains visible.
