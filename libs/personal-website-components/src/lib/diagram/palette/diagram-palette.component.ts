import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgDiagramPaletteItemComponent, NgDiagramPaletteItemPreviewComponent } from 'ng-diagram';

@Component({
  selector: 'lib-diagram-palette',
  standalone: true,
  imports: [NgDiagramPaletteItemComponent, NgDiagramPaletteItemPreviewComponent],
  templateUrl: './diagram-palette.component.html',
  styleUrl: './diagram-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagramPaletteComponent {}
