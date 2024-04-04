import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appViewportAnimation]',
  standalone: true,
})
export class ViewportAnimationDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Add the 'observe' class to the element
    this.renderer.addClass(this.el.nativeElement, 'observe');
    this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
  }

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(element, 'fade-in');
            this.renderer.setStyle(element, 'visibility', 'visible');
            observer.disconnect(); // Stop observing all entries
          } else {
            this.renderer.removeClass(element, 'fade-in');
            this.renderer.setStyle(element, 'visibility', 'hidden');
          }
        });
      },
      { rootMargin: '0px 0px -100px 0px' }
    ); // Adjust rootMargin as needed

    observer.observe(element);
  }
}
