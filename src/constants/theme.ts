export const theme = {
  colors: {
    primary: '#2563EB',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#16A34A',
    danger: '#DC2626',
    muted: '#94A3B8',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },

  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    full: 999,
  },
  typography: {
    title: 24,
    heading: 20,
    body: 16,
    caption: 14,
    small: 12,
  },
} as const;
