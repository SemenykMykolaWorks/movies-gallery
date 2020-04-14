import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ROUTES_STRINGS } from '../../../constants/routing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit, AfterViewInit {
  public registerForm: FormGroup;
  @ViewChild('email') private usernameField: ElementRef;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private toastrService: ToastrService,
              private authService: AuthService) {}

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(
        null,
        [Validators.email,  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required)
    });
  }

  public ngAfterViewInit(): void {
    this.usernameField.nativeElement.focus();
  }

  public login(): void {
    this.router.navigate([ROUTES_STRINGS.LOGIN]);
  }

  public register(): void {
    const registerData = this.registerForm.getRawValue();
    this.registerForm.disable();
    this.authService.registerUser(registerData).pipe(
      finalize(() => this.registerForm.enable())
    ).subscribe( item => {
      console.log(item);
    }, error => {
      if (!error.ok) {
        this.toastrService.error('404');
      }
    });
  }
}
