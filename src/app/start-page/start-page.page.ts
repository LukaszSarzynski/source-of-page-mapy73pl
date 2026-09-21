import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FilterService } from '../shared/services/filter.service';
import { Router } from '@angular/router';
import { OneInfoShort } from '../shared/services/repeaterPage.service';

const staticFmPoland = require("./fmpoland.json");
const staticDmr = require("../type/dmr-allowed.json");


@Component({
  selector: 'm73pl-start-page',
  templateUrl: './start-page.page.html',
  styleUrls: ['./start-page.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class StartPagePage implements OnInit {

  fmLink: OneFmLink[] = [
    {n: 'SR3J', s: 'RTCN Jemiołów', h: 160+185, t: 439.5000},
    {n: 'SR6LWS', s: 'Wielka Sowa', h: 1015+25, t: 439.2875},
    {n: 'SR6LZM', s: 'Żmigród', h: 89+70, t: 438.6000 },
    {n: 'SR3XXX', s: 'RTCN Poznań', h: 200+88, t: 438.7000},
    {n: 'SR2FM', s: 'Szubin wieża p.poż', h: 202+40, t: 439.5375},
    {n: 'SR2GT', s: 'Chwaszczyno', h: 349+161, t: 439.0250},
    {n: 'SR9SS', s: 'Siemianowice Śląskie', h: 312+35, t: 439.1000},
    {n: 'SR7VV', s: 'Góra Kamieńsk', h: 387+75, t: 439.1125},
    {n: 'SR7LDZ', s: 'Łódź', h: 327+77, t: 438.3500},
    {n: 'SR4DGT', s: 'Góra Dylewska', h: 312+45, t: 438.5750},
    {n: 'SR9NP', s: 'Prehyba', h: 1173+10, t: 438.9375},
    {n: 'SR5WP', s: 'Moszna-Parcela', h: 341+256, t: 438.6250},
    {n: 'SR7ST', s: 'Staszów', h: 253+70, t: 439.1500},
    {n: 'SR7KI', s: 'Święty Krzyż', h: 595+120, t: 438.7250},
    {n: 'SR8KR', s: 'Sucha Góra', h: 585+74, t: 438.6250},
    {n: 'SR8PL', s: 'Kazimierz Dolny', h: 207+90, t: 439.0875},
    {n: 'SR4MI', s: 'Miłki', h: 244+180, t: 438.7500},
    {n: 'SR4SU', s: 'Jeleniewo', h: 248, t: 438.8000},
   ]

  dmrLink: dmrLink[] = staticDmr
  fmPoland:OneInfoShort[] = staticFmPoland   

  constructor(
    private title: Title,
    private filterService: FilterService,
    private route: Router,
  ) {}   

  repeaterLink(i: string) {
    return  this.route.createUrlTree(['/repeater',i.replace(/\/R/, '.R')]);
  }    

  ngOnInit() {
    this.title.setTitle('Przemienniki krótkofalarskie') 
  }   

  showAllRepeaterOnMap() {
    this.filterService.setInitFilterDataRptr()
     setTimeout(() => {
      this.route.navigate(['/mapa-przemiennikow']);
    },20)       
  }  

}

interface OneFmLink {
  n: string
  s: string;
  h: number;
  t: number;
}

export interface dmrLink {
  c: string;
  name: string;
}

