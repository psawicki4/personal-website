import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { createTranslocoMock } from 'utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ListPageComponent } from './list-page.component';
import { Room } from './room.type';
import { RoomsStore } from './rooms.store';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let store: InstanceType<typeof RoomsStore>;

  const translocoMock = createTranslocoMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListPageComponent],
      providers: [provideZonelessChangeDetection(), { provide: TranslocoService, useValue: translocoMock }],
    });

    const fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    // Get the real store instance from the component's injector
    store = fixture.debugElement.injector.get(RoomsStore);
  });

  it('should get first rooms on init', () => {
    const getFirstRoomsSpy = vi.spyOn(component, 'getFirstRooms');
    component.ngOnInit();
    expect(getFirstRoomsSpy).toHaveBeenCalled();
  });

  it('should set first rooms in store', () => {
    const spy = vi.spyOn(store, 'setRooms');
    component.getFirstRooms();
    expect(spy).toHaveBeenCalledWith({ total: 9999, data: component.allRooms.slice(0, 50) });
    expect(store.entities().length).toBe(50);
  });

  it('should fetch more rooms', () => {
    component.skip = 0;
    // Initial state
    store.setRooms({ total: 10000, data: [] });

    const spy = vi.spyOn(store, 'addRooms');

    component.fetchMoreRooms();

    expect(component.skip).toBe(50);
    expect(spy).toHaveBeenCalled();
    // Verify state changed
    expect(store.entities().length).toBe(50);
  });

  it('should not fetch more rooms if all are loaded', () => {
    const total = 100;
    // Set store to full
    store.setRooms({
      total,
      data: Array.from({ length: total }, (_, i) => ({ id: i + 1, booked: false })),
    });

    const spy = vi.spyOn(store, 'addRooms');

    component.fetchMoreRooms();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should select a room', () => {
    const room: Room = { id: 101, booked: false };
    const spy = vi.spyOn(store, 'patchSelectedRoom');

    component.selectRoom(room);

    expect(spy).toHaveBeenCalledWith(room.id);
    expect(store.selectedRoomId()).toEqual(room.id);
  });

  it('should cancel selection', () => {
    const spy = vi.spyOn(store, 'patchSelectedRoom');
    component.cancel();
    expect(spy).toHaveBeenCalledWith(null);
    expect(store.selectedRoomId()).toBeNull();
  });

  it('should book a room', () => {
    const roomToBook: Room = { id: 1, booked: false };
    const spyPatchRoom = vi.spyOn(store, 'patchRoom');
    const spyPatchSelected = vi.spyOn(store, 'patchSelectedRoom');

    // Setup state
    store.setRooms({ total: 9999, data: [{ ...roomToBook }] });
    store.patchSelectedRoom(roomToBook.id);

    component.book();

    expect(spyPatchRoom).toHaveBeenCalledWith(roomToBook.id, true);
    expect(store.entities()[0].booked).toBe(true);
    expect(spyPatchSelected).toHaveBeenCalledWith(null);
  });

  it('should delete a reservation', () => {
    const roomToUnbook: Room = { id: 1, booked: true };
    const spyPatchRoom = vi.spyOn(store, 'patchRoom');
    const spyPatchSelected = vi.spyOn(store, 'patchSelectedRoom');

    // Setup state
    store.setRooms({ total: 9999, data: [{ ...roomToUnbook }] });
    store.patchSelectedRoom(roomToUnbook.id);

    component.deleteReservation(roomToUnbook);

    expect(spyPatchRoom).toHaveBeenCalledWith(roomToUnbook.id, false);
    expect(store.entities()[0].booked).toBe(false);
    expect(spyPatchSelected).toHaveBeenCalledWith(null);
  });
});
