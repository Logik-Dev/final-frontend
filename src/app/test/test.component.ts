import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatListOption} from '@angular/material/list';

interface Critere {
  id: number;
  nom: string;
}
const CRITERES_DATA = [
  {id: 0, nom: 'renouvellement'},
  {id: 1, nom: 'carte navigo' },
  {id: 2, nom: 'carte bleu'},
  {id: 3, nom: 'achat'}
]

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  searchInput = new FormControl('');
  criteres: Critere[] = CRITERES_DATA;
  selectedCriteres: number[] = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchInput.valueChanges.subscribe(
      value => this.findCritere(value)
    );
  }

  findCritere(nom: string){
    this.criteres = CRITERES_DATA.filter(c => c.nom.includes(nom));

  }

  selectionChange(selected: MatListOption[]) {
    // On met tout les éléments séléctionné si il ne
    // sont pas déjà dans la liste des éléments sléctionnés
    selected.forEach(s => {
      if (!this.selectedCriteres.includes(s.value)) {
        this.selectedCriteres.push(s.value);
      }
    });
    // liste des id séléctionné dans la page courante
    const selectedIDs = selected.map(s => s.value);
    // liste de tout les id de la page courante
    const allIds = this.criteres.map(c => c.id);

    // on retire les éléments de la liste de séléction si il ne sont pas checké
    allIds.forEach(id => {
      if(!selectedIDs.includes(id) && this.selectedCriteres.includes(id)) {
        this.selectedCriteres.splice(this.selectedCriteres.indexOf(id), 1);
      }
    });
    console.log(this.selectedCriteres);
  }
}
