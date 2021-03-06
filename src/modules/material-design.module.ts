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
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatHeaderRowDef, MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const modules: any[] = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatIconModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatCarouselModule.forRoot(),
  MatStepperModule,
  MatSelectModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatTooltipModule,
  MatMenuModule,
  MatTabsModule,
  MatRippleModule,
  MatSidenavModule,
  MatTableModule,
  MatBadgeModule,
  MatDividerModule,
  MatListModule,
  MatSliderModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class MaterialDesignModule { }
