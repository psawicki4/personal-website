import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';
import { CardComponent } from './card.component';

@Component({
  template: `
    <psa-card>
      <div data-testid="test-content">Test Content</div>
    </psa-card>
  `,
  imports: [CardComponent],
})
class TestHostComponent {}

describe('CardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  it('should project content', () => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const content = fixture.debugElement.query(By.css('[data-testid="test-content"]'));
    expect(content).toBeTruthy();
    expect(content.nativeElement.textContent).toBe('Test Content');
  });
});
