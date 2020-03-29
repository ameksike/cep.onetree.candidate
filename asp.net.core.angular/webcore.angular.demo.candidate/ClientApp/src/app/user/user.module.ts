import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityComponent } from './component/identity/identity.component';
import { AccountComponent } from './component/account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountFormComponent } from './component/form/form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  declarations: [IdentityComponent, AccountFormComponent],
  exports: [IdentityComponent, AccountFormComponent]
})
export class UserModule { }
