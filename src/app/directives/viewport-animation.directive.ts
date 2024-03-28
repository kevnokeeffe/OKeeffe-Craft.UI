import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appViewportAnimation]',
  standalone: true,
})
export class ViewportAnimationDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'fade-in');
          this.renderer.removeClass(this.el.nativeElement, 'fade-out');
          observer.unobserve(entry.target);
        } else {
          this.renderer.addClass(this.el.nativeElement, 'fade-out');
          this.renderer.removeClass(this.el.nativeElement, 'fade-in');
        }
      });
    });
    observer.observe(this.el.nativeElement);
  }
}
