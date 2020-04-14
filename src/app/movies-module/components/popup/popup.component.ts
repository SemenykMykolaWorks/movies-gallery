import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  private static globalIndex = 100;
  public maxPopupZindex = 9999;
  public zIndex: number;
  @Output() public changeClose: EventEmitter<void> = new EventEmitter();
  @ViewChild('rootElement', { static: true }) public rootElement: ElementRef;
  @ViewChild('invisibleFocus', { static: false }) private invisibleFocusElement: ElementRef;
  private isFocused = true;


  public ngOnInit(): void {
    this.zIndex = this.maxPopupZindex;
  }

  public onCloseClick(e: Event): void {
    this.changeClose.emit();
    e.stopPropagation();
    e.preventDefault();
  }

  private getNewZIndex(): void {
    this.zIndex = PopupComponent.globalIndex++;
    if (this.zIndex === (this.maxPopupZindex - 1)) {
      PopupComponent.globalIndex = 100;
    }
  }

  @HostListener('document:focusin', ['$event'])
  private onFocus(e: Event): void {
    if (e.target !== this.rootElement.nativeElement && !this.rootElement.nativeElement.contains(e.target)) {
      this.isFocused = false;
      return;
    }
    if (!this.isFocused) {
      this.isFocused = true;
      this.getNewZIndex();
    }
  }

}
