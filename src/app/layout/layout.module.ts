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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home/home.component';
import { ReportOrderService } from '../report-order/report-order.service';
import { NotificationMsgService } from '../report-order/notification-msg.service';
import { AppRoutingModule } from '../app-routing.module';
import { EditReportComponent } from '../Forms/edit-report/edit-report.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NavBarComponent } from '../core/nav-bar/nav-bar.component';
import { SectionHeaderComponent } from '../core/section-header/section-header.component';
import { TestErrorComponent } from '../core/test-error/test-error.component';
import { NotFoundComponent } from '../core/not-found/not-found.component';
import { ServerErrorComponent } from '../core/server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    LayoutComponent,
    NavBarComponent,
    SectionHeaderComponent,
     TestErrorComponent,
      NotFoundComponent,
     ServerErrorComponent, 
    HomeComponent,
    ReportOrderComponent,
    EditReportComponent,
   
   
 

  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    AppRoutingModule,
   BrowserModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    HttpClientModule,
     //CoreModule,
    SharedModule,
    RouterModule,
   MaterialModule,
   FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
    
    
  ],
  providers: [ReportOrderService,NotificationMsgService],
  // exports:[ReportOrderModule,ReportOrderComponent]
})
export class LayoutModule { }
