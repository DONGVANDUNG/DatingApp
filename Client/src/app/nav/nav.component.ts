import { Router } from '@angular/router';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}
  login() {
    this.accountService.login(this.model).subscribe((reponse) => {
      this.router.navigateByUrl('/members'); //định nghĩa đường link sau đó truy cập bên html
    });
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/'); //định nghĩa đường link sau đó truy cập bên html
  }
}
