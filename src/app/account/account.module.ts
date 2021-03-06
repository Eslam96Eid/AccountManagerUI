import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../shared/modules/material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    // AccountRoutingModule,
    NgxSpinnerModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
   MaterialModule,
   RouterModule
  
  ],
  exports:[RouterModule]
})
export class AccountModule { }
