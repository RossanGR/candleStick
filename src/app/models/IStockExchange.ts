import { UTCTimestamp } from "lightweight-charts";

export interface IStockExchange {
  time: any, // A biblioteca recebe um tipo "Time" que pode ser uma string ou timestamp
  open: number,
  high: number,
  low: number,
  close: number,
}
