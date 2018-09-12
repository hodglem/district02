import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})


export class NumberOnlyDirective {
  @Input() numberOnly: boolean;
  private regex: RegExp = new RegExp(/^\$?[0-9]+(\.[0-9]*)?$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    if (event.keyCode === 37 || event.keyCode === 39) {
      return;
    }

    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
