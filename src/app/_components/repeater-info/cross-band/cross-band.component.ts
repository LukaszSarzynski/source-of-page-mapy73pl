import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { defaultMarkerInfo } from 'src/app/shared/helper/locator.helper';
import { defalutRepeaterAllData, defalutRepeaterDataLocation, RepeaterBandKey, RepeaterData, RepeatUkeParm } from 'src/app/shared/services/repeaterPage.service';
// import { RepeaterStatusHelper } from 'src/app/shared/helper/filter/status.helper';

@Component({
  selector: 'mapy73pl-repeater-info-cross-band',
  templateUrl: './cross-band.component.html',
  styleUrls: ['./cross-band.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepeaterInfoCrossBandsComponent implements OnInit  {
  
  public bandToBandName = ''
  public repeatersBand: RepeaterData[] = []
  public bands: string[] = []
  public masterRepDataLocation = defalutRepeaterDataLocation;

  @Input() repeaterBandKey: RepeaterBandKey[] = [];
  @Input() repeaterAllData = defalutRepeaterAllData
  @Input() showMoreData = true;
  @Input() ukeParam: RepeatUkeParm|null = null
  
  @Input() showDistance = false
  @Input() moveMarker = {...defaultMarkerInfo}
  @Output() needShowRadio = new EventEmitter<void>();
  
  ngOnInit() {
    //console.log(this.repeaterBandKey)
    this.repeaterBandKey.forEach((obRepBa, key) => {
      const aBands = Object.keys(obRepBa)
      if(aBands.length) {
        const bandName = aBands[0]
        if(key === 0) {
          this.bandToBandName = bandName + ' na ';
          const masterLocHash = this.repeaterAllData.x[bandName][obRepBa[bandName]].h
          this.masterRepDataLocation = this.repeaterAllData.h[masterLocHash]
        } else {
          this.bandToBandName += bandName
          if(key +1 < this.repeaterBandKey.length) {
            this.bandToBandName += ', '
          }
        }
        this.bands.push(bandName)
        this.repeatersBand.push(this.repeaterAllData.x[bandName][obRepBa[bandName]])
      }    
    })

  }


}
