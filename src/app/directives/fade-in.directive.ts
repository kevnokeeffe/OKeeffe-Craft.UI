import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appFadeIn]',
  standalone: true,
})
export class FadeInDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 1s');
    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    }, 0);
  }
}
