import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnChanges {
  public favoriteData: any = [];
  @Input() public moviesData: any;
  @Input() public favoriteList: any;
  @Output() public changeDelete: EventEmitter<void> = new EventEmitter();

  ngOnChanges(): void {
    const favoriteStorageList = [];
    if (this.moviesData) {
      this.moviesData.forEach( key => {
        favoriteStorageList.push(sessionStorage.getItem(key.id));
        this.favoriteData = favoriteStorageList.filter((item) => item !== null);
      });
    }
  }

  public deleteList(name: string): void {
    const favoriteStorageList = [];
    this.moviesData.forEach( item => {
      if (name === item.name) {
        sessionStorage.removeItem(item.id + '');
      }
      favoriteStorageList.push(sessionStorage.getItem(item.id));
      this.favoriteData = favoriteStorageList.filter((item) => item !== null);
    });
    this.changeDelete.emit();
  }
}
