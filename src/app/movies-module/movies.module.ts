import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoviesRoutingModule } from './movies-routing.module';
import { PopupComponent } from './components/popup/popup.component';
import { ListComponent } from './containers/list/list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesService } from './services/movies.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { MoviesComponent } from './containers/movies/movies.component';

@NgModule({
  declarations: [
    PopupComponent,
    ListComponent,
    FavoriteListComponent,
    MoviesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MoviesRoutingModule,
    MatFormFieldModule,
    DragDropModule,
    MatSelectModule
  ],
  exports: [],
  providers: [
    MoviesService
  ]
})
export class MoviesModule {}
