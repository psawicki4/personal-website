import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardComponent, SpinnerOverlayComponent } from 'personal-website-components';
import { LangService } from 'utils';
import { GeminiService } from './gemini.service';

@Component({
  selector: 'psa-ai-assistant',
  imports: [CardComponent, TranslocoDirective, MatButton, SpinnerOverlayComponent],
  templateUrl: './ai-assistant.component.html',
  styleUrl: './ai-assistant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiAssistantComponent {
  videoRef = viewChild.required<ElementRef<HTMLVideoElement>>('video');
  geminiService = inject(GeminiService);
  langService = inject(LangService);

  constructor() {
    afterNextRender(() => {
      this.getCameraStream();
    });
  }

  async getCameraStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      this.videoRef().nativeElement.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  onCapture() {
    this.videoRef().nativeElement.pause();
    const canvas = document.createElement('canvas');
    canvas.width = this.videoRef().nativeElement.videoWidth;
    canvas.height = this.videoRef().nativeElement.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx?.drawImage(this.videoRef().nativeElement, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    const base64Data = dataUrl.split(',')[1];
    this.geminiService.generateContent(base64Data).then((text) => {
      this.speak(text);
      this.videoRef().nativeElement.play();
    });
  }

  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.langService.lang();
    globalThis.speechSynthesis.speak(utterance);
  }
}
