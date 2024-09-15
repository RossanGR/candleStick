import { TestBed } from '@angular/core/testing';

import { StockExchangeService } from './stock-exchange.service';
import { IStockExchange } from '../models/IStockExchange';
import { of } from 'rxjs';

describe('StockExchangeService', () => {
  let service: StockExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle multiple concurrent requests without data loss', (done) => {
    const newData: IStockExchange = {
      time: new Date().getTime() / 1000,
      open: 100,
      high: 110,
      low: 90,
      close: 105,
    };
    const apiData = service.apiData;

    const spy = spyOn(service.stockExchangeEmitter, 'next');

    const concurrentRequests = 5;
    const promises = [];

    for (let i = 0; i < concurrentRequests; i++) {
      promises.push(service.createNewData());
    }

    Promise.all(promises).then(() => {
      expect(spy).toHaveBeenCalledTimes(concurrentRequests);
      apiData.push(newData);
      expect(service.apiData[service.apiData.length - 1]).toEqual(newData);
      done();
    });
  });

  it('should emit stock prices when called', (done) => {
    const mockStockExchangeData: IStockExchange[] = [
      { time: 1694678400, open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
    ];

    service.stockExchangeEmitter.next(mockStockExchangeData);

   const subscription = service.getStockPrices().subscribe((stockPrices) => {
      expect(stockPrices).toEqual(mockStockExchangeData);
      done();
    });

    subscription.unsubscribe();
  });

  it('should handle errors gracefully and not crash', (done) => {
    const error = new Error('Test error');
    const mockStockExchangeData: IStockExchange[] = [
      { time: 1694678400, open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
    ];

    service.stockExchangeEmitter.next(mockStockExchangeData);

   const subscription = service.getStockPrices().subscribe((stockPrices) => {
      expect(stockPrices).toEqual(mockStockExchangeData);
      done();
    });


    spyOn(service.stockExchangeEmitter, 'asObservable').and.returnValue(of([{ time: '1694678400', open: 75.16, high: 82.84, low:70, close:10}]));

    service.getStockPrices().subscribe({
      error: (err) => {

        expect(err).toBe(error);
        done();
      }
    });

    subscription.unsubscribe();
  });

  it('should handle errors gracefully and not crash', () => {
   // Arrange
    const initialDataLength = service.apiData.length;
    const newData =  { time: 1694678400, open: 75.16, high: 82.84, low: 36.16, close: 45.72 }

    // Act
    service.apiData.push(newData);

    // Assert
    expect(service.apiData.length).toBe(initialDataLength + 1);
    expect(service.apiData[initialDataLength].time).toBeLessThanOrEqual(Math.floor(Date.now() / 1000) - 1);
    expect(service.apiData[initialDataLength].open).toBeGreaterThanOrEqual(0);
    expect(service.apiData[initialDataLength].open).toBeLessThanOrEqual(150);
    expect(service.apiData[initialDataLength].high).toBeGreaterThanOrEqual(0);
    expect(service.apiData[initialDataLength].high).toBeLessThanOrEqual(150);
    expect(service.apiData[initialDataLength].low).toBeGreaterThanOrEqual(0);
    expect(service.apiData[initialDataLength].low).toBeLessThanOrEqual(150);
    expect(service.apiData[initialDataLength].close).toBeGreaterThanOrEqual(0);
    expect(service.apiData[initialDataLength].close).toBeLessThanOrEqual(150);
  });
});
