import '@analogjs/vitest-angular/setup-snapshots';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import '@angular/compiler';

setupTestBed();

globalThis.ResizeObserver = class ResizeObserver {
  observe() {
    // No-op for testing purposes
  }
  unobserve() {
    // No-op for testing purposes
  }
  disconnect() {
    // No-op for testing purposes
  }
};
