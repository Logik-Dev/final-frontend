import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../../services/notification.service';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private notification: NotificationService,
              public us: UserService) {
  }

  get photos() {
    return this.form.get('photos') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      photos: this.fb.array([], [Validators.required])
    });
  }

  addFile(event) {
    const file = event.target.files.item(0);
    if (file) {
      if (!this.isImage(file)) {
        this.notification.showError('Formats autorisés: jpg, jpeg, png');
      } else if (file.size / 1000 / 1024 > 2) {
        this.notification.showError('Taille maximale autorisée: 5MB');
      } else if (this.photos.length >= 6) {
        this.notification.showError('3 photos maximum autorisées');
      } else {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const control = new FormControl({file, url: e.target.result}, [Validators.required]);
          this.photos.push(control);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  deletePhoto(i: number) {
    this.photos.removeAt(i);
  }

  isImage(file: File) {
    const dotIndex = file.name.lastIndexOf('.') + 1;
    const extension = file.name.substr(dotIndex, file.name.length).toLowerCase();
    return extension === 'jpg' || extension === 'png' || extension === 'jpeg';
  }

  onFileClick() {
    this.fileInput.nativeElement.click();
  }
}
