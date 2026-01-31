import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { addEntities, setEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { Room, RoomsList } from './room.type';

const initialState = {
  total: 0,
  selectedRoomId: null as number | null,
};

export const RoomsStore = signalStore(
  withEntities<Room>(),
  withState(initialState),
  withComputed((store) => ({
    bookedRooms: computed(() => store.entities().filter((i) => i.booked)),
    selectedRoom: computed(() => {
      const id = store.selectedRoomId();
      return id ? store.entityMap()[id] : null;
    }),
  })),
  withMethods((store) => ({
    setRooms(rooms: RoomsList) {
      patchState(store, setEntities(rooms.data));
      patchState(store, { total: rooms.total });
    },
    addRooms(nextRooms: Room[]) {
      patchState(store, addEntities(nextRooms));
    },
    patchSelectedRoom(selectedRoomId: number | null) {
      patchState(store, { selectedRoomId });
    },
    patchRoom(roomId: number, booked: boolean) {
      patchState(
        store,
        updateEntity({
          id: roomId,
          changes: () => ({ booked }),
        })
      );
    },
  }))
);
