import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {FormContactsComponent} from "../../dialogs/form-contacts/form-contacts.component";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  searchForm: FormGroup;

  dataSource: MatTableDataSource<any> | null;
  displayedColumns = ['id', 'nom', 'prenom', 'postnom', 'phone', 'societe', 'email', 'anniversaire', 'actions'];
  dialogRef: any;

  constructor(private _fb: FormBuilder,
              public _matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.searchForm = this._fb.group({
      search: [],
    });
  }

  openContactForm() {
    this.dialogRef = this._matDialog.open(FormContactsComponent, {
      width: '700px',
      disableClose: true,
      data: {
        action: 'action'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(async response => {

        console.log('response');
      });
  }
}
