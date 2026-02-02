import { ScrollingModule } from '@angular/cdk/scrolling';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent<unknown>;
  let fixture: ComponentFixture<ListComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, ScrollingModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    // Set required inputs
    fixture.componentRef.setInput('itemHeight', 50);
    fixture.detectChanges();
  });

  it('should emit selected item when selectItem is called', () => {
    const spy = vi.spyOn(component.selected, 'emit');
    const item = { id: 1, name: 'Test' };

    component.selectItem(item);

    expect(component.selectedItem).toBe(item);
    expect(spy).toHaveBeenCalledWith(item);
  });

  it('should update focusable index', () => {
    // Mock document.getElementById
    const focusSpy = vi.fn();
    vi.spyOn(document, 'getElementById').mockReturnValue({ focus: focusSpy } as unknown as HTMLElement);

    component.changeFocus(5);

    expect(component.focusableIndex).toBe(5);
    expect(focusSpy).toHaveBeenCalled();
  });
});
