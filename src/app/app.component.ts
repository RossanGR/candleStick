import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CandleStickComponent } from "./components/candle-stick/candle-stick.component";
import { StockExchangeService } from './service/stock-exchange.service';
import { IStockExchange } from './models/IStockExchange';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CandleStickComponent],
  providers: [StockExchangeService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
   private stockExchangeService = inject(StockExchangeService);
   data: IStockExchange[] = [];
  ngOnInit(){
    this.stockExchangeService.getStockPrices().subscribe(stock => {this.data = [...stock]});
  }

}
