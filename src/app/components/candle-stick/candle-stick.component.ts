import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { createChart, CandlestickData } from 'lightweight-charts';
import { IStockExchange } from '../../models/IStockExchange';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from "../tooltip/tooltip.component";
import { IToolTip } from '../../models/IToolTipData';


@Component({
  selector: 'app-candle-stick',
  standalone: true,
  imports: [CommonModule, TooltipComponent],
  templateUrl: './candle-stick.component.html',
  styleUrl: './candle-stick.component.css'
})
export class CandleStickComponent implements OnInit, OnChanges {
  @ViewChild('chart', { static: true }) chart!: ElementRef;
  @Input() apiData: IStockExchange[] = [];
  tooltipData: IToolTip = {
    tooltipVisible: false,
    tooltipTop: 0,
    tooltipLeft: 0,
    tooltipContent: {
      time: '',
      open: 0,
      high: 0,
      low: 0,
      close: 0
    }
  }

  candleStick:any;


  ngOnInit(): void {
    // Chama a função para inicializar o gráfico
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges){
    // Verifica se o Input foi atualizado para passar os novos dados para o gráfico
    if (changes['apiData'] && changes['apiData'].currentValue) {
      this.updateChartData(changes['apiData'].currentValue);
    }
  }

  initChart(){
    // Cria o gráfico
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

    // Faz a configuração das cores de alta e baixa
    this.candleStick = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350'
    });

    // Recebe os dados que alimenta o gráfico
    const data: CandlestickData[] = this.apiData
    // Atualiza o Gráfico com os dados recebidos
    this.candleStick.setData(data);
    // Função responsável pela captura do mouse no gráfico
    chart.subscribeCrosshairMove((event:any) => {
      if (!event || !event.time) return;

      if (this.tooltipData.tooltipVisible) {
        this.updateTooltip(event);
      }
    });
    // Verifica se o mouse está sobre a div do gráfico, fazendo com que o gráfico seja exibido
    this.chart.nativeElement.addEventListener('mouseenter', () => {
      this.tooltipData.tooltipVisible = true;
    });
    // Verifica se o mouse está fora da div do gráfico, fazendo com que o tooltip não seja exibido
    this.chart.nativeElement.addEventListener('mouseleave', () => {
      this.tooltipData.tooltipVisible = false;
    });
    // Ajusta a resolução e foco do gráfico
    chart.timeScale().fitContent();
    // Redimensiona o gráfico conforme o CSS passado para a div
    window.addEventListener('resize', () => {
      chart.resize(this.chart.nativeElement.clientWidth, 400);
    });
  }

  // Atualiza os dados do gráfico com os dados recebidos
  updateChartData(data: IStockExchange[]): void {
    this.candleStick.setData(data);
  }
  // Atualiza o tooltip com os dados do evento de mouse
  updateTooltip(event: any) {
    const { time, seriesData } = event;

    if (seriesData) {

      const tooltipData:any = Array.from(seriesData.values())[0];

      const { x, y } = event.point;
      this.tooltipData.tooltipLeft = x;
      this.tooltipData.tooltipTop = y;
      this.tooltipData.tooltipContent = {
        time: new Date(time * 1000).toLocaleString(),
        open: tooltipData.open,
        high: tooltipData.high,
        low: tooltipData.low,
        close: tooltipData.close
      }

    this.tooltipData.tooltipVisible = true;
    } else {
      this.tooltipData.tooltipVisible = false;
    }
  }
}


