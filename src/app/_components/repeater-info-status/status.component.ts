import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RepeaterStatus } from 'src/app/shared/types/repeater-status';
// import { RepeaterStatusHelper } from 'src/app/shared/helper/filter/status.helper';

@Component({
  selector: 'mapy73pl-repeater-info-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepeaterInfoStatusComponent  {
  @Input() status = ''

  repeaterStatus = RepeaterStatus;
}
