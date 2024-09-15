import { Component, Input } from '@angular/core';
import { IToolTip } from '../../models/IToolTipData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
  // Recebe os dados que serão exibidos no tooltip
  @Input() tooltipData: IToolTip | undefined
}
