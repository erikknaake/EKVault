import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
  MatAccordion,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatOptionModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatDialogModule,
    // Material forms
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatTooltipModule,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatDialogModule,
    // Material forms
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule,
    MatExpansionModule
  ],
})
export class MaterialMdsModule {
}
