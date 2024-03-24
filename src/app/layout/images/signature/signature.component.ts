import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSignatureUrl } from '../../../configuration/store/configuration.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-signature',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgStyle],
  templateUrl: './signature.component.html',
  styleUrl: './signature.component.scss',
})
export class SignatureComponent {
  $signatureUrl: Observable<any> | undefined;
  @Input() height: string = '50px';
  @Input() width: string | undefined;

  constructor(private store: Store) {
    this.getUrls();
  }
  private getUrls(): void {
    this.$signatureUrl = this.store.select(getSignatureUrl);
  }
}
