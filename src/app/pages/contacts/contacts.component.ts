import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  searchForm: FormGroup;

  dataSource: MatTableDataSource<any> | null;
  displayedColumns = ['id', 'nom', 'prenom', 'postnom', 'phone', 'societe', 'email', 'anniversaire', 'actions'];

  constructor(private _fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.searchForm = this._fb.group({
      search: [],
    });
  }

}
