import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SubSink } from 'subsink';
import { OneInfo, RepeatersPageService } from '../shared/services/repeaterPage.service';
import { dmrLink } from '../start-page/start-page.page';


const allowedDmr: dmrLink[] = require("../type/dmr-allowed.json");


@Component({
  selector: 'm73pl-types',
  templateUrl: './type.page.html',
  styleUrls: ['./type.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class TypePage implements OnInit {

  hTitle = 'Typy przemienników'
  hTitleSufix = ''
  public loaded = false;

  allowedDmrCountry: string[] = allowedDmr.map(o => o.c)
  dmrCountryName: string[] = allowedDmr.map(o => o.name)

  repeters: OneInfo[] =[]

  typeFromUrl = ''
  countryFromUrl = ''

  private subSink = new SubSink();

  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private route: Router, 
    private repeatersPageService: RepeatersPageService,
    private changeDetectorRef: ChangeDetectorRef,

  ) {}  

  ngOnDestroy():void {
    this.subSink.unsubscribe();
  }    

  ngOnInit() {

    this.typeFromUrl = this.activatedRoute.snapshot.paramMap.get('type') as string;
    this.countryFromUrl = this.activatedRoute.snapshot.paramMap.get('country') as string;

    let isPathAllowed = false
    if(this.typeFromUrl === 'fm-poland') {
      if(this.countryFromUrl === 'all') {
        this.hTitle = 'Wszystkie przemienniki'
        this.hTitleSufix = 'FM Poland'
        isPathAllowed = true
      }
    } else if(this.typeFromUrl === 'dmr') {
      this.hTitle = 'Przemienniki DMR'

      const idAllowedKey = this.allowedDmrCountry.indexOf(this.countryFromUrl)

      if(idAllowedKey > -1) {
        this.hTitleSufix = this.dmrCountryName[idAllowedKey]
        isPathAllowed = true
      }
    }

    if(!isPathAllowed) {
      this.route.navigate(['/przemienniki-krotkofalarskie.jpeg']);     
    } else {

      this.loaded = false
      this.subSink.sink = this.repeatersPageService.loadAllRepeatersDataIfNotExist().subscribe({
        next:() => {
          if(this.typeFromUrl === 'fm-poland') {
            this.repeters = this.repeatersPageService.getAllFmPoland()
          } else if(this.typeFromUrl === 'dmr') {
            this.repeters = this.repeatersPageService.getDMR(this.countryFromUrl)
          } 

          this.loaded = true
          this.changeDetectorRef.markForCheck();
        },
        error: () => {
          this.loaded = true
          this.changeDetectorRef.markForCheck();
        },
      }) 
    }
  }  
  
  ionViewWillEnter() {
      this.title.setTitle(`${this.hTitle} ${this.hTitleSufix}`) 
  }

  repeaterLink(i: string) {
    return  this.route.createUrlTree(['/repeater',i.replace(/\/R/, '.R')]);
  }    
}

