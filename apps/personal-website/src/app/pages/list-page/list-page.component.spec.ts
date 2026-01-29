import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ListPageComponent } from './list-page.component';
import { Room } from './room.type';
import { RoomsStore } from './rooms.store';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let store: InstanceType<typeof RoomsStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListPageComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: TranslocoService,
          useValue: {
            setActiveLang: () => {
              // This is a mock method
            },
            getActiveLang: () => 'pl',
            translate: (key: string) => key,
            selectTranslate: () => of((k: string) => k),
            selectTranslateObject: () => of({}),
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    // Get the real store instance from the component's injector
    store = fixture.debugElement.injector.get(RoomsStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    expect(store.rooms().data.length).toBe(50);
  });

  it('should fetch more rooms', () => {
    component.skip = 0;
    // Initial state
    store.setRooms({ total: 10000, data: [] });

    const spy = vi.spyOn(store, 'patchRooms');

    component.fetchMoreRooms();

    expect(component.skip).toBe(50);
    expect(spy).toHaveBeenCalled();
    // Verify state changed
    expect(store.rooms().data.length).toBe(50);
  });

  it('should not fetch more rooms if all are loaded', () => {
    const total = 100;
    // Set store to full
    store.setRooms({
      total,
      data: Array.from({ length: total }, (_, i) => ({ roomNumber: i, booked: false })),
    });

    const spy = vi.spyOn(store, 'patchRooms');

    component.fetchMoreRooms();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should select a room', () => {
    const room: Room = { roomNumber: 101, booked: false };
    const spy = vi.spyOn(store, 'patchSelectedRoom');

    component.selectRoom(room);

    expect(spy).toHaveBeenCalledWith(room);
    expect(store.selectedRoom()).toEqual(room);
  });

  it('should not select a room if room is not provided', () => {
    const spy = vi.spyOn(store, 'patchSelectedRoom');
    component.selectRoom(null as unknown as Room);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should cancel selection', () => {
    const spy = vi.spyOn(store, 'patchSelectedRoom');
    component.cancel();
    expect(spy).toHaveBeenCalledWith({ roomNumber: 0, booked: false });
    expect(store.selectedRoom()).toEqual({ roomNumber: 0, booked: false });
  });

  it('should book a room', () => {
    const roomToBook: Room = { roomNumber: 1, booked: false };
    const spySetRooms = vi.spyOn(store, 'setRooms');
    const spyPatchSelected = vi.spyOn(store, 'patchSelectedRoom');

    // Setup state
    store.patchSelectedRoom(roomToBook);
    store.setRooms({ total: 9999, data: [{ ...roomToBook }] });

    component.book();

    expect(spySetRooms).toHaveBeenCalled();
    expect(store.rooms().data[0].booked).toBe(true);
    expect(spyPatchSelected).toHaveBeenCalledWith({ roomNumber: 0, booked: false });
  });

  it('should delete a reservation', () => {
    const roomToUnbook: Room = { roomNumber: 1, booked: true };
    const spySetRooms = vi.spyOn(store, 'setRooms');
    const spyPatchSelected = vi.spyOn(store, 'patchSelectedRoom');

    // Setup state
    store.patchSelectedRoom(roomToUnbook);
    store.setRooms({ total: 9999, data: [{ ...roomToUnbook }] });

    component.deleteReservation(roomToUnbook);

    expect(spySetRooms).toHaveBeenCalled();
    expect(store.rooms().data[0].booked).toBe(false);
    expect(spyPatchSelected).toHaveBeenCalledWith({ roomNumber: 0, booked: false });
  });
});
