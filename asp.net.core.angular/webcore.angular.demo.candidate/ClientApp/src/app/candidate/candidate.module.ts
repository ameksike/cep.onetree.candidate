import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './component/list/list.component';
import { FormComponent } from './component/form/form.component';
import { DetailsComponent } from './component/details/details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ListComponent, FormComponent, DetailsComponent],
  exports: [ListComponent, FormComponent, DetailsComponent]
})
export class CandidateModule { }
