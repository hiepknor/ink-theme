// Generated. Do not edit.
export const tokens = {
  "color": {
    "primitive": {
      "white": "#ffffff",
      "gray50": "#f6f6f6",
      "gray100": "#f2f2f2",
      "gray200": "#e2e2e2",
      "gray600": "#6b6b6b",
      "gray700": "#565656",
      "black": "#111111"
    },
    "semantic": {
      "background": "#ffffff",
      "surface": "#ffffff",
      "elevated": "#f2f2f2",
      "recessed": "#f6f6f6",
      "border": "#e2e2e2",
      "borderStrong": "#111111",
      "foreground": "#111111",
      "foregroundMuted": "#565656",
      "foregroundSubtle": "#6b6b6b",
      "action": "#111111",
      "actionInk": "#ffffff",
      "focus": "#111111",
      "selection": "#111111",
      "selectionInk": "#ffffff",
      "statusOk": "#111111",
      "statusWarning": "#111111",
      "statusDanger": "#111111"
    }
  },
  "dimension": {
    "borderWidth": {
      "default": "1px",
      "strong": "2px"
    },
    "spacing": {
      "none": "0px",
      "xs": "4px",
      "sm": "8px",
      "md": "12px",
      "lg": "16px",
      "xl": "24px",
      "2xl": "32px"
    },
    "controlHeight": {
      "compact": "32px",
      "default": "40px",
      "touch": "48px"
    },
    "radius": {
      "none": "0px"
    }
  },
  "typography": {
    "fontFamily": {
      "sans": "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      "mono": "'Geist Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
    },
    "fontSize": {
      "sm": "14px",
      "md": "16px",
      "lg": "20px"
    },
    "fontWeight": {
      "regular": 400,
      "medium": 500,
      "bold": 700
    },
    "lineHeight": {
      "tight": 1.2,
      "normal": 1.5
    }
  },
  "motion": {
    "duration": {
      "instant": "0ms",
      "fast": "100ms",
      "normal": "160ms"
    },
    "easing": {
      "standard": "linear"
    }
  },
  "shadow": {
    "lift": "2px 2px 0 #111111",
    "liftStrong": "3px 3px 0 #111111",
    "inset": "inset 2px 2px 0 #e2e2e2"
  },
  "density": {
    "compact": {
      "controlHeight": "32px"
    },
    "default": {
      "controlHeight": "40px"
    },
    "touch": {
      "controlHeight": "48px"
    }
  }
} as const;
export type InkTokens = typeof tokens;
