import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'psa-diagram',
  imports: [],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagramComponent {}
