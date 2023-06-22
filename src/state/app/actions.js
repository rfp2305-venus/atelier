export const HANDLE_SET_THEME = 'HANDLE_SET_THEME';
export const HANDLE_SET_LOADING = 'HANDLE_SET_LOADING';

export function handleSetLoading(loading) {
  return {
    type: HANDLE_SET_LOADING,
    loading
  }
}

export function handleSetTheme(theme) {
  return {
    type: HANDLE_SET_THEME,
    theme
  }
}
