import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appMove]',
  standalone: true,
})
export class MoveDirective implements OnChanges {
  @Input('appMove') condition: boolean | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['condition']) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transition',
        'transform .4s'
      );
      this.renderer.setStyle(
        this.el.nativeElement,
        'transform',
        this.condition ? 'translateX(-300px)' : 'translateX(0)'
      );
    }
  }
}
