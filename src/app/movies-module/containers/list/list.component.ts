import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { MoviesInfo } from '../../../models/movies';
import { LocalStorageService } from '../../../root/services/local-storage.service';
import { EMAIL_KEY, USER_KEY } from '../../../constants/api';
import { AuthService } from '../../../root/services/auth.service';
import { ANIMATION_RIGHT_DIALOG } from '../../../constants/constants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [ANIMATION_RIGHT_DIALOG]
})
export class ListComponent implements OnInit {
  public moviesList: any;
  public moviesListTwo: any;
  public favoriteList: any = [];
  public moviesPopupsData: { name: number, data: MoviesInfo[] }[] = [];
  public view = 'column';
  public searchListGenres: any[] = [];
  public searchId: any[] = [];
  public selectGenre = new FormControl();
  public userName: string;
  public userEmail: string;

  constructor(public moviesService: MoviesService,
              public authService: AuthService,
              private localStorageService: LocalStorageService) {

  }

  // Generates lists of movies for the page with dynamic data.
  public ngOnInit(): void {
    this.moviesService.getMoviestList().subscribe( item => {
      this.moviesList  = item;
      const listGenres = [];
      this.moviesList.forEach( name => {
        name.genres.forEach( genre => {
          listGenres.push(genre.toUpperCase());
        });
      });
      this.moviesListTwo = this.moviesList;
      this.searchListGenres = listGenres.filter((item, index) => listGenres.indexOf(item) === index);
      this.updateFavoriteStorageList();
    });

    this.userName = this.localStorageService.get(USER_KEY);
    this.userEmail = this.localStorageService.get(EMAIL_KEY);
  }

  public logout() {
    this.authService.logout();
  }

  // Toggle column or list view page.
  public changeView(view: string): void {
    this.view = view;
  }

  public addFavoriteList(id: number, val: string): void {
    sessionStorage.setItem(id + '', val);
    this.favoriteList = [];
    this.updateFavoriteStorageList();
  }

  public removeFavoriteStar(): void {
    this.favoriteList = [];
    this.updateFavoriteStorageList();
  }

  // Filter genre by change select.
  public actionSelect(): void {
    const select = this.selectGenre.value;
    const selectId = [];
    if (select.length !== 0) {
      this.moviesList.forEach( item => {
        select.forEach( itemTwo => {
          const compare = item.genres.some((el) => el.toUpperCase() === itemTwo);
          if (compare) {
            selectId.push(item.id);
          }
        });
      });
      this.searchId = selectId.filter((item, index) => selectId.indexOf(item) === index);
      this.moviesListTwo = [];
      this.moviesList.forEach( item => {
        const compare = this.searchId.some((el) => el === item.id);
        if (compare) {
          this.moviesListTwo.push(item);
        }
      });
      this.removeFavoriteStar();
    } else {
      this.moviesListTwo = this.moviesList;
      this.removeFavoriteStar();
    }
  }

  public updateFavoriteStorageList(): void {
    this.moviesListTwo.forEach( key => {
      const favoriteStorageList = sessionStorage.getItem(key.id);
      this.favoriteList.push(favoriteStorageList);
    });
  }

  // Closes movies popup by items index.
  public closePopup(arr: any, index: number): void {
    arr.splice(index, 1);
  }

  // Handles movie item click event.
  public openPopup(id: number): void {
    const exist = this.moviesPopupsData.find(({ name }) => name === id);
    if (!exist) {
      const item = {
        name: id,
        data: []
      };
      this.fetchMoviesData(item);
    }
  }

  // Fetches detailed data for Movies popup.
  private fetchMoviesData(item: { name: number, data: MoviesInfo[] }): void {
    this.moviesService.getMovieId(item.name).subscribe( el => {
      item.data.push(el);
      this.moviesPopupsData.push(item);
    });
  }

}
