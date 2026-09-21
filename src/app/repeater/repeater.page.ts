
import { ChangeDetectionStrategy, ChangeDetectorRef, Component,OnDestroy,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { FilterService } from '../shared/services/filter.service';
import { defalutRepeaterAllData, RepeaterAllData, RepeaterBandKey, RepeaterData, RepeatersPageService } from '../shared/services/repeaterPage.service';
import { SubSink } from 'subsink';
import { LocatorHelper } from '../shared/helper/locator.helper';
import { dmrLink } from '../start-page/start-page.page';

const allowedDmr: dmrLink[] = require("../type/dmr-allowed.json");


@Component({
  selector: 'mapy73pl-repeater',
  templateUrl: './repeater.page.html',
  styleUrls: ['./repeater.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class RepeaterPage implements OnInit, OnDestroy{
  public repeaterData = defalutRepeaterAllData
  public locHashs: string[] = []
  public canShowOnMap = true;

  public loaded = false;

  showFMPolandLink = false;
  showDmrLink = false;
  allowedDmrCountry: string[] = allowedDmr.map(o => o.c)
  dmrCountryName: string[] = allowedDmr.map(o => o.name)  
  dmrLinkCategory = ''

  private subSink = new SubSink();
  
  constructor(
    private repeatersPageService: RepeatersPageService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private title: Title,
    private filterService: FilterService,
    private changeDetectorRef: ChangeDetectorRef,
    private meta: Meta
  ) {}

  ngOnDestroy():void {
    this.subSink.unsubscribe();
  }

  ngOnInit() {
    //this.modalCtrl.dismiss();
    let name = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //remove % for exampel / in url SK6DW%2FR
    name = name.replace(/\//, '')
    //fix aaa/r -> aaa.r
    // name = name.replace(/\.R/, '/R')


    this.subSink.sink = this.repeatersPageService.apiGetRepeaterById(name).subscribe({
      next:(repeaterAllData: RepeaterAllData) => {
        this.loadRpt(repeaterAllData);
      },
      error: (e) => {
        //console.log('error',e)
        this.route.navigate(['/przemienniki-krotkofalarskie.jpeg']);
      },
    })   


 
    
    ////////this.repeaterData = this.repeatersPageService.getRepeaterById(name);
    // if(this.repeaterData.i === repeterIdNoData) {
    //   this.route.navigate(['/']);
    // }
  }

  // ionViewWillEnter() {
  //   this.changeDetectorRef.markForCheck();
  //   //this.changeDetectorRef.markForCheck();
  // }



  showRepeaterOnMap() {
    this.filterService.setLastFilterDataRptToRepeater(this.repeaterData)
     setTimeout(() => {
      this.route.navigate(['/mapa-przemiennikow']);
    },20)    
    // setTimeout(() => {
    //   window.dispatchEvent(new Event('resize')); 
    // },300)      
  }

  showAllRepeaterOnMap() {
    //this.repeaterMapService.getRepeaterByFilterData(this.filterDataRptr)
    this.filterService.setInitFilterDataRptr()
     setTimeout(() => {
      this.route.navigate(['/mapa-przemiennikow']);
    },20)    
    // setTimeout(() => {
    //   window.dispatchEvent(new Event('resize')); 
    // },300)      
  }

  // goToHome() {
  //   setTimeout(() => {
  //     this.route.navigate(['/']);
  //   },20)    
  //   // setTimeout(() => {
  //   //   window.dispatchEvent(new Event('resize')); 
  //   // },300)  
  // }

  returnBands(repBandKey: RepeaterBandKey): string[] {
    // console.log(Object.keys(repBandKey))
    
    return Object.keys(repBandKey)
  }

  returnRepeaterData(band: string, key: number):RepeaterData {
    return this.repeaterData.x[band][key]
  }

  private loadRpt(repeaterAllData: RepeaterAllData) {
    this.repeaterData = repeaterAllData
    this.loaded = true;          
    //this.title.setTitle(this.repeaterData.i + TITLE_SEP + TITLE_BASE)
    this.locHashs = Object.keys(this.repeaterData.h)
    this.updateMetaDescription();
   //this.canShowOnMap = true;//this.repeaterMapService.issetRepeaterOnMap(name)

    this.changeDetectorRef.markForCheck();
  }

  private updateMetaDescription() {
    //console.log(this.meta.getTag(`name='description'`))

    let des = ''
    let title = ''
    const bands = Object.keys(this.repeaterData.x)

    let rx: {[key:string]: string} = {}
    let tx: {[key:string]: string} = {}
    let loc: {[key:string]: string} = {}
    let info: {[key:string]: string} = {}


    let type = ''
    bands.forEach(band => {
      this.repeaterData.x[band].forEach(rep =>{
        if(!type.length && rep.t.includes('e')) { 
          type = 'DMR'
        }  else if (!type.length && rep.t.includes('a')) {
          type = 'FM'
        } else if(!type.length && rep.t.includes('i')) {
          type = 'FM'
        } else if(!type.length && rep.t.includes('j')) {
          type = 'FM'
        }
        
        if(rep.t.includes('e')) {
          const idAllowedKey = this.allowedDmrCountry.indexOf(this.repeaterData.c)
          if(idAllowedKey > -1) {
            this.dmrLinkCategory = this.dmrCountryName[idAllowedKey]
            this.showDmrLink = true;
          }             
        } else if(rep.t.includes('j')) {
          this.showFMPolandLink = true;
        }

        const r = rep?.rx?.f
        if(r){
          rx[r] = ''
        }
        const t = rep?.tx?.f
        if(t){
          tx[t] = ''
        }  
        const text = rep.d
        if(text.length) {
          info[text] = ''
        }      
      })
    })

    title += `${this.repeaterData.i} Przemiennik ${type} ${bands.toString()}`
    if('r' in this.repeaterData) {
      title += ' (cross-band)'
    }    

    const owner = this.repeaterData.o
    if(owner.length) {
      des += `Opiekun ${owner.toString()}`
    }
    
    let AO = ''
    Object.keys(this.repeaterData.h).forEach(hash => {
      let location = '';
      if(this.repeaterData.h[hash].p.length) {
        location += ` ${this.repeaterData.h[hash].p}`
      }
      if(this.repeaterData.h[hash].a !== 0) {
        location += ` (QTH lokator: ${LocatorHelper.posToLocator(this.repeaterData.h[hash].a,this.repeaterData.h[hash].o)})`
      }    
      if(location.length) {
        loc[location] = ''
      }  
      if(this.repeaterData.h[hash].a && this.repeaterData.h[hash].o) {
        AO = ` lokalizacja: ${this.repeaterData.h[hash].a}${this.repeaterData.h[hash].a>0?'N':'S'} ${this.repeaterData.h[hash].o}${this.repeaterData.h[hash].o>0?'E':'W'} `
      }

    })

    //if(AO.length) {
      des += AO
    //}

    const aLoc = Object.keys(loc)
    if(aLoc) {
      des += ' '+aLoc.toString()
    }

    const aInfo = Object.keys(info)
    if(aInfo) {
      des += ' '+aInfo.toString()
    }

    const aRx = Object.keys(rx).map(i=>` ${parseFloat(i).toFixed(5)} MHz`)
    if(aRx.length) {
      des += ' RX:'+aRx.toString()
    }

    const aTx = Object.keys(tx).map(i=>` ${parseFloat(i).toFixed(5)} MHz`)
    if(aTx.length) {
      des += ', TX:'+aTx.toString()
    }    

    des = des.replace(/ ,/g, ',').replace(/  /g, ' ').replace(/  /g, ' ').replace(/\n/g, ' ') 
    if(des.length > 160) {
      des = des.slice(0,158)+'..'
    }
// console.log(title)
// console.log(des)
    this.title.setTitle(title)
    this.meta.updateTag(
      { name: 'description', content: des},
      `name='description'`
    );
  }
}


