import { Injectable, signal } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai = new GoogleGenAI({ apiKey: environment.geminiApiKey });
  isLoading = signal<boolean>(false);

  async generateContent(base64Image: string) {
    this.isLoading.set(true);
    const prompt = 'Jesteś asystentem osoby niedowidzącej. Opisz zwięźle i naturalnie co znajduje się na zdjęciu.';
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
      console.log(response.text);
      return response.text;
    } catch (error) {
      console.error('Error generating content:', error);
      return 'Przepraszam, wystąpił błąd podczas generowania opisu.';
    } finally {
      this.isLoading.set(false);
    }
  }
}
