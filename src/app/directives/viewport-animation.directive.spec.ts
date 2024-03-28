import { ViewportAnimationDirective } from './viewport-animation.directive';
import { ElementRef, Renderer2 } from '@angular/core'; // Import Renderer2
describe('ViewportAnimationDirective', () => {
  it('should create an instance', () => {
    const directive = new ViewportAnimationDirective(
      new ElementRef(null),
      null as unknown as Renderer2
    ); // Pass an instance of Renderer2
    expect(directive).toBeTruthy();
  });
});
