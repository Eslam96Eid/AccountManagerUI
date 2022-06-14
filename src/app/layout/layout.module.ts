import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerComponent, NgxSpinnerModule } from 'ngx-spinner';
import { HomeModule } from 'src/app/home/home.module';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReportOrderModule } from 'src/app/report-order/report-order.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/modules/material/material.module';
import { ReportOrderComponent } from '../report-order/report-order.component';



@NgModule({
  declarations: [
    LayoutComponent
    
   
 

  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
   BrowserModule,
  //  AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
     CoreModule,
    ReportOrderModule,
    SharedModule,
    RouterModule,
   ReportOrderModule,
   MaterialModule
    
  ],
  exports:[ReportOrderModule,ReportOrderComponent]
})
export class LayoutModule { }
