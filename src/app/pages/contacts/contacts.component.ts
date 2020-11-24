import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {FormContactsComponent} from "../../dialogs/form-contacts/form-contacts.component";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

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
  onDataChanged: BehaviorSubject<any>;

  private _unsubscribeAll: Subject<any>;

  selected = {};

  @ViewChild('confirmDeleteDialog') confirmDeleteDialog: TemplateRef<any>;

  constructor(private _fb: FormBuilder,
              public _matDialog: MatDialog,
              private _httpClient: HttpClient) {
    this.onDataChanged = new BehaviorSubject([]);
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.searchForm = this._fb.group({
      search: [],
    });
    this.getData();
  }

  getData() {
    this.dataSource = new MatTableDataSource<any>(this.onDataChanged.value);
    this.onDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((datas: any) => {
        this.dataSource = new MatTableDataSource<any>(this.onDataChanged.value);
      });

    this.httpGetData();
  }


  httpGetData(): Promise<any> {

    this.onDataChanged.next([]);

    return new Promise((resolve, reject) => {
        this._httpClient.get('http://127.0.0.1:8000/contacts/all')
          .subscribe((response: any) => {
            console.log('http', response)
            this.onDataChanged.next(response.msg);
            resolve(response);
          }, reject);
      }
    );
  }


  openContactForm(action = 'new', data = null) {
    this.dialogRef = this._matDialog.open(FormContactsComponent, {
      width: '700px',
      disableClose: true,
      data: {
        action: action,
        data: data
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(async response => {

        console.log('response', response);

        switch (action) {
          case "new":
            await new Promise((resolve, reject) => {
              this._httpClient.post('http://127.0.0.1:8000/contacts/create', response)
                .subscribe((response: any) => {
                  resolve(response);
                }, reject);
            });

            this.httpGetData();
            break;

          case 'update':
            await new Promise((resolve, reject) => {
              this._httpClient.post('http://127.0.0.1:8000/contacts/update', response)
                .subscribe((response: any) => {
                  resolve(response);
                }, reject);
            });

            this.httpGetData();
            break;
        }


      });
  }

  deleteDialog(data) {
    this.selected = data;
    const dialogRef = this._matDialog.open(this.confirmDeleteDialog);
    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        if (result === 'yes') {
          await new Promise((resolve, reject) => {
            this._httpClient.post('http://127.0.0.1:8000/contacts/delete/' + data.id, {})
              .subscribe((response: any) => {
                resolve(response);
              }, reject);
          });

          this.httpGetData();
        } else if (result === 'no') {

        }
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
