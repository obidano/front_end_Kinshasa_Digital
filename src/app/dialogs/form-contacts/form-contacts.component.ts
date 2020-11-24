import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-form-contacts',
  templateUrl: './form-contacts.component.html',
  styleUrls: ['./form-contacts.component.css']
})
export class FormContactsComponent implements OnInit {
  contactForm: FormGroup;
  action = '';
  data: any = {};

  constructor(public matDialogRef: MatDialogRef<FormContactsComponent>,
              @Inject(MAT_DIALOG_DATA) private _data: any,
              private _fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.contactForm = this._fb.group({
      nom: [this.data.nom, Validators.required],
      prenom: [this.data.prenom, Validators.required],
      postnom: [this.data.postnom, Validators.required],
      phone: [this.data.phone, Validators.required],
      societe: [this.data.societe, Validators.required],
      email: [this.data.email, Validators.required],
      anniversaire: [this.data.anniversaire, Validators.required],
    });
  }

  submitData() {
    const form = {...this.contactForm.value};
    console.log('form', form);

  }
}
