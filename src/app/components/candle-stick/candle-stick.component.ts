import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { createChart, CandlestickData } from 'lightweight-charts';
import { IStockExchange } from '../../models/IStockExchange';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candle-stick',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candle-stick.component.html',
  styleUrl: './candle-stick.component.css'
})
export class CandleStickComponent implements OnInit, OnChanges {
  @ViewChild('chart', { static: true }) chart!: ElementRef;
  @Input() apiData: IStockExchange[] = [];
  tooltipVisible = false;
  tooltipTop = 0;
  tooltipLeft = 0;
  tooltipContent = '';

  private candleStick:any;


  ngOnInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['apiData'] && changes['apiData'].currentValue) {
      this.updateChartData(changes['apiData'].currentValue);
    }
  }

  initChart(){
    const chart = createChart(this.chart.nativeElement, {
      width: this.chart.nativeElement.clientWidth,
      height: this.chart.nativeElement.clientHeight,
      layout: {
        background: { color: '#222' },
        textColor: '#DDD',
    },
    crosshair: {
      horzLine: {
          visible: false,
          labelVisible: false,
      },
      vertLine: {
          visible: false,
          labelVisible: false,
      },
  },
    grid: {
        vertLines: {   visible: false, },
        horzLines: {   visible: false, },
    },
      timeScale:{
        timeVisible: true,
        secondsVisible: true,
      }
    });


    this.candleStick = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350'
    });


    const data: CandlestickData[] = this.apiData

    this.candleStick.setData(data);

    chart.subscribeCrosshairMove((event:any) => {
      if (!event || !event.time) return;

      // const { time, value } = event.time;
      if (this.tooltipVisible) {
        this.updateTooltip(event);
      }
    });

    this.chart.nativeElement.addEventListener('mouseenter', () => {
      this.tooltipVisible = true;
    });

    this.chart.nativeElement.addEventListener('mouseleave', () => {
      this.tooltipVisible = false;
    });

    chart.timeScale().fitContent();


    window.addEventListener('resize', () => {
      chart.resize(this.chart.nativeElement.clientWidth, 400);
    });
  }

  updateChartData(data: IStockExchange[]): void {
    this.candleStick.setData(data);
  }
  updateTooltip(event: any) {
    const { time, seriesData } = event;

    if (seriesData) {
      console.log('Mouse',seriesData);
      const { x, y } = event.point;
      this.tooltipLeft = x;
      this.tooltipTop = y;

      this.tooltipContent = `
      <div>
        <strong>Data:</strong> ${new Date(time * 1000).toLocaleString()}<br>
        <strong>Abertura:</strong> <br>
        <strong>Fechamento:</strong> <br>
        <strong>Máxima:</strong> <br>
        <strong>Mínima:</strong>
      </div>
    `;
      // this.tooltipContent = `Data: ${time}, Fechamento: ${seriesData[0].value.close}, Abertura: ${seriesData[0].value.open}, Máxima: ${seriesData[0].value.high}, Mínima: ${seriesData[0].value.low}`;
      this.tooltipVisible = true;
    } else {
      this.tooltipVisible = false;
    }
  }
}


