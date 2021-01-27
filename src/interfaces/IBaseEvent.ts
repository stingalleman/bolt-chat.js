export interface IBaseEvent {
  e: {
    t: string;
    c: number; // TODO: date (epoch)
    r?: number; // TODO: date (epoch)
  };
}
