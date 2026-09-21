import { LanguageVersion } from "../../types/language-version";

export class CountryHelper {
  private countriesPl: Country[] = [
    {id:'pl',name:'Polska'},
    {id:'au',name:'Australia'},
    {id:'at',name:'Austria'},
    {id:'be',name:'Belgia'},
    {id:'by',name:'Białoruś'},
    {id:'bg',name:'Bułgaria'},
    {id:'hr',name:'Chorwacja'},
    {id:'cz',name:'Czechy'},
    {id:'cy',name:'Cypr'},
    {id:'dk',name:'Dania'},
    {id:'ee',name:'Estonia'},    
    {id:'fi',name:'Finlandia'},
//    {id:'fr',name:'Francja'},
    {id:'gr',name:'Grecja'},
    {id:'nl',name:'Holandia'},
    {id:'ie',name:'Irlandia'},
    {id:'is',name:'Islandia'},
    {id:'li',name:'Liechtenstein'},
    {id:'lt',name:'Litwa'},
    {id:'lu',name:'Luksemburg'},
    {id:'mk',name:'Macedonia'},
    {id:'mt',name:'Malta'},
    {id:'md',name:'Mołdawia'},
    {id:'de',name:'Niemcy'},
    {id:'no',name:'Norwegia'},
    {id:'nz',name:'Nowa Zelandia'},
    {id:'pe',name:'Peru'},
    {id:'ru',name:'Rosja'},
    {id:'ro',name:'Rumunia'},
//    {id:'ch',name:'Szwajcaria'},
    {id:'se',name:'Szwecja'},
    {id:'sk',name:'Słowacja'},
    {id:'si',name:'Słowenia'},
    {id:'us',name:'USA'},
    {id:'ua',name:'Ukraina'},
    {id:'hu',name:'Węgry'},
    {id:'lv',name:'Łotwa'},
    //{id:'ae',name:'ZEA'},

    // {id:'gb',name:'Wielka Brytania'}
    // {id:'it',name:'Włochy'},
  ];

    private countriesEu: Country[] = [
    // {id:'pl',name:'Polska'},
    // {id:'at',name:'Österreich'},
    // {id:'be',name:'België'},
    // {id:'bg',name:'България'},
    // {id:'by',name:'Беларусь'},
    // {id:'ch',name:'Schweiz'},
    // {id:'cz',name:'Česká republika'},
    // {id:'de',name:'Deutschland'},
    // {id:'dk',name:'Danmark'},
    // {id:'es',name:'España'},
    // {id:'fi',name:'Suomi'},
    // {id:'fr',name:'France'},
    // {id:'hu',name:'Magyarország'},
    // {id:'is',name:'Ísland'},
    // {id:'it',name:'Italia'},
    // {id:'lt',name:'Lietuvos Respublika'},
    // {id:'lv',name:'Latvijas Republika'},
    // {id:'nl',name:'Nederland'},
    // {id:'no',name:'Norge'},
    // {id:'ro',name:'România'},
    // {id:'ru',name:'Россия'},
    // {id:'se',name:'Sverige'},
    // {id:'si',name:'Slovenija'},
    // {id:'sk',name:'Slovenská republika'},
    // {id:'ua',name:'Україна'},
    // // {id:'gb',name:'United Kingdom'}
  ];

  public getCountriesByLanguage(code: LanguageVersion): Country[] {
    if(code === LanguageVersion.EU) {
      return this.countriesEu
    }
    return this.countriesPl
  }

}

export interface Country {
  id: string;
  name: string;
}