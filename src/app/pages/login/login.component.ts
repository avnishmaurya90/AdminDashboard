import { Panel } from './../../model/panel';
import { PanelService } from './../../services/panel.service';
import { NavItemsService } from 'src/app/services/nav-items.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../../model/login';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginDetails: Login;
  fbToken: any;
  isLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private panelService: PanelService,
    private toastrService: ToastrService,
    private navItemsService: NavItemsService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.messageService.getToken().then(token => {
      this.fbToken = token;
    });
  }

  login() {
    this.isLoading = true;

    if (!this.loginForm.controls['username'].value) {
      this.isLoading = false;
      return this.toastrService.error('Enter email/mobile', '', { timeOut: 3000 });

    }
    if (!this.loginForm.controls['password'].value) {
      this.isLoading = false;
      return this.toastrService.error('Enter password', '', { timeOut: 3000 });

    }

    const details = {
      email: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,
      device: {
        type: 'web',
        token: this.fbToken
      }
    };

    this.loginDetails = new Login(details);
    this.panelService.adminLogin(this.loginDetails)
      .subscribe((panel: Panel) => {
        this.isLoading = false;
        this.toastrService.success('Login Successfully', '', { timeOut: 3000 });
        const userType = panel.authorization;
        localStorage.setItem('token', panel.token);
        localStorage.setItem('userType', userType);
        this.navItemsService.updateNavItemsList(userType);
        switch (userType) {
          case 'admin':
            localStorage.setItem('user', JSON.stringify(panel));
            return this.router.navigate(['/home']);
          case 'vendor':
            localStorage.setItem('vendor', JSON.stringify(panel));
            return this.router.navigate(['/vendors/home']);
        }
      }, (err) => {
        this.isLoading = false;
        this.toastrService.error(err, '', { timeOut: 3000 });
      });
  }
}
