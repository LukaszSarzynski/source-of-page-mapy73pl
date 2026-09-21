import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { defaultMarkerInfo, LocatorHelper } from 'src/app/shared/helper/locator.helper';
import { defalutRepeaterDataLocation, defaultRepeaterData, RepeatUkeParm} from 'src/app/shared/services/repeaterPage.service';

@Component({
  selector: 'mapy73pl-repeater-info',
  templateUrl: './repeater-info.component.html',
  styleUrls: ['./repeater-info.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepeaterInfoComponent  {

  @Input() repeaterDataLocation = defalutRepeaterDataLocation;
  @Input() bandName = ''
  @Input() repeaterData = defaultRepeaterData;
  @Input() showMoreData = true
  @Input() showLocationTitle = false
  @Input() showStatus = false
  @Input() ukeParam: RepeatUkeParm|null = null

  @Input() showDistance = false
  @Input() moveMarker = {...defaultMarkerInfo}
  @Output() needShowRadio = new EventEmitter<void>();

  qthLocator = ''

  distanceKm = -1
  distanceDeg = -1
  
  ngOnInit() {
    if(this.repeaterDataLocation.a != 0) {
      this.qthLocator = LocatorHelper.posToLocator(this.repeaterDataLocation.a,this.repeaterDataLocation.o)
      const arrKmDeg = LocatorHelper.distanceKmAndDeg(this.moveMarker.l,this.qthLocator)
      this.distanceKm = arrKmDeg[0]
      this.distanceDeg = arrKmDeg[1]
    } 
  }

}

