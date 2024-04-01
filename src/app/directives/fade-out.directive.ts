import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appFadeOut]',
  standalone: true,
})
export class FadeOutDirective implements OnChanges {
  @Input('appFadeOut') condition: boolean | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['condition'] && this.condition) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transition',
        'all .4s ease-in-out'
      );

      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
      this.renderer.setStyle(this.el.nativeElement, 'left', '-150px');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 1s');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.el.nativeElement, 'left', '0');
    }
  }
}
