import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Compressed, decompress } from 'compress-json';
import { RptrPatch } from './user.service';
import { ExportList } from '../helper/export.helper';
import { environment } from 'src/environments/environment';
import { LocatorHelper } from '../helper/locator.helper';
import { RepeaterType } from '../types/repeater-type';

@Injectable({
  providedIn: 'root'
})
export class RepeatersPageService {

  private obRepeatersAllData: ObjectRepeatersAllData = {}

  constructor(
    private http: HttpClient
  ) {}
    
  public getRepeaterById(name: string): RepeaterAllData {
    if(name.length <4 ) return defalutRepeaterAllData;
   
   
    return defalutRepeaterAllData;
  }

  public getExportList(exportPath: RptrPatch[]): ExportList[] {
    
    //RepeaterAllData
    const tmpExLst: ExportList[] = []
    exportPath.forEach(o => {
      if(this.obRepeatersAllData.hasOwnProperty(o.i)) {
        if(o.r > -1) {
          const repeaterFound = this.obRepeatersAllData[o.i];
          let repBandKey: RepeaterBandKey[] = []
          if('r' in repeaterFound && repeaterFound['r']?.length) {
            repBandKey = repeaterFound['r'][o.r]
          }
          // console.log(repeaterFound, repBandKey)
         const mainBand = Object.keys(repBandKey[0])[0]
         const mainBandKey = repBandKey[0][mainBand]
         const mainRepData = repeaterFound.x[mainBand][mainBandKey]

         repBandKey.forEach((txBandKey,k) => {
          if(k > 0) {
            const txBand = Object.keys(repBandKey[k])[0]
            const txBandKey = repBandKey[k][txBand]
            const txRepData = repeaterFound.x[txBand][txBandKey]
            tmpExLst.push({
              i: o.i, //name
              s: '', //RepeaterStatus
              c: repeaterFound.c,
              m: mainRepData.t.split(''), //RepeaterType
              b: o.b+'/'+txBand, //RepeaterBand
              r: mainRepData?.rx ? mainRepData.rx.f : 0, //rx
              z: this.getCTCSSbyRepeaterData(mainRepData),
              d: this.getDCSbyRepeaterData(mainRepData), 
              t: txRepData?.tx ? txRepData.tx.f : 0, //tx
              p: repeaterFound.h[mainRepData.h].p, // p: 'Warszawa Ursus', miejsce
              a: repeaterFound.h[mainRepData.h].a,// a: 52.194374, latitude
              o: repeaterFound.h[mainRepData.h].o,// o: 20.886109 longitute,
              q: repeaterFound.h[mainRepData.h].a !== 0 ? LocatorHelper.posToLocator(repeaterFound.h[mainRepData.h].a,repeaterFound.h[mainRepData.h].o) : '', // locator
              h: JSON.stringify(o),
              f: this.getColorCodebyRepeaterData(mainRepData),
              e1: mainRepData?.e1 ? mainRepData?.e1 : [],
              e2: mainRepData?.e2 ? mainRepData?.e2 : [],              
            })    
          }
         })

     

        } else {
          const repeaterFound =  this.obRepeatersAllData[o.i];
          // console.log(repeaterFound,)
          // console.log(repeaterFound.x,o.b,o.k)
          const repData = repeaterFound.x[o.b][o.k]
          //return [repData, repeaterFound.h[repData.h]]      

          tmpExLst.push({
            i: o.i, //name
            s: '', //RepeaterStatus
            c: repeaterFound.c,
            m: repData.t.split(''), //RepeaterType
            b: o.b, //RepeaterBand
            r: repData?.rx ? repData.rx.f : 0, //rx
            z: this.getCTCSSbyRepeaterData(repData),
            d: this.getDCSbyRepeaterData(repData),            
            t: repData?.tx ? repData.tx.f : 0, //tx
            p: repeaterFound.h[repData.h].p, // p: 'Warszawa Ursus', miejsce
            a: repeaterFound.h[repData.h].a,// a: 52.194374, latitude
            o: repeaterFound.h[repData.h].o,// o: 20.886109 longitute,
            q: repeaterFound.h[repData.h].a !== 0 ? LocatorHelper.posToLocator(repeaterFound.h[repData.h].a,repeaterFound.h[repData.h].o): '', // locator
            h: JSON.stringify(o),
            f: this.getColorCodebyRepeaterData(repData),
            e1: repData?.e1 ? repData?.e1 : [],
            e2: repData?.e2 ? repData?.e2 : [],
          })
        }

      }

    })
    return tmpExLst
  }

  getAllFmPoland(): OneInfo[] {
    let found: OneInfo[] = []
    const aKeys = Object.keys(this.obRepeatersAllData)
    aKeys.forEach(rptKey => {
      const rpt = this.obRepeatersAllData[rptKey]
      const aBands = Object.keys(rpt.x)
      aBands.forEach(band => {
        rpt.x[band].forEach(option => {
          if(option.t.includes(RepeaterType.FM_POLAND)) {
            const rptInfo: OneInfo = {
              ...defaultOneInfo,
              i: rpt.i,
              x: option?.tx?.f ? option?.tx?.f : 0,
              s: option.s,
              p: rpt.h[option.h].p
            }

            found.push(rptInfo)
          }
        })
      })
    })

    return this.sortOneInfo(found)
  }

  getDMR(country: string): OneInfo[] {
    let found: OneInfo[] = []
    const aKeys = Object.keys(this.obRepeatersAllData)
    aKeys.forEach(rptKey => {
      const rpt = this.obRepeatersAllData[rptKey]
      const aBands = Object.keys(rpt.x)
      aBands.forEach(band => {
        rpt.x[band].forEach(option => {
          if(rpt.c === country && option.t.includes(RepeaterType.DMR)) {
            const rptInfo: OneInfo = {
              ...defaultOneInfo,
              i: rpt.i,
              x: option?.tx?.f ? option?.tx?.f : 0,
              s: option.s,
              p: rpt.h[option.h].p
            }

            found.push(rptInfo)
          }
        })
      })
    })

    return this.sortOneInfo(found)
  }  

  private sortOneInfo(array: OneInfo[]) {
    return array.sort((a,b) => (a.i < b.i) ? 1 : ((b.i < a.i) ? -1 : 0))
  }

  private getColorCodebyRepeaterData(repeaterData: RepeaterData) {
    let code = ''
    let idCC = -1
    if(repeaterData?.rx?.t && repeaterData?.rx?.t.length) {
      repeaterData?.rx?.t.forEach((actv,keyId) => {
        if(Object.keys(actv)[0] === 'f') idCC = keyId
      })
    }
    if(idCC> -1) { // c: 123.0
      if(repeaterData?.rx?.t && 'f' in repeaterData?.rx?.t[idCC]) {
        code = repeaterData?.rx?.t[idCC]['f']
      }
    }
    return code
  }

  private getCTCSSbyRepeaterData(repeaterData: RepeaterData) {
    let code = ''
    let idCTCSS = -1
    if(repeaterData?.rx?.t && repeaterData?.rx?.t.length) {
      repeaterData?.rx?.t.forEach((actv,keyId) => {
        if(Object.keys(actv)[0] === 'c') idCTCSS = keyId
      })
    }
    if(idCTCSS> -1) { // c: 123.0
      if(repeaterData?.rx?.t && 'c' in repeaterData?.rx?.t[idCTCSS]) {
        code = repeaterData?.rx?.t[idCTCSS]['c']
      }
    }
    return code
  }

  private getDCSbyRepeaterData(repeaterData: RepeaterData) {
    let code = ''
    let idDCS = -1
    if(repeaterData?.rx?.t && repeaterData?.rx?.t.length) {
      repeaterData?.rx?.t.forEach((actv,keyId) => {
        if(Object.keys(actv)[0] === 'd') idDCS = keyId
      })
    }
    if(idDCS> -1) { // c: 123.0
      if(repeaterData?.rx?.t && 'd' in repeaterData?.rx?.t[idDCS]) {
        code = repeaterData?.rx?.t[idDCS]['d']
      }
    }
    return code
  }  

  public loadAllRepeatersDataIfNotExist(): Observable<boolean>  {
    if(this.isAllDataLoaded()) {
      return this.http
      .get<ApiDataBaseVersion>(environment.host+'/api/v2/test/data')
       .pipe( 
         map(() => {
           return true;
         })
       ) 
    } else {
      return this.http
      .get<Compressed>(environment.host+'/api/v2/test/huge')
        //.pipe(delay(5000))
       .pipe( 
         map(o => {
           try {
             let repeatersFound = decompress(o)
             this.obRepeatersAllData = repeatersFound
             //console.log(repeatersFound)
             return true;
           } catch (error) {
             throw new Error('wrong data');
           }      
         })
       ) 
    }

  }

  public apiGetRepeaterById(name: string): Observable<RepeaterAllData> {
    if(this.obRepeatersAllData.hasOwnProperty(name)) {
      return this.http
      .get<ApiDataBaseVersion>(environment.host+'/api/v2/test/data')
       .pipe( 
         map(() => {
           return this.obRepeatersAllData[name];
         })
       ) 
    } else {
      return this.http
      .get<Compressed>(environment.host+'/api/v2/repeaters/'+name)
        //.pipe(delay(5000))
       .pipe( 
         map(o=> {
           try {
             return decompress(o )
           } catch (error) {
             throw new Error('Valid token not returned');
           }      
         })
       )       
    }
  }

  public getRepDataAndLocByKeys(name: string, band: string, key: number): Observable<[RepeaterData, RepeaterDataLocation]> { 
    if(this.obRepeatersAllData.hasOwnProperty(name)) {
      return this.http
      .get<ApiDataBaseVersion>(environment.host+'/api/v2/test/data')
       .pipe( 
         map(() => {
           const repeaterFound =  this.obRepeatersAllData[name];
           const repData = repeaterFound.x[band][key]
           return [repData, repeaterFound.h[repData.h]]              
         })
       ) 
    } else {    return this.http
    .get<Compressed>(environment.host+'/api/v2/repeaters/'+name)
      //.pipe(delay(5000))
      .pipe( 
        map(o => {
          try {
            let repeaterFound = decompress(o)
            const repData = repeaterFound.x[band][key]
            return [repData, repeaterFound.h[repData.h]]
          } catch (error) {
            throw new Error('wrong data');
          }      
        })
      )     
    } 
  } 

  public getRepAllDataAndBandKeyByKeys(name: string, crossKey: number): Observable<[RepeaterAllData, RepeaterBandKey[]]> {
    if(this.obRepeatersAllData.hasOwnProperty(name)) {
      return this.http
      .get<ApiDataBaseVersion>(environment.host+'/api/v2/test/data')
       .pipe( 
         map(() => {
           const repeaterFound = this.obRepeatersAllData[name];
           let repBandKey: RepeaterBandKey[] = []
           if('r' in repeaterFound && repeaterFound['r']?.length) {
             repBandKey = repeaterFound['r'][crossKey]
           }
          return [repeaterFound, repBandKey]           
         })
       ) 
    } else {
      return this.http
      .get<Compressed>(environment.host+'/api/v2/repeaters/'+name)
       .pipe( 
         map(o => {
           try {
              const repeaterFound = decompress(o)
              let repBandKey: RepeaterBandKey[] = []
              if('r' in repeaterFound && repeaterFound['r']?.length) {
                repBandKey = repeaterFound['r'][crossKey]
              }
             return [repeaterFound, repBandKey]
           } catch (error) {
             throw new Error('wrong data');
           }      
         })
       ) 
    }


  } 

  public isAllDataLoaded(): boolean {
    return this.obRepeatersAllData.hasOwnProperty('SR7V')
  }
}
interface ObjectRepeatersAllData {
  [key: string]: RepeaterAllData
}

export interface ApiDataBaseVersion {
  v: number;
}


export const repeterIdNoData = 'Brak danych'


export const defalutRepeaterAllData: RepeaterAllData = {
  i: repeterIdNoData,
  c: '',
  o: [],
  h: {},
  x: {},
}

//  mod = mod.replace(/"open_tx":/g, 'x:');
//mod = mod.replace(/"activation":/g, 'v:');

export interface RepeaterAllData {
  i: string; //name
  c: string; //Country
  o: string[]; // operators
  h: RepeaterDataHash,
  x: RepeaterBand,
  r?: RepeaterBandKey[][]
  k?: RepeatUkeParm; //uke info
} 

export interface RepeatUkeParm {
  u: string; //url do strony uke
  l: string; //licencja
  d: string; //data konca lincencji
}

interface RepeaterDataHash {
  [key: string]: RepeaterDataLocation //key:(localization hash)
}

export const defalutRepeaterDataLocation: RepeaterDataLocation = {
  x: [],
  p: '',
  e: 0,
  g: 0,
  a: 0,
  o: 0
}

export interface RepeaterDataLocation {
  x: RepeaterBandKey[]; // pozycja w x [{'2m': 0'},{'2m': 2'},{'70cm':0}]
  p: string; // p: 'Warszawa Ursus', miejsce
  e: number; // e: 107, na pozioem moza
  g: number;// g: 0, nad pozioem grutu
  a: number;// a: 52.194374, latitude
  o: number;// o: 20.886109 longitute
} 

export interface RepeaterBandKey {
  [key: string]: number;
}

interface RepeaterBand {
  [key: string]: RepeaterData[];
}

export const defaultRepeaterData:RepeaterData = {
  // rx: {f: 0, t: []},
  // tx: {f: 0, t: []},
  h: '0',
  t: '',
  d: '',
  s: '5',
  p: 0,
  u: []
}

export interface RepeaterData {
  rx?: RepeatFrequencyParm;
  tx?: RepeatFrequencyParm;
  h: string; //localization hash
  t: string; //RepeaterType
  d: string; //descritpion
  s: string; //RepeaterStatus
  p: number; //power
  u: string[]; //urs
  j0?: number[]; // j - FM-Polnad 0 - Talk Group default
  j1?: number[]; // j - FM-Polnad 1 - Talk Group monitoredTGs
  e1?: number[]; // e - DMR - TS1
  e2?: number[]; // e - DMR - TS2
}

interface RepeatFrequencyParm {
  f: number //frequency
  t?: RepeaterActivationParm[]
}

interface RepeaterActivationParm {
  [key: string]: string; //key:RepeaterActivation
}


export interface OneInfoShort {
  i: string; //id
  p: string; //place QTH
  x: number; //tx
}

export interface OneInfo extends OneInfoShort {
  s: string; // status
}

const defaultOneInfo: OneInfo = {
  i: '',
  p: '',
  x: 0,
  s: '1'
}

// export interface InTes {
//   [key: string]: InBan;
// }

// interface InBan {
//   rx?: InFr;
//   tx?: InFr;
// }

// interface InFr {
//   f?: number;
//   t?: InTo[];
// }

// interface InTo {
//   [key:string]: number|boolean|string
// }