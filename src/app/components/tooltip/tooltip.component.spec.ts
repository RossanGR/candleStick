import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipComponent } from './tooltip.component';
import { IToolTip } from '../../models/IToolTipData';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist a div tooltip', () => {
    const tooltipDiv = fixture.nativeElement.querySelector('.tooltip');
    expect(tooltipDiv).toBeTruthy();
  });

  it('should have data in tooltip', () => {
    let toolTipVariable = component.tooltipData;

    const tooltipData:IToolTip ={
      tooltipVisible: true,
      tooltipTop: 100,
      tooltipLeft: 200,
      tooltipContent: {
        time: 1640995200,
        open: 100,
        high: 150,
        low: 50,
        close: 120
      }
    }

     toolTipVariable = tooltipData

    expect(toolTipVariable).toEqual(tooltipData);
  });
});
