import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[libReverseMail]',
  standalone: true,
})
export class ReverseMailDirective {
  el = inject(ElementRef);

  @HostListener('copy', ['$event'])
  copyMail(e: ClipboardEvent) {
    e.preventDefault();
    const reversedText = this.revertText(this.el.nativeElement.innerText);
    navigator.clipboard.writeText(reversedText);
  }

  @HostListener('click')
  navigate() {
    const reversedText = this.revertText(this.el.nativeElement.innerText);
    globalThis.location.href = 'mailto:' + reversedText;
  }

  private revertText(text: string) {
    return text.split('').reverse().join('');
  }
}
