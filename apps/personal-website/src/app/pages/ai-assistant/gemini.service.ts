import { inject, Injectable, signal } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { TranslocoService } from '@jsverse/transloco';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: environment.geminiApiKey });
  isLoading = signal<boolean>(false);
  transloco = inject(TranslocoService);

  async generateContent(base64Image: string) {
    this.isLoading.set(true);
    const prompt = this.transloco.translate('AI_ASSISTANT.prompt');
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
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
      const ttsResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-tts',
        contents: [{ parts: [{ text: response.text }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const data = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      return data;
    } catch (error) {
      console.error('Error generating content:', error);
      return 'Przepraszam, wystąpił błąd podczas generowania opisu.';
    } finally {
      this.isLoading.set(false);
    }
  }
}
