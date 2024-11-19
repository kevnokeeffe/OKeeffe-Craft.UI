import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ContactMessageModel } from '../../models/contact-message.model';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Utils } from '../../../utilities/utils';
import { EmailDetailsDialogComponent } from '../../dialogs/email-details-dialog/email-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-messages-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
  ],
  templateUrl: './contact-messages-table.component.html',
  styleUrl: './contact-messages-table.component.scss',
})
export class ContactMessagesTableComponent implements OnChanges, AfterViewInit {
  displayedColumns: string[] = ['subject', 'email', 'message', 'createdDate'];
  @Input() contactMessages: ContactMessageModel[] | undefined;
  dataSource: MatTableDataSource<ContactMessageModel> =
    new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  private dialog: MatDialog = inject(MatDialog);

  ngAfterViewInit(): void {
    this.populateTable();
  }

  maskString(value: string): string {
    return Utils.maskString(value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contactMessages'] && changes['contactMessages'].currentValue) {
      this.populateTable(changes['contactMessages'].currentValue);
    }
  }

  populateTable(
    contactMessages: ContactMessageModel[] = this.contactMessages ?? []
  ) {
    this.dataSource = new MatTableDataSource(contactMessages);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
    this.sort?.sort({ id: 'id', start: 'desc', disableClear: true });
  }

  openMessageDetails(contactMessage: ContactMessageModel) {
    this.dialog.open(EmailDetailsDialogComponent, {
      data: contactMessage,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
