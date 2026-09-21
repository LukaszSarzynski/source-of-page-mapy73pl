import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'm73pl-repeater-notice',
  templateUrl: './repeater-notice.component.html',
  styleUrls: ['./repeater-notice.component.scss'],
  standalone: false,
})
export class RepeaterNoticeComponent  implements OnInit {

  chanels: DiscordChanel[] = [
    {chanel: '(tymczasowo) h-f-t-e', link: 'https://discord.com/channels/958356886896386088/1146070821526306890'}, //0
    {chanel: 'sp1-zachodniopomorskie', link: 'https://discord.com/channels/958356886896386088/959338235341983744'}, //1
    {chanel: 'sp2-pomorskie_kujawsko-pomorskie', link: 'https://discord.com/channels/958356886896386088/959337774480244776'}, //2
    {chanel: 'sp3-lubuskie_wielkopolskie', link: 'https://discord.com/channels/958356886896386088/959338192300048414'}, //3
    {chanel: 'sp4-warmińsko-mazurskie_podlaskie', link: 'https://discord.com/channels/958356886896386088/959338164361769000'}, //4
    {chanel: 'sp5-mazowieckie', link: 'https://discord.com/channels/958356886896386088/959337978235355170'}, //5
    {chanel: 'sp6-dolnośląskie_opolskie', link: 'https://discord.com/channels/958356886896386088/959337726782611486'}, //6
    {chanel: 'sp7-łódzkie_świętokrzyskie', link: 'https://discord.com/channels/958356886896386088/959337880952643595'}, //7
    {chanel: 'sp8-lubelskie_podkarpackie', link: 'https://discord.com/channels/958356886896386088/959338023286366240'}, //8
    {chanel: 'sp9-małopolskie_śląskie', link: 'https://discord.com/channels/958356886896386088/959338089258573884'}, //9
  ]

  showInstruction = false
  idChanel = 0;

  @Input() i = ''

  constructor() { }

  ngOnInit() {
    
    if(this.i.length > 3 ) {
      const prefix = this.i.substring(0,3)
      switch (prefix) {
        case 'SR1':
          this.idChanel = 1;
          break;
        case 'SR2':
          this.idChanel = 2;
          break;
        case 'SR3':
          this.idChanel = 3;
          break;
        case 'SR4':
          this.idChanel = 4;
          break;
        case 'SR5':
          this.idChanel = 5;
          break;
        case 'SR6':
          this.idChanel = 6;
          break;
        case 'SR7':
          this.idChanel = 7;
          break;
        case 'SR8':
          this.idChanel = 8;
          break;
        case 'SR9':
          this.idChanel = 9;
          break;
      
        default:
          this.idChanel = 0;
          break;
      }
    }
    
  }

}

interface DiscordChanel {
  chanel: string;
  link: string;
}