export function isNotBlank(value: string | undefined): boolean {
  return !!value && value.trim().length > 0;
}
