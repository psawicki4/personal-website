import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { createTranslocoMock, LangService } from 'utils';
import { describe, expect, it, vi, beforeEach, beforeAll } from 'vitest';
import { AiAssistantComponent } from './ai-assistant.component';
import { GeminiService } from './gemini.service';

describe('AiAssistantComponent', () => {
  let component: AiAssistantComponent;
  let fixture: ComponentFixture<AiAssistantComponent>;

  const getUserMediaMock = vi.fn().mockResolvedValue({
    getTracks: () => [{ stop: vi.fn() }],
  });

  const speakMock = vi.fn();

  beforeAll(() => {
    // Mock navigator.mediaDevices
    if (typeof navigator !== 'undefined') {
      Object.defineProperty(navigator, 'mediaDevices', {
        value: {
          getUserMedia: getUserMediaMock,
        },
        configurable: true,
        writable: true,
      });
    } else {
      vi.stubGlobal('navigator', {
        mediaDevices: {
          getUserMedia: getUserMediaMock,
        },
      });
    }

    // Mock speechSynthesis
    vi.stubGlobal('speechSynthesis', {
      speak: speakMock,
      cancel: vi.fn(),
      getVoices: vi.fn().mockReturnValue([]),
      pause: vi.fn(),
      resume: vi.fn(),
    });

    vi.stubGlobal(
      'SpeechSynthesisUtterance',
      class {
        text = '';
        lang = '';
        volume = 1;
        rate = 1;
        pitch = 1;
        constructor(text: string) {
          this.text = text;
        }
      }
    );

    // Mock Canvas
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      drawImage: vi.fn(),
    } as any);

    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/jpeg;base64,mockImage');
  });

  const translocoMock = createTranslocoMock();

  const geminiServiceMock = {
    generateContent: vi.fn().mockResolvedValue('Generated text'),
    isLoading: signal(false),
  };

  const langServiceMock = {
    lang: signal('pl'),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [AiAssistantComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: GeminiService, useValue: geminiServiceMock },
        { provide: LangService, useValue: langServiceMock },
        { provide: TranslocoService, useValue: translocoMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AiAssistantComponent);
    component = fixture.componentInstance;
  });

  it('should initialize camera on afterNextRender', async () => {
    await fixture.whenStable();
    expect(getUserMediaMock).toHaveBeenCalled();
  });

  it('should handle onCapture correctly', async () => {
    await fixture.whenStable();

    const videoElement = component.videoRef().nativeElement;
    Object.defineProperty(videoElement, 'videoWidth', { value: 640, configurable: true });
    Object.defineProperty(videoElement, 'videoHeight', { value: 480, configurable: true });

    const pauseSpy = vi.spyOn(videoElement, 'pause').mockImplementation(() => {});
    const playSpy = vi.spyOn(videoElement, 'play').mockResolvedValue(undefined);

    component.onCapture();

    expect(pauseSpy).toHaveBeenCalled();
    expect(geminiServiceMock.generateContent).toHaveBeenCalledWith('mockImage');

    await vi.waitFor(() => {
      expect(speakMock).toHaveBeenCalled();
    });

    expect(speakMock).toHaveBeenCalledWith(expect.objectContaining({ text: 'Generated text' }));
    expect(playSpy).toHaveBeenCalled();
  });

  it('should set the correct language for speech', () => {
    langServiceMock.lang.set('en');
    component.speak('Hello');
    expect(speakMock).toHaveBeenCalledWith(expect.objectContaining({ lang: 'en' }));
  });
});
