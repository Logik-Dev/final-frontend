import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  form: FormGroup;
  selectedType = {id: 2, libelle: 'typenumero2'};
  types = [
    {id: 1, libelle: 'typenumero1'},
    {id: 2, libelle: 'typenumero2'},
    {id: 3, libelle: 'typenumero3'}
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: this.selectedType
    });
  }
  compareFn(type1: any, type2: any) {
    return type1.id === type2.id;
  }
  onSubmit() {
    console.log(this.form.controls.type.value);
  }
}
