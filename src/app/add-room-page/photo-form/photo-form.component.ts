import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      photos: this.fb.array([], [Validators.required])
    });
  }
  addFile(event) {
    const file = event.target.files.item(0);
    if (file && this.photos.value.length < 3) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const control = new FormControl({file, url: e.target.result}, [Validators.required]);
        this.photos.push(control);
      };
      reader.readAsDataURL(file);
    }
  }
  deletePhoto(i: number) {
    this.photos.removeAt(i);
  }

  get photos() {
    return this.form.get('photos') as FormArray;
  }
}
