import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoviesInfo } from '../../models/movies';
import { BASE_URL } from '../../constants/api';

@Injectable()
export class MoviesService {
  constructor(protected http: HttpClient) {
  }

  public getMoviestList(): Observable<MoviesInfo> {
    return this.http.get<MoviesInfo>(`${BASE_URL}/list`);
  }

  public getMovieId(id: number): Observable<MoviesInfo> {
    return this.http.get<MoviesInfo>(`${BASE_URL}/list/${id}`);
  }

}
