import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleStickComponent } from './candle-stick.component';
import { IStockExchange } from '../../models/IStockExchange';
import { createChart, CandlestickData } from 'lightweight-charts';

describe('CandleStickComponent', () => {
  let component: CandleStickComponent;
  let fixture: ComponentFixture<CandleStickComponent>;
  let chart: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandleStickComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleStickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    chart = createChart(fixture.nativeElement.querySelector('.chart'), {
      width: 100,
      height: 400,
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateChartData', () => {
    const data: IStockExchange[] = [
      { time: 1648089600, open: 100, high: 120, low: 80, close: 110 },
      { time: 1648093200, open: 110, high: 130, low: 90, close: 120 }
    ];
    spyOn(component, 'updateChartData');
    component.updateChartData(data);
    expect(component.updateChartData).toHaveBeenCalled();
  });

  it('should call initChart function when ngOnInit is called', () => {
    spyOn(component, 'initChart');
    component.ngOnInit();
    expect(component.initChart).toHaveBeenCalled();
  });

  it('should update chart data correctly when input data changes', () => {
    const newApiData = [
      { time: 1648089600, open: 100, high: 120, low: 80, close: 110 },
      { time: 1648093200, open: 110, high: 130, low: 90, close: 120 },
    ];

    component.apiData = newApiData;

    component.ngOnChanges({
      apiData: {
        previousValue: [],
        currentValue: newApiData,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.apiData).toEqual(newApiData);
  });

  it('should throw an error when invalid data is provided', () => {
    const invalidData:any = [
      { time: 'invalidTime', open: 10, high: 15, low: 5, close: 12 },
    ];

    expect(() => {
      component.updateChartData(invalidData);
    }).toThrowError(`Invalid date string=invalidTime, expected format=yyyy-mm-dd`);
  });

  it('should throw an error when invalid data is provided', () => {
    const invalidData:any = [
      { time: 1630000000, open: 'invalidOpen', high: 15, low: 5, close: 12 },
      { time: 1630000000, open: 10, high: 'invalidHigh', low: 5, close: 12 },
      { time: 1630000000, open: 10, high: 15, low: 'invalidLow', close: 12 },
      { time: 1630000000, open: 10, high: 15, low: 5, close: 'invalidClose' },
    ];

    expect(() => {
      component.updateChartData(invalidData);
    }).toThrowError(`Assertion failed: data must be asc ordered by time, index=1, time=1630000000, prev time=1630000000`);
  });


  it('should have a view child', () => {
    const chart = component.chart;
    expect(chart).toBeTruthy();
  });
  it('should have a div "tv-lightweight-charts" inside view child', () => {
    const chart = component;
    expect(chart.chart.nativeElement.firstElementChild.className).toEqual('tv-lightweight-charts');
  });

  it('should have a div content', () => {
    const chart = fixture.nativeElement as HTMLDivElement;
    expect(chart.querySelector('.chart')).toBeTruthy();
  });

  it('should correctly display tooltip for the first data point', () => {
    const firstDataPoint = {
      time: 1642656000,
      open: 100,
      high: 110,
      low: 90,
      close: 105
    };
    component.apiData = [firstDataPoint];

    component.updateTooltip({
      time: firstDataPoint.time,
      seriesData: new Map([[firstDataPoint.time, firstDataPoint]]),
      point: { x: 50, y: 250 }
    });

    expect(component.tooltipData.tooltipVisible).toBeTrue();
    expect(component.tooltipData.tooltipLeft).toBe(50);
    expect(component.tooltipData.tooltipTop).toBe(250);
    expect(component.tooltipData.tooltipContent).toEqual({
      time: new Date(firstDataPoint.time * 1000).toLocaleString(),
      open: firstDataPoint.open,
      high: firstDataPoint.high,
      low: firstDataPoint.low,
      close: firstDataPoint.close
    });
  });

  it('should hide tooltip when mouse leaves candlestick', () => {

    component.tooltipData.tooltipVisible = true;
    const mouseLeaveEvent = new Event('mouseleave');
    component.chart.nativeElement.dispatchEvent(mouseLeaveEvent);

    expect(component.tooltipData.tooltipVisible).toBeFalse();
  });

  it('should hide tooltip when mouse enter candlestick', () => {

    component.tooltipData.tooltipVisible = false;
    const mouseLeaveEvent = new Event('mouseenter');
    component.chart.nativeElement.dispatchEvent(mouseLeaveEvent);

    expect(component.tooltipData.tooltipVisible).toBeTruthy();
  });

  it('should not crash when chart is destroyed', () => {
    const chart = createChart(fixture.nativeElement.querySelector('.chart'), {
      width: 100,
      height: 100,
    });

    component.candleStick = chart.addCandlestickSeries();
    component.candleStick.setData([]);

    fixture.destroy(); // Destroy the component and its chart
  });


  it('should handle large data sets efficiently', () => {
    const mockData: IStockExchange[] = [
      {
        time: 1642656000,
        open: 100,
        high: 110,
        low: 90,
        close: 105
      }
    ]

    component.apiData = mockData;

    component.ngOnChanges({
      apiData: {
        previousValue: [],
        currentValue: mockData,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });


});
