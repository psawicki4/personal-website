import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { GridApi, GridReadyEvent, StateUpdatedEvent } from 'ag-grid-community';
import { of } from 'rxjs';
import { Mock, describe, expect, it, vi } from 'vitest';
import { LangService } from '../../services/lang.service';
import { GridComponent } from './grid.component';
import { GridService } from './grid.service';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let gridServiceSpy: { getCountries: Mock };

  const translocoMock = {
    translate: (key: string) => key,
    selectTranslate: () => of((k: string) => k),
    getActiveLang: () => 'pl',
    setActiveLang: vi.fn(),
    config: { defaultLang: 'pl', reRenderOnLangChange: true },
    langChanges$: of('pl'),
    _loadDependencies: () => of(null),
  };

  beforeEach(() => {
    Object.defineProperty(globalThis, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    gridServiceSpy = {
      getCountries: vi.fn().mockReturnValue(of([])),
    };

    TestBed.configureTestingModule({
      imports: [GridComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: GridService, useValue: gridServiceSpy },
        { provide: TranslocoService, useValue: translocoMock },
        LangService,
      ],
    });

    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch countries on init', () => {
    expect(gridServiceSpy.getCountries).toHaveBeenCalled();
  });

  it('should set API on grid ready', () => {
    const apiMock = { exportDataAsCsv: vi.fn() } as unknown as GridApi;
    const event = { api: apiMock } as GridReadyEvent;

    component.onGridReady(event);

    expect(component.gridApi).toBe(apiMock);
  });

  it('should export data', () => {
    const apiMock = { exportDataAsCsv: vi.fn() } as unknown as GridApi;
    component.gridApi = apiMock;

    component.export();

    expect(apiMock.exportDataAsCsv).toHaveBeenCalled();
  });

  it('should update state in local storage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const state = { some: 'state' };

    component.updateState({ state } as unknown as StateUpdatedEvent);

    expect(setItemSpy).toHaveBeenCalledWith('gridState', JSON.stringify(state));
  });

  it('should reset state', () => {
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

    component.resetState();

    expect(removeItemSpy).toHaveBeenCalledWith('gridState');
    expect(component.initialState).toEqual({});
  });
});
