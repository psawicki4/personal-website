export type Room = {
  id: number;
  booked: boolean;
};

export type RoomsList = {
  total: number;
  data: Room[];
};
