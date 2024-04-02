import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationActions } from '../store/authentication.actions';
import { AccountsActions } from '../../accounts/store/accounts.actions';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}
  ngOnInit(): void {
    this.router.navigate(['/']);
    this.store.dispatch(AuthenticationActions.logout());
    this.store.dispatch(AuthenticationActions.clearAll());
    this.store.dispatch(AccountsActions.clearAll());
  }
}
