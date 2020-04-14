import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { AuthService } from '../../../root/services/auth.service';
import { LocalStorageService } from '../../../root/services/local-storage.service';
import { MoviesService } from '../../services/movies.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListComponent', () => {

  let fixture: ComponentFixture<ListComponent>;
  let list: ListComponent;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        LocalStorageService,
        MoviesService
      ]
    });
    fixture = TestBed.createComponent(ListComponent);
    list = fixture.debugElement.componentInstance;
  }));

  it('should create the List', () => {
    expect(list).toBeTruthy();
  });

  it(`should have as view 'column'`, () => {
    expect(list.view).toEqual('column');
  });

  it('should render title in a h3 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Movies Gallery');
  });

  // it('should get MoviestList if async', async(() => {
  //   const moviesService = fixture.debugElement.injector.get(MoviesService);
  //   spyOn(moviesService, 'getMoviestList').and.returnValue('');
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(list.moviesList).toEqual('');
  //   });
  // }));

});
