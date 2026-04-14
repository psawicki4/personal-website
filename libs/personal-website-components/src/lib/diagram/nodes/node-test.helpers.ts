import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Node, provideNgDiagram } from 'ng-diagram';

export async function setupNodeTemplateTest<T>(
  ComponentClass: Type<T>
): Promise<{ fixture: ComponentFixture<T>; component: T }> {
  await TestBed.configureTestingModule({
    imports: [ComponentClass],
    providers: [provideNgDiagram()],
  }).compileComponents();

  const fixture = TestBed.createComponent(ComponentClass);
  const component = fixture.componentInstance;

  return { fixture, component };
}

export function createMockNode(
  data: { label?: string; color?: string; note?: string } = {},
  size?: { width: number; height: number }
) {
  return {
    id: '1',
    position: { x: 0, y: 0 },
    data,
    ...(size ? { size } : {}),
  } as Node<{ label?: string; color?: string; note?: string }>;
}
