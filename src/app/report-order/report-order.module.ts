import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportOrderComponent } from './report-order.component';
import { SharedModule } from '../shared/shared.module';
import { ReportOrderService } from './report-order.service';
import { NotificationMsgService } from './notification-msg.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../shared/modules/material/material.module';

@NgModule({
  declarations: [
    ReportOrderComponent
  ],
  imports: [
    CommonModule,
    // MatPaginatorModule,
     SharedModule,
    // MatCardModule,
    // MatTableModule,
    // MatSnackBarModule
    MaterialModule

  ],
  providers: [ReportOrderService,NotificationMsgService],
  exports:[   MatTableModule,MatPaginatorModule,ReportOrderComponent,MatSnackBarModule]
})
export class ReportOrderModule { }
