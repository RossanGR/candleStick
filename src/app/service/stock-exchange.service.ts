import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { IStockExchange } from '../models/IStockExchange';

@Injectable({
  providedIn: 'root'
})
export class StockExchangeService {
  apiData: IStockExchange[] = [
    { time: 1694678400, open: 75.16, high: 82.84, low: 36.16, close: 45.72 },  // 2023-09-14 09:00:00
    { time: 1694678580, open: 46.13, high: 54.21, low: 45.05, close: 48.37 },  // 2023-09-14 09:03:00
    { time: 1694679145, open: 60.55, high: 61.13, low: 53.61, close: 59.12 },  // 2023-09-14 09:12:25
    { time: 1694679400, open: 68.47, high: 68.93, low: 59.74, close: 60.88 },  // 2023-09-14 09:16:40
    { time: 1694680000, open: 67.94, high: 106.22, low: 66.84, close: 91.57 },  // 2023-09-14 09:26:40
    { time: 1694683000, open: 91.63, high: 121.77, low: 82.95, close: 111.84 },  // 2023-09-14 10:10:00
    { time: 1694685000, open: 111.92, high: 143.21, low: 103.71, close: 131.49 },  // 2023-09-14 10:50:00
    { time: 1694688000, open: 131.72, high: 151.94, low: 77.82, close: 96.68 },  // 2023-09-14 11:40:00
    { time: 1694688500, open: 106.77, high: 110.48, low: 90.51, close: 98.34 },  // 2023-09-14 11:48:20
    { time: 1694690000, open: 109.99, high: 114.87, low: 85.89, close: 111.43 },  // 2023-09-14 12:06:40
    { time: 1694692800, open: 113.17, high: 118.45, low: 88.39, close: 114.62 },  // 2023-09-14 12:40:00
    { time: 1694694450, open: 114.49, high: 119.92, low: 89.27, close: 115.78 },  // 2023-09-14 13:07:30
    { time: 1694695000, open: 115.65, high: 120.67, low: 90.18, close: 116.82 },  // 2023-09-14 13:16:40
    { time: 1694698900, open: 116.74, high: 121.89, low: 91.46, close: 117.97 },  // 2023-09-14 14:21:40
    { time: 1694701800, open: 117.83, high: 123.38, low: 92.21, close: 118.66 },  // 2023-09-14 15:10:00
    { time: 1694703500, open: 118.92, high: 124.02, low: 93.14, close: 119.45 },  // 2023-09-14 15:38:20
    { time: 1694704800, open: 119.58, high: 125.26, low: 94.03, close: 120.19 },  // 2023-09-14 16:00:00
    { time: 1694707200, open: 120.43, high: 126.41, low: 95.21, close: 121.35 },  // 2023-09-14 16:40:00
    { time: 1694710800, open: 121.68, high: 127.29, low: 96.11, close: 122.47 },  // 2023-09-14 17:40:00
    { time: 1694714500, open: 122.72, high: 128.14, low: 97.42, close: 123.38 },  // 2023-09-14 18:48:20
    { time: 1694718000, open: 123.58, high: 129.03, low: 98.24, close: 124.51 },  // 2023-09-14 19:40:00
    { time: 1694721500, open: 124.82, high: 130.21, low: 99.36, close: 125.72 },  // 2023-09-14 20:40:00
    { time: 1694722500, open: 125.96, high: 131.35, low: 100.22, close: 126.87 },  // 2023-09-14 21:00:00
    { time: 1694723100, open: 126.74, high: 132.28, low: 101.37, close: 127.92 }  // 2023-09-14 21:10:00
  ];


  stockExchangeEmitter = new BehaviorSubject<IStockExchange[]>(this.apiData);

  constructor() {
    setInterval(() => {
      this.createNewData();
      this.stockExchangeEmitter.next(this.apiData);
    },1000)
   }
  createNewData(){
    const newData:IStockExchange = {
      time: new Date().getTime()/1000,
      open: parseFloat((Math.random() * 150).toFixed(2)),
      high: parseFloat((Math.random() * 150).toFixed(2)),
      low:  parseFloat((Math.random() * 150).toFixed(2)),
      close:parseFloat(( Math.random() * 150).toFixed(2))
    };
    this.apiData.push(newData);
    this.stockExchangeEmitter.next(this.apiData);
  }
  getStockPrices(): Observable<IStockExchange[]> {
    return  this.stockExchangeEmitter.asObservable();
  }
}
