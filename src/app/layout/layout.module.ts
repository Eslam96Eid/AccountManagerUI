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
import { SectionHeaderComponent } from 'src/app/core/section-header/section-header.component';
import { SharedModule } from '../shared/shared.module';
import { NavBarComponent } from 'src/app/core/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/modules/material/material.module';



@NgModule({
  declarations: [
    LayoutComponent,
    
   
 

  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
   BrowserModule,
  //  AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
     CoreModule,
    HomeModule,
    ReportOrderModule,
    SharedModule,
    RouterModule,
   ReportOrderModule,
   MaterialModule
    
  ]
})
export class LayoutModule { }
