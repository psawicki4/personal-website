import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslocoDirective } from '@jsverse/transloco';
import { CardComponent, ListComponent } from 'personal-website-components';
import { ListItemTemplateDirective } from 'utils';
import { Room } from './room.type';
import { RoomsStore } from './rooms.store';

@Component({
  selector: 'psa-list-page',
  imports: [
    CardComponent,
    ListComponent,
    ListItemTemplateDirective,
    TranslocoDirective,
    NgClass,
    MatButton,
    MatIconButton,
    MatIcon,
  ],
  providers: [RoomsStore],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent implements OnInit {
  store = inject(RoomsStore);
  skip = 0;
  allRooms = Array.from(
    { length: 10000 },
    (_, index): Room => ({
      id: index + 1,
      booked: false,
    })
  ).filter((i) => i.id !== 404);

  ngOnInit(): void {
    this.getFirstRooms();
  }

  getFirstRooms() {
    this.skip = 0;
    const firstRooms = this.allRooms.slice(this.skip, this.skip + 50);
    this.store.setRooms({ total: 9999, data: firstRooms });
  }

  fetchMoreRooms() {
    if (this.store.entities().length === this.store.total()) {
      return;
    }
    this.skip += 50;
    const nextRooms = this.allRooms.slice(this.skip, this.skip + 50);
    this.store.addRooms(nextRooms);
  }

  selectRoom(selectedRoom: Room) {
    this.store.patchSelectedRoom(selectedRoom.id);
  }

  cancel() {
    this.store.patchSelectedRoom(null);
  }

  book() {
    const index = this.store.selectedRoomId();
    if (index) {
      this.store.patchRoom(index, true);
    }
    this.cancel();
  }

  deleteReservation(room: Room) {
    this.store.patchRoom(room.id, false);
    this.cancel();
  }
}
