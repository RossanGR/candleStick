import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandleStickComponent } from './candle-stick.component';

describe('CandleStickComponent', () => {
  let component: CandleStickComponent;
  let fixture: ComponentFixture<CandleStickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandleStickComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandleStickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
