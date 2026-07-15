import { Mock, vi } from 'vitest';

export interface LocalStorageMock {
  getItem: Mock;
  setItem: Mock;
  removeItem: Mock;
  clear: Mock;
  length: number;
  key: Mock;
}

export const setupLocalStorageMock = (): LocalStorageMock => {
  const localStorageMock: LocalStorageMock = {
    getItem: vi.fn().mockReturnValue(null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
  };

  Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true,
    configurable: true,
  });

  return localStorageMock;
};
