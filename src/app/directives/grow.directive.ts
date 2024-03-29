import {
  AnimationPlayer,
  AnimationBuilder,
  animate,
  style,
} from '@angular/animations';
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appGrow]',
  standalone: true,
})
export class GrowDirective implements OnInit {
  private player: AnimationPlayer | undefined;

  constructor(private builder: AnimationBuilder, private el: ElementRef) {}

  ngOnInit() {
    const factory = this.builder.build([
      style({ transform: 'scale(0.1)' }),
      animate('0.4s', style({ transform: 'scale(1.4)' })),
      animate('0.4s', style({ transform: 'scale(1)' })),
    ]);

    this.player = factory.create(this.el.nativeElement);
    this.player.play();
  }
}
