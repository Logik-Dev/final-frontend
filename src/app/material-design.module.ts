import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCarouselModule} from '@ngmodule/material-carousel';


const modules: any[] = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatIconModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatCarouselModule.forRoot()
];
@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class MaterialDesignModule { }
