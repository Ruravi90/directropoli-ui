import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  session:any;
  isCollapsed = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.session = this.authService.userValue();
  }

}
