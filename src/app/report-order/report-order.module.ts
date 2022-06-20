import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReportOrderService } from './report-order.service';
import { NotificationMsgService } from './notification-msg.service';
import { MaterialModule } from '../shared/modules/material/material.module';

@NgModule({
  declarations: [
    // ReportOrderComponent
  ],
  imports: [
    CommonModule,
   
     SharedModule,
   
    MaterialModule

  ],
  providers: [ReportOrderService,NotificationMsgService],
  // exports:[   MatTableModule,MatPaginatorModule,ReportOrderComponent,MatSnackBarModule]
})
export class ReportOrderModule { }
