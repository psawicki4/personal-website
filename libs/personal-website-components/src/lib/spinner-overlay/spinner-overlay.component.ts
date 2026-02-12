import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'lib-spinner-overlay',
  imports: [MatProgressSpinner],
  templateUrl: './spinner-overlay.component.html',
  styleUrl: './spinner-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerOverlayComponent {
  show = input(false);
}
