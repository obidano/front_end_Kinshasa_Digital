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
      postnom: [this.data.postnom],
      phone: [this.data.phone, [Validators.required,
        Validators.pattern('^\\+243(89|88|90|81|84|99|97|82)\\d{7}')]],
      societe: [this.data.societe, Validators.required],
      email: [this.data.email, [Validators.required,
        Validators.pattern('[^@]+@[^@]+\\.[^@]+')]],
      anniversaire: [this.data.anniversaire, Validators.required],
    });
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  submitData() {
    const form = {...this.contactForm.value};

    form.anniversaire = this.formatDate(form.anniversaire);
    console.log('form', form);
    this.matDialogRef.close(form);
  }
}
