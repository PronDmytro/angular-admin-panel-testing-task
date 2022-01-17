import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
})
export class FrameComponent implements OnInit {

  public username = '';
  public shortUserName = '';

  constructor(
    private readonly authService: AuthService,
    private readonly dataService: DataService,
  ) {
  }

  public ngOnInit(): void {
    this.username = this.dataService.username;

    const tmp = this.username.split(' ');
    if (tmp.length === 1) {
      this.shortUserName = this.username[0];
    } else {
      this.shortUserName = tmp[0][0] + tmp[1][0];
    }
  }

  public async logout() {
    await this.authService.logout();
  }

}
