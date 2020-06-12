import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {NotificationService} from '../../../services/notification.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  formArray = new FormArray([], this.enoughPhotos());

  constructor(private fb: FormBuilder,
              private notification: NotificationService,
              public us: UserService) {
  }

  ngOnInit(): void {
  }

  /**
   * Ajouter une photo au FormArray
   * @param event l'évènement contenant le fichier
   */
  addFile(event) {
    const file = event.target.files.item(0);
    if (this.isValid(file)) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const control = new FormControl({file, url: e.target.result}, [Validators.required]);
        this.formArray.push(control);
      };
      reader.readAsDataURL(file);
    }

  }

  /**
   * Vérifier la validité d'une photo
   * @param file le fichier à vérifier
   */
  isValid(file: File): boolean {
    if (file) {
      // Vérifier l'extension
      if (!this.isImage(file)) {
        this.notification.showError('Formats autorisés: jpg, jpeg, png');
        return false;

        // Vérifier la taille
      } else if (file.size / 1000 / 1024 > 2) { // Taille
        this.notification.showError('Taille maximale autorisée: 5MB');
        return false;

        // Vérifier le nombre de photos
      } else if (this.formArray.length >= 6) {
        this.notification.showError('6 photos maximum autorisées');
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  /**
   * Supprimer une photo du FormArray
   * @param index la position de la photo dans le FormArray
   */
  deletePhoto(index: number) {
    this.formArray.removeAt(index);
  }

  /**
   * Vérifier si le fichier est une image
   * @param file le fichier à vérifier
   */
  isImage(file: File): boolean {
    const dotIndex = file.name.lastIndexOf('.') + 1;
    const extension = file.name.substr(dotIndex, file.name.length).toLowerCase();
    return extension === 'jpg' || extension === 'png' || extension === 'jpeg';
  }

  /**
   * Simuler le clique
   */
  onFileClick(): void {
    this.fileInput.nativeElement.click();
  }

  enoughPhotos(): ValidatorFn {
    return (array: FormArray): ValidationErrors | null => {
      return array.value.length < 3 ? {notEnoughPhotos: true} : null;
    };
  }
}
