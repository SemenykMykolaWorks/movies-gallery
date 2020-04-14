import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ROUTES_STRINGS } from '../../../constants/routing';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  public loginForm: FormGroup;
  @ViewChild('email') private usernameField: ElementRef;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private toastrService: ToastrService,
              private authService: AuthService) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        null,
        [Validators.email,  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl(null, Validators.required)
    });
  }

  public ngAfterViewInit(): void {
    this.usernameField.nativeElement.focus();
  }

  public registry(): void {
    this.router.navigate([ROUTES_STRINGS.REGISTER]);
  }

  public login(): void {
    const loginData = this.loginForm.getRawValue();
    this.loginForm.disable();
    this.authService.login(loginData).pipe(
      finalize(() => this.loginForm.enable())
    ).subscribe(item => {
      console.log(item);
    }, error => {
      if (!error.ok) {
        this.toastrService.error('404');
      }
    });
  }
}
