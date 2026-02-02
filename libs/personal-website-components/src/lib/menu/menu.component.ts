import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'lib-menu',
  imports: [MatNavList, MatListItem, RouterLink, RouterLinkActive, TranslocoDirective],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  navigate = output();

  onClick() {
    this.navigate.emit();
  }
}
