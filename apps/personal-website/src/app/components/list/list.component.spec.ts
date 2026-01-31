import {
  CdkVirtualScrollViewport,
  ScrollingModule,
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
} from '@angular/cdk/scrolling';
import { Component, Input, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { ListComponent } from './list.component';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'cdk-virtual-scroll-viewport',
  template: '',
  providers: [{ provide: CdkVirtualScrollViewport, useExisting: MockCdkVirtualScrollViewport }],
})
class MockCdkVirtualScrollViewport {
  @Input() itemSize: number | undefined;
  elementScrolled = vi.fn().mockReturnValue(of(new Event('scroll')));
  measureScrollOffset = vi.fn().mockReturnValue(100);
}

describe('ListComponent', () => {
  let component: ListComponent<unknown>;
  let fixture: ComponentFixture<ListComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, NoopAnimationsModule, ScrollingModule],
      providers: [provideZonelessChangeDetection()],
    })
      .overrideComponent(ListComponent, {
        remove: {
          imports: [
            CdkVirtualScrollViewport,
            CdkFixedSizeVirtualScroll,
            CdkVirtualForOf,
            NgClass,
            NgTemplateOutlet,
            MatRipple,
          ],
        },
        add: { imports: [MockCdkVirtualScrollViewport] },
      })
      .overrideTemplate(ListComponent, '<cdk-virtual-scroll-viewport #viewport></cdk-virtual-scroll-viewport>')
      .compileComponents();

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
