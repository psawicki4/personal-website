import { inject, Injectable, signal } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { TranslocoService } from '@jsverse/transloco';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private readonly ai = new GoogleGenAI({ apiKey: environment.geminiApiKey });
  isLoading = signal<boolean>(false);
  transloco = inject(TranslocoService);

  async generateContent(base64Image: string): Promise<string> {
    this.isLoading.set(true);
    const prompt = this.transloco.translate('AI_ASSISTANT.prompt');
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { text: prompt },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
        ],
      });
      return response.text || this.transloco.translate('AI_ASSISTANT.content-error');
    } catch (error) {
      console.error('Error generating content:', error);
      return this.transloco.translate('AI_ASSISTANT.content-error');
    } finally {
      this.isLoading.set(false);
    }
  }
}
