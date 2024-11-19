import { Component, inject, OnInit } from '@angular/core';
import { ContactMessagesTableComponent } from './contact-messages-table/contact-messages-table.component';
import { Store } from '@ngrx/store';
import { ContactMessageModel } from '../models/contact-message.model';
import { Observable } from 'rxjs';
import { getContactMessages } from '../store/accounts.selectors';
import { ServiceResponseModel } from '../../models/service-response.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { AccountsActions } from '../store/accounts.actions';

@Component({
  selector: 'app-contact-messages',
  standalone: true,
  imports: [ContactMessagesTableComponent, AsyncPipe, NgIf],
  templateUrl: './contact-messages.component.html',
  styleUrl: './contact-messages.component.scss',
})
export class ContactMessagesComponent implements OnInit {
  private store: Store<any> = inject(Store);
  public contactMessages$:
    | Observable<ServiceResponseModel<ContactMessageModel[]> | null>
    | undefined;

  ngOnInit(): void {
    this.store.dispatch(AccountsActions.getContactMessages());
    this.contactMessages$ = this.store.select(getContactMessages);
  }
}
