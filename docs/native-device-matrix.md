# Native device accessibility matrix

This matrix records manual evidence for `@hiepknor/ink-react-native`. Device
validation was removed from the release gate by project decision on 2026-08-09.
Expo export and renderer tests are necessary but do not count as device
validation, and the waived rows below must not be interpreted as passes.

## Required matrix

| Platform | Representative target | Font scaling | Reduced motion | Screen reader | Software/hardware keyboard | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Android | Current stable emulator and one physical phone | Waived | Waived | TalkBack waived | Waived | Waived — not validated |
| iOS | Current stable simulator and one physical iPhone | Waived | Waived | VoiceOver waived | Waived | Waived — not validated |

## Waiver record

| Date | Commit | Scope | Automated preflight | Decision |
| --- | --- | --- | --- | --- |
| 2026-08-09 | `869d610` | Android and iOS simulator/device accessibility | Native type, boundary, package, and contract checks passed; 10 interaction tests passed; production Expo bundles exported for Android and iOS | Manual device validation skipped by project decision |

Residual risk remains for platform-specific behavior that automated renderer
tests cannot establish: large accessibility text, reduced motion, TalkBack and
VoiceOver announcement order/focus, and software or hardware keyboard behavior.

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
