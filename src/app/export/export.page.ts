import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { UserSaveService } from '../shared/services/user.service';

import { FileSaverService } from 'ngx-filesaver'; 
import { ExportHelper, ExportList } from '../shared/helper/export.helper';
import { RepeatersPageService } from '../shared/services/repeaterPage.service';
import { FilterService } from '../shared/services/filter.service';
import * as JSZip from 'jszip';


@Component({
  selector: 'mapy73pl-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class ExportPage implements OnInit {

  loaded = false;
  exportsList: ExportList[] = []

  private subSink = new SubSink();


  constructor(
    private route: Router, 
    private userSaveService: UserSaveService,
    private fileSaverService: FileSaverService,
    private repeatersPageService: RepeatersPageService,
    private changeDetectorRef: ChangeDetectorRef,
    private filterService: FilterService,
      
  ) { }

  ngOnInit() {
    this.subSink.sink = this.userSaveService.getObsSavedPathCount().subscribe({next:(count) => {
      if(count < 1) {
        this.route.navigate(['/mapa-przemiennikow']);
      } else {
        this.exportsList = this.repeatersPageService.getExportList(this.userSaveService.getSavedPath())
        //console.log(this.userSaveService.getSavedPath())
      }
    }})   
    
    this.loaded = false
    this.subSink.sink = this.repeatersPageService.loadAllRepeatersDataIfNotExist().subscribe({
      next:() => {
        this.loaded = true
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.loaded = true
        this.changeDetectorRef.markForCheck();
      },
    })           
  }

  ngOnDestroy():void {
    this.subSink.unsubscribe();
  }  

  goToRepeaterInfo(i: string) {
      this.route.navigate(['/repeater',i.replace(/\/R/, '.R')]);
  }  

  // removeRptrPatch(rptrPatchHash: string) {
  //   this.userSaveService.removePatchByHash(rptrPatchHash)
  // }

  showRepeaterOnMap(exportList: ExportList) {
    //console.log(exportList)
    this.filterService.setLastFilterDataRptToRepeaterExport(exportList)
     setTimeout(() => {
      this.route.navigate(['/mapa-przemiennikow']);
    },20)    
    // setTimeout(() => {
    //   window.dispatchEvent(new Event('resize')); 
    // },300)      
  }  

  createCSV() {
    const filename = 'mapy73pl.csv'
    this.fileSaverService.saveText(ExportHelper.getCsvTexFromExportList(this.exportsList), filename);
  }

  createCHIRP() {
    const filename = 'CHIRP-mapy73pl.csv'
    this.fileSaverService.saveText(ExportHelper.getChirpTexFromExportList(this.exportsList), filename);
  }

  createIcom() {
    const filename = 'Icom-mapy73pl.csv'
    this.fileSaverService.saveText(ExportHelper.getIcomTexFromExportList(this.exportsList), filename);
  }  
  
  createYaesu() {
    const filename = 'Yaesu-mapy73pl.csv'
    this.fileSaverService.saveText(ExportHelper.getYaesuTexFromExportList(this.exportsList), filename);
  }  
  
  createOpenGD77() {
    const filename = 'OpenGD77-mapy73pl.zip'
    
    let zip = new JSZip();
    ExportHelper.getOpenGD77FilesFromExportList(this.exportsList).forEach(file => {
      zip.file(file.name, file.data);
    })
    zip.generateAsync({ type: "blob" })
           .then(blob => this.fileSaverService.save(blob,filename));    

    // const data1 = 'some text'+"aaaa \n bbbbb";
    // const blob1 = new Blob([data1], { type: 'application/octet-stream' });
    // const data2 = '{json:true}';
    // const blob2 = new Blob([data2], { type: 'application/json' });
    // var zip = new JSZip();
    //     zip.file("some.txt", data1);
    //     zip.file("some.json", blob2);
    //     zip.generateAsync({ type: "blob" })
    //       .then(blob => this.fileSaverService.save(blob,filename));    
  }   

}
