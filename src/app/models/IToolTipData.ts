export interface IToolTip {
  tooltipVisible: boolean;
  tooltipTop:number;
  tooltipLeft:number;
  tooltipContent: {
    time: any,
    open: number,
    high: number,
    low:  number,
    close: number
  };
}
