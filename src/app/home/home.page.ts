import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CheckboxCustomEvent, IonModal, ModalController, Platform, RangeCustomEvent} from '@ionic/angular';


import { LatLng, Map as MapLeaf,  } from 'leaflet';
import { defaultFilterDataRptr, FilterDataRptr, FilterService } from '../shared/services/filter.service';
import { Country } from '../shared/helper/filter/countries.helper';
import { RptrStatus } from '../shared/helper/filter/status.helper';
import { RepeaterStatus } from '../shared/types/repeater-status';
import { RptrType } from '../shared/helper/filter/type.helper';
import { RepeaterType } from '../shared/types/repeater-type';
import { RptrBand } from '../shared/helper/filter/band.helper';
import { RepeaterBand } from '../shared/types/repeater-band';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { Meta, Title } from '@angular/platform-browser';
import { MapComponent } from '../_components/map/map.component';
import { RepeaterMapService, RepeatersMap } from '../shared/services/repeaterMap.service';
import { defalutRepeaterAllData, defalutRepeaterDataLocation, defaultRepeaterData, RepeaterBandKey, RepeatersPageService } from '../shared/services/repeaterPage.service';
import { defaultRptrPatch, RptrPatch, UserSaveService } from '../shared/services/user.service';
import { defaultMarkerInfo, LocatorHelper } from '../shared/helper/locator.helper';

@Component({
  selector: 'mapy73pl-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit,OnDestroy {

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(MapComponent) mapComponent: MapComponent;
  repeatersFiltered: RepeatersMap[] = [];
  repeatersMapCount = 0;
  repeatersAllCount = 0
  
  moveMarker = {...defaultMarkerInfo}

  segmentValue = 'filter'

  private lMap: MapLeaf|null = null;
  private subSink = new SubSink();

  canGeolocation = false
  geolocationIssueText = ''

  public isDekstop: boolean = false;
  public filterToUp = true;

  public filterDataRptr = {...defaultFilterDataRptr};

  public isFilterOpen = true;
  public isModalOpen = false;
  public loading = false;

  public showRepDataLocation = defalutRepeaterDataLocation;
 
  public showRepData = defaultRepeaterData;


  //public showRepName = '';
  // public showRepBandName = ''
  public lastUsedRptrPatch = defaultRptrPatch
  public isSavedLastUsedRptrPatch = false;

  public showCrossRep = false
  public repeaterBandKey: RepeaterBandKey[] = [];
  public repeaterAllData = defalutRepeaterAllData
  public repeaterLoading = true;  


  private isFirstLoad = true;
  private testPassed = false

  public filteredPath: Map<string,RptrPatch> = new Map()
  public savedFiltered = 0;

  dataFromUser = false;

  constructor(
    private repeaterMapService: RepeaterMapService,
    private repeatersPageService: RepeatersPageService,
    private userSaveService: UserSaveService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: Router,
    private filterService: FilterService,
    private modalCtrl: ModalController,
    private title: Title,
    private meta: Meta,
    public platform: Platform
    
  ) {}


  ngOnDestroy():void {
    this.modalCtrl.dismiss();
    this.subSink.unsubscribe();
  }

  ngOnInit(): void {
    this.title.setTitle('Mapa przemiennikow krotkofalarskich')

    //console.log('init')
    this.subSink.sink = this.filterService.getObsLastFilterDataRptr().subscribe({next:(lastFilterDataRptr: FilterDataRptr) => {
      this.filterDataRptr = {...lastFilterDataRptr}
      if(this.mapComponent) {
        this.updateRepeaterData()  
      }
    }})
    this.subSink.sink = this.userSaveService.getObsSavedPathCount().subscribe({next:(count) => {
      this.isSavedLastUsedRptrPatch = this.userSaveService.isExist(this.lastUsedRptrPatch)
    }})   
  
    this.subSink.sink = this.repeaterMapService.serverTest().subscribe({
      next:() => {
          this.testPassed = true
          if(this.isFirstLoad && document.hidden === false){
            this.updateRepeaterData()
            this.isFirstLoad = false
          }        
      },
      error: (e) => {
        console.log('error',e)
      },
    })  

    setTimeout(() => {
      this.repeatersPageService.loadAllRepeatersDataIfNotExist().subscribe()  
    },3000)         
    
    this.isDekstop = this.platform.is('desktop')

    if(navigator.geolocation) {
      this.canGeolocation = true
    }

  }


  // ngAfterViewInit(): void {
  //   // if(this.isFirstLoad && document.hidden === false){
  //   //   console.log('aftef wiev')
  //   //   this.updateRepeaterData()
  //   //   this.isFirstLoad = false
  //   // }
  // }

  ionViewWillEnter() {
    //console.log('enter')
    this.segmentValue = 'filter'
    
    if(LocatorHelper.isValidLocator(this.moveMarker.l)) {
      this.filterDataRptr.range.radioLocator = this.moveMarker.l
    }

    this.isFilterOpen = true;   

    this.updateMetaDescription();
    this.changeDetectorRef.markForCheck();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize')); 
    },300)   
  }

  findMe() {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const lat = parseFloat((location.coords.latitude).toFixed(8))
        const lon = parseFloat((location.coords.longitude).toFixed(8))
        
        if(LocatorHelper.isValidA(lat) && LocatorHelper.isValidO(lon)) {
          this.dataFromUser = true
          this.moveMarker.a = lat
          this.moveMarker.o = lon
          this.moveMarker.l = LocatorHelper.posToLocator(this.moveMarker.a,this.moveMarker.o)       
          this.updateFilterLocator(this.moveMarker.l)
          this.changeDetectorRef.markForCheck();
          setTimeout(() => {
            this.dataFromUser = false
          },0)   
        } 
      },
      (e) => {
        this.canGeolocation = false;
        this.geolocationIssueText = e.message
        this.changeDetectorRef.markForCheck();
      },
      {enableHighAccuracy: false}
    )
  }


  radioRangeChange(event: RangeCustomEvent) {
    this.filterDataRptr.range.rangeMax = (Number)(event.detail.value)
    if(this.filterDataRptr.range.isRangeActive) {
      this.updateRepeaterData()
    }
  }

  addLastUsedRptrPatch() {
    this.userSaveService.addPatch(this.lastUsedRptrPatch)
    this.savedFiltered = this.userSaveService.getCountOfSaved(this.filteredPath)
  }

  removeLastUsedRptrPatch() {
    this.userSaveService.removePatch(this.lastUsedRptrPatch)
    this.savedFiltered = this.userSaveService.getCountOfSaved(this.filteredPath)
  }

  addFilteredRptrsAndGoToExport() { 
    this.userSaveService.removeExistAndAddPatchs(this.filteredPath)
    this.savedFiltered = this.userSaveService.getCountOfSaved(this.filteredPath)
    this.isFilterOpen = false;
    this.changeDetectorRef.markForCheck();    
    setTimeout(() => {
      this.route.navigate(['export']);
    },200)       
  }

  addFilteredRptrs() { 
    this.userSaveService.addPatchs(this.filteredPath)
    this.savedFiltered = this.userSaveService.getCountOfSaved(this.filteredPath)
  }

  removeFilteredRptrs() {
    this.userSaveService.removePatchs(this.filteredPath)
    this.savedFiltered = this.userSaveService.getCountOfSaved(this.filteredPath)
  }

  goToExport() {
    this.isFilterOpen = false;
    this.changeDetectorRef.markForCheck();    
    setTimeout(() => {
      this.route.navigate(['export']);
    },20)    
  }  

  goToSiteMap() {
    this.isFilterOpen = false;
    this.changeDetectorRef.markForCheck();    
    setTimeout(() => {
      this.route.navigate(['page','site-map']);
    },20)    
  }

  goToRepeaterInfo() {
    this.isFilterOpen = false;
    this.isModalOpen = false;
    this.changeDetectorRef.markForCheck();    
    setTimeout(() => {
      this.route.navigate(['/repeater',this.lastUsedRptrPatch.i.replace(/\/R/, '.R')]);
    },20)   
  }

  // private data = inject(DataService);
  // getMessages(): Message[] {
  //   return this.data.getMessages();
  // }

  getCountries(): Country[] {
    return this.filterService.getCountries();
  }

  getStatus(): RptrStatus[] {
    return this.filterService.getStatus();
  }

  getTypes(): RptrType[] {
    return this.filterService.getTypes();
  }

  getBands(): RptrBand[] {
    return this.filterService.getBands();
  }

  inputLatitude(e:CustomEvent) {
    const lat = (Number)(e.detail.value)
    if(LocatorHelper.isValidA(lat)) {
      this.moveMarker.a = lat
      this.moveMarker.l = LocatorHelper.posToLocator(this.moveMarker.a,this.moveMarker.o)         
      this.updateFilterLocator(this.moveMarker.l)
    } 
  }

  inputLongitude(e:CustomEvent) {
    const lon = (Number)(e.detail.value)
    if(LocatorHelper.isValidO(lon)) {
      this.moveMarker.o = lon
      this.moveMarker.l = LocatorHelper.posToLocator(this.moveMarker.a,this.moveMarker.o)     
      this.updateFilterLocator(this.moveMarker.l)
    }
  }

  inputLocator(e:CustomEvent) {
    const loc = (String)(e.detail.value)
    if(LocatorHelper.isValidLocator(loc)) {
      const pos = LocatorHelper.locatorToPos(loc)
      this.moveMarker.a = parseFloat((pos[0]).toFixed(6))
      this.moveMarker.o = parseFloat((pos[1]).toFixed(6))
      this.updateFilterLocator(loc)
    }
  }  

  mapMoveMarker(e:LatLng) {
    this.segmentValue = 'radio'
    this.moveMarker.a = parseFloat((e.lat).toFixed(6))
    this.moveMarker.o = parseFloat((e.lng).toFixed(6))
    this.moveMarker.l = LocatorHelper.posToLocator(e.lat,e.lng)
    this.filterDataRptr = {...this.filterDataRptr, range: {...this.filterDataRptr.range, isRangeActive: false, radioLocator: this.moveMarker.l}}
  }

  updateFilterLocator(locator: string) {
    this.filterDataRptr.range.radioLocator = locator
    if(this.filterDataRptr.range.isRangeActive) {
      this.updateRepeaterData()
    }
  }

  showMapRadio() {
    this.isModalOpen = false
    this.mapComponent.showRadio()
  }

  refreshPage() {
    location.reload();
  }

  updateRepeaterData() {
    this.loading = true;

    this.repeatersFiltered  = this.repeaterMapService.getRepeaterByFilterData(this.filterDataRptr)
    if(this.isFirstLoad) {
      const today:Date = new Date(new Date().toISOString().slice(0,10))
      const event:Date = new Date('2025-09-12')
      const dateDiff = ((event.valueOf()-today.valueOf()) / (1000 * 60 * 60 * 24))
      if(dateDiff > -3) {
        this.repeatersFiltered.push({
          a: 51.47064, 
          o: 18.85148,
          x: [{
            i: 'ZTK',
            c:'pl',
            s: '4',
            t: 'e',
            b: "burzenin",
            k: 0,
            x: 0,
            h: "51489049148",
            r: -1,
            o: "",
            l: ""
          }]
        })
      }

    }    
    const repeatersMap = this.repeatersFiltered.filter(rptr => rptr.a !== 0)
    this.repeatersAllCount = this.repeatersFiltered.map(o => o.x.length).reduce((a, b) => a + b, 0)
    this.repeatersMapCount = repeatersMap.map(o => o.x.length).reduce((a, b) => a + b, 0)
    this.mapComponent.updateMarkers(repeatersMap);

    this.filteredPath = new Map()
    this.repeatersFiltered.forEach(hashRptr => {
      hashRptr.x.forEach(rptr => {
        const rptrPatch: RptrPatch = {
          i: rptr.i,
          b: rptr.b,
          k: rptr.k,
          r: rptr.r
        }
        this.filteredPath.set(JSON.stringify(rptrPatch),rptrPatch)
      })
    })

    this.savedFiltered = this.userSaveService.getCountOfSaved(this.filteredPath)



    setTimeout(() => {
      this.loading = false;
      this.changeDetectorRef.markForCheck();
    },0)
  }

  @HostListener("document:visibilitychange") onWindowChange() {
    if(this.testPassed && this.isFirstLoad && document.hidden === false){
      if(this.mapComponent) {
        this.updateRepeaterData()
        this.isFirstLoad = false
      }
    }
  }


  @HostListener("click", ['$event.target']) 
  onClick(e: HTMLElement) {
    if(e.classList.contains('rpt-open')) {
      this.lastUsedRptrPatch.i = ''+e.getAttribute('data-i')
      this.lastUsedRptrPatch.b = ''+e.getAttribute('data-b')
      this.lastUsedRptrPatch.k = parseInt(''+e.getAttribute('data-k'))
      this.lastUsedRptrPatch.r = parseInt(''+e.getAttribute('data-r'))
      this.isSavedLastUsedRptrPatch = this.userSaveService.isExist(this.lastUsedRptrPatch)

      //console.log(this.lastUsedRptrPatch.i, this.lastUsedRptrPatch.b, this.lastUsedRptrPatch.k, this.lastUsedRptrPatch.r)

      if(this.lastUsedRptrPatch.r > -1) {
        this.showCrossRep = true;
        this.repeaterLoading = true
        this.subSink.sink = this.repeatersPageService.getRepAllDataAndBandKeyByKeys(this.lastUsedRptrPatch.i,this.lastUsedRptrPatch.r).subscribe({
          next:(response) => {
            const [repAllData, repBandKey] =  response
            this.repeaterBandKey = repBandKey
            this.repeaterAllData = repAllData
            this.repeaterLoading = false
            this.changeDetectorRef.markForCheck();
          },
          error: () => {
            this.repeaterBandKey = [];
            this.repeaterAllData = defalutRepeaterAllData
            //this.repeaterLoading = false
            this.changeDetectorRef.markForCheck();
          },
        })          
      } else {
        this.showCrossRep = false;
        this.repeaterLoading = true
        this.subSink.sink = this.repeatersPageService.getRepDataAndLocByKeys(this.lastUsedRptrPatch.i,this.lastUsedRptrPatch.b,this.lastUsedRptrPatch.k).subscribe({
          next:(response) => {
            const [repData, repLoc] = response
            this.showRepData = repData;
            this.showRepDataLocation = repLoc;
            this.repeaterLoading = false
            this.changeDetectorRef.markForCheck();
          },
          error: () => {
            this.showRepData = defaultRepeaterData;
            this.showRepDataLocation = defalutRepeaterDataLocation;
            //this.repeaterLoading = false
            this.changeDetectorRef.markForCheck();
          },
        })          
      }
      

      this.isModalOpen = true;
     }
  }

  segmentChangeEvt(event: CustomEvent) {
    this.segmentValue = event.detail.value
  }

  isCountryChecked(country: string):boolean {
    return this.filterDataRptr.country.includes(country)
  }

  isStatusChecked(status: RepeaterStatus):boolean {
    return this.filterDataRptr.status.includes(status)
  }

  isTypeChecked(type: RepeaterType):boolean {
    return this.filterDataRptr.type.includes(type)
  }

  isBandChecked(band: RepeaterBand):boolean {
    return this.filterDataRptr.band.includes(band)
  }

  filterDataChangeName(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toUpperCase().trim() || '';
    if(query.length) {
      this.filterDataRptr = {...this.filterDataRptr, text: query}
    } else {
      this.filterDataRptr = {...this.filterDataRptr, text: null}
    }
    this.updateRepeaterData()
  }

  filterDataChangeCountry(country: string) {
    if(this.filterDataRptr.country.includes(country)) {
      this.filterDataRptr = {...this.filterDataRptr, country: this.filterDataRptr.country.filter(v => v !== country)}
    } else {
      this.filterDataRptr = {...this.filterDataRptr, country: [...this.filterDataRptr.country, country]}
    }
    this.updateRepeaterData()
  }

  filterDataChangeStatus(status: RepeaterStatus) {
    if(this.filterDataRptr.status.includes(status)) {
      this.filterDataRptr = {...this.filterDataRptr, status: this.filterDataRptr.status.filter(v => v !== status)}
    } else {
      this.filterDataRptr = {...this.filterDataRptr, status: [...this.filterDataRptr.status, status]}
    }
   this.updateRepeaterData()
  }

  filterDataChangeType(type: RepeaterType) {
    if(this.filterDataRptr.type.includes(type)) {
      this.filterDataRptr = {...this.filterDataRptr, type: this.filterDataRptr.type.filter(v => v !== type)}
    } else {
      this.filterDataRptr = {...this.filterDataRptr, type: [...this.filterDataRptr.type, type]}
    }
   this.updateRepeaterData()
  }

  filterDataChangeBand(band: RepeaterBand) {
    if(this.filterDataRptr.band.includes(band)) {
      this.filterDataRptr = {...this.filterDataRptr, band: this.filterDataRptr.band.filter(v => v !== band)}
    } else {
      this.filterDataRptr = {...this.filterDataRptr, band: [...this.filterDataRptr.band, band]}
    }
   this.updateRepeaterData()
  }

  filterDataChangeRange(event: CheckboxCustomEvent) {
    this.filterDataRptr = {...this.filterDataRptr, range: {...this.filterDataRptr.range, isRangeActive: event.detail.checked}}
    this.updateRepeaterData()
  }  
  
  private updateMetaDescription() {
   // console.log(this.meta.getTag(`name='description'`))
    let des = 'Baza z mapą przemienników krótkofalarskich DMR i FM z: Polski, USA, Austrii, Bułgarii, Białorusi, Czech, Niemiec, Danii, Finlandii, Węgier, Islandii, Litwy, Łotwy, Holandii, Norwegii, Rumuni, Szwecji, Słowenii i Słowacji.'

    this.meta.updateTag(
      { name: 'description', content: des },
      `name='description'`
    );
  }
  
}
