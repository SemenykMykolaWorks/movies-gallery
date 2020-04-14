import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistryComponent } from './registry.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

describe('RegistryComponent', () => {

  let fixture: ComponentFixture<RegistryComponent>;
  let registry: RegistryComponent;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      declarations: [RegistryComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        AuthService,
        LocalStorageService
      ]
    });
    fixture = TestBed.createComponent(RegistryComponent);
    registry = fixture.debugElement.componentInstance;
  }));

  it('should create the Registry', () => {
    expect(registry).toBeTruthy();
  });

});
