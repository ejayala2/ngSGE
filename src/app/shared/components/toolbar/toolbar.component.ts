import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public appName = 'SGE';
  
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public authSvc: AuthService) { }

  ngOnInit() {
  }
  
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  onLogout(): void{
    this.authSvc.logout();
  }
}
