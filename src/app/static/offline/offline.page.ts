import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserSaveService } from 'src/app/shared/services/user.service';
import { SubSink } from 'subsink';



@Component({
  selector: 'mapy73pl-offline',
  templateUrl: 'offline.page.html',
  styleUrls: ['offline.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfflinePage implements OnInit {

  private subSink = new SubSink();

  
  constructor(
    private userSaveService: UserSaveService,
    private route: Router,
  ) {}

  ngOnInit() {
    this.subSink.sink = this.userSaveService.getObsOfflineReady().subscribe({next:(status) => {
      if(status === false) {
        this.route.navigate(['/mapa-przemiennikow']);
      }
    }})   
  }

}
