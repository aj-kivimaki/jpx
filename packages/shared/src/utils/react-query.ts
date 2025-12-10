// Helper for safe key formatting
export const formatKey = (key: unknown): unknown => {
  try {
    if (Array.isArray(key)) return key;
    if (typeof key === 'string') return key;
    return JSON.stringify(key);
  } catch {
    return key;
  }
};

export interface MutationWithKey {
  options?: {
    mutationKey?: unknown;
  };
}
