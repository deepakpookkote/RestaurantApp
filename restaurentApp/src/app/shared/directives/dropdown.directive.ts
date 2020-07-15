import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // @HostBinding('class.show') isOpen = false;
  // @HostListener('click') toggleOpen(){
  //   console.log('neeee')

  //   this.isOpen = !this.isOpen;
  // }

  // constructor() {
  //   console.log('nsss')
  // }

  @HostBinding('class.show') isShown = false;

  constructor(private elRef: ElementRef) { }

  @HostListener('document:click', ['$event']) toggleShow(eventData: Event) {
    this.isShown = this.elRef.nativeElement.contains(eventData.target) ? !this.isShown : false;
    if (this.isShown === true) {
      this.elRef.nativeElement.querySelector('.dropdown-menu').classList.add('show');
    } else {
      this.elRef.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    }

  }

}
