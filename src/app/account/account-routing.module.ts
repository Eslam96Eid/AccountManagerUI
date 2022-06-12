import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AccountRoutingModule { }
