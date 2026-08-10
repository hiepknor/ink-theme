# Native device accessibility matrix

This matrix records manual evidence for `@hiepknor/ink-react-native`. Device
validation was removed from the release gate by project decision on 2026-08-09,
then completed by the project maintainer on 2026-08-10. Expo export and renderer
tests are necessary but do not count as device validation. The historical waiver
below describes the state at release time and must not be interpreted as a pass.

## Required matrix

| Platform | Representative target | Font scaling | Reduced motion | Screen reader | Software/hardware keyboard | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Android | Samsung S24 Ultra — Android 16 | Pass | Pass | TalkBack pass | Pass | Pass — maintainer validated 2026-08-10 |
| iOS | iPhone 16 Plus — iOS 26.6 | Pass | Pass | VoiceOver pass | Pass | Pass — maintainer validated 2026-08-10 |

## Waiver record

| Date | Commit | Scope | Automated preflight | Decision |
| --- | --- | --- | --- | --- |
| 2026-08-09 | `869d610` | Android and iOS simulator/device accessibility | Native type, boundary, package, and contract checks passed; 10 interaction tests passed; production Expo bundles exported for Android and iOS | Manual device validation skipped by project decision |

The waiver accepted temporary residual risk for platform-specific behavior that
automated renderer tests cannot establish: large accessibility text, reduced
motion, TalkBack and VoiceOver announcement order/focus, and software or
hardware keyboard behavior. The validation record below supersedes that risk
status while preserving the release-time decision.

## Validation record

| Date | Commit | Targets | Tester | Result | Notes |
| --- | --- | --- | --- | --- | --- |
| 2026-08-10 | `98c9645` | Samsung S24 Ultra — Android 16; iPhone 16 Plus — iOS 26.6 | Project maintainer | Pass | Font scaling, reduced motion, screen-reader behavior, and software/hardware keyboard behavior concluded PASS on both platforms. |

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
