import {
  afterNextRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardComponent } from 'personal-website-components';
import { GeminiService } from './gemini.service';

@Component({
  selector: 'psa-ai-assistant',
  imports: [CardComponent, TranslocoDirective, MatButton],
  templateUrl: './ai-assistant.component.html',
  styleUrl: './ai-assistant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiAssistantComponent {
  videoRef = viewChild.required<ElementRef<HTMLVideoElement>>('video');
  geminiService = inject(GeminiService);

  constructor() {
    afterNextRender(() => {
      this.getCameraStream();
    });
  }

  async getCameraStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoRef().nativeElement.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  onCapture() {
    this.geminiService.generateContent('asdasd').then((response) => {
      console.log('Generated content:', response);
    });
  }
}
