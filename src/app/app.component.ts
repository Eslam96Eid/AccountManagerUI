import { Component,OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AccountService } from './account/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  // title = 'SkiNet';

  constructor( private accountService: AccountService,private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    // this.loadCurrentUser();
  }

  // loadCurrentUser() {
  //   const token = localStorage.getItem('token');
  //   this.accountService.loadCurrentUser(token).subscribe(() => {
  //     console.log('loaded user');
  //   }, error => {
  //     console.log(error);
  //   })
  // }

}
