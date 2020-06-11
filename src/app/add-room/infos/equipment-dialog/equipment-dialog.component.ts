import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EquipmentService} from '../../../../services/equipment.service';
import {Observable} from 'rxjs';
import {Equipment} from '../../../../models/equipment';
import {isSelectedValidator} from '../../../../utils/validators';

@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrls: ['./equipment-dialog.component.scss']
})
export class EquipmentDialogComponent implements OnInit {
  formArray = new FormArray([]);
  equipments: Equipment[];
  equipments$: Observable<Equipment[]>;

  constructor(private matDialogRef: MatDialogRef<EquipmentDialogComponent>,
              private fb: FormBuilder,
              private equipmentService: EquipmentService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.equipments$ = this.equipmentService.findAll();
    this.initEquipment();
  }

  /**
   * Initialiser les équipements déjà séléctionnés dans une précédente dialog
   */
  initEquipment(): void {
    let equipments = this.data.equipments;
    if (equipments && equipments.length) {

      // Si équipements personnalisés ou pas on filtre pour n'afficher que la bonne catégorie
      equipments = this.data.custom ? equipments.filter(e => e.custom) : equipments.filter(e => !e.custom);

      // Si il y a des équipements à afficher on les insere dans les champs
      if (equipments.length) {
        equipments.forEach(e => this.formArray.push(this.createEquipmentForm(e)));
      } else {
        this.emptyEquipments();
      }
    } else {
      this.emptyEquipments();
    }
  }

  /**
   * Créer le formulaire d'équipement
   * @param equipment si un équipement est fourni
   */
  createEquipmentForm(equipment?: any): FormGroup {
    return this.fb.group({
      id: [equipment ? equipment.id : '', Validators.required],
      quantity: [equipment ? equipment.quantity : '', [Validators.min(1), Validators.required]],
      custom: [this.data.custom]
    });
  }

  /**
   * Créer un champ vide dans le FormArray
   */
  emptyEquipments(): void {
    this.formArray.push(this.createEquipmentForm());
  }

  /**
   * Ajouter un champ au FormArray suite au clique sur +
   */
  addEquipment() {
    const formGroup = this.createEquipmentForm();
    formGroup.controls.id.setValidators([Validators.required, isSelectedValidator(this.formArray)]);
    this.formArray.valid && this.formArray.push(formGroup);
  }

  /**
   * Supprimer un champ du FormArray suite au clique sur -
   * @param index la position du champ à supprimer
   */
  removeEquipment(index: number) {
    this.formArray.value.length > 1 && this.formArray.removeAt(index);
  }

  /**
   * Fermer la dialog
   */
  onSubmit() {
    this.formArray.valid && this.matDialogRef.close(this.formArray);
  }

  /**
   * Permettre une valeur par défaut
   * @param e1 l'id d'un équipement
   * @param e2 l'id d'un équipement
   */
  compareFn(e1: any, e2: any) {
    return e1 === e2;
  }

  /**
   * Accesseurs
   */
  get controls(): FormGroup[] {
    return this.formArray.controls as FormGroup[];
  }

}
