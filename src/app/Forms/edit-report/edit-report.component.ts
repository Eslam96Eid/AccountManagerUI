import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ToastrService } from 'ngx-toastr';
import { ReportOrderService } from 'src/app/report-order/report-order.service';
import { IReportOrder } from 'src/app/shared/models/IProduct';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit {
  reportOrder: IReportOrder = <IReportOrder>{};
  flag_RFO = false;
  id: number = 0;
  customerName : string;
  branchName : string;
  constructor(private toastr : ToastrService , private reportOrderService: ReportOrderService , private _bottomSheetRef: MatBottomSheetRef<EditReportComponent>) { }

  ngOnInit(): void {
  }


  form: FormGroup = new FormGroup({
    
    id: new FormControl(this.id),
    sendTo: new FormControl(''),
    cc: new FormControl(''),
    type: new FormControl(''),
    accountNumber: new FormControl(''),
    periodfrom: new FormControl(''),
    periodto: new FormControl(''),
    ticketNumber: new FormControl(''),
    uploadFile:new FormControl('')
    
    });
  onSubmit(){
    debugger;
    if (this.form.valid) {
    

      this.reportOrder.id = this.form.value.id;
      this.reportOrder.sendTo = this.form.value.sendTo;
      this.reportOrder.ccTo =this.form.value.cc;
      this.reportOrder.accountNumber = this.form.value.accountNumber;
      this.reportOrder.periodFrom =this.form.value.periodfrom;
      this.reportOrder.periodTo =this.form.value.periodto;
      this.reportOrder.ticketNumber =22;
      this.reportOrder.creationDate = new Date();
      this.reportOrder.createdBy = localStorage.getItem('userName') + " ";
      this.reportOrder.updateDate = new Date();
      this.reportOrder.isDeleted = false;
      this.reportOrder.updatedBy = '';
      this.reportOrder.orderedBy = '';
      this.reportOrder.customerName = this.customerName;
      this.reportOrder.branch = this.branchName;
      this.reportOrder.reportType = '';
      this.reportOrder.reportStatus = '';
      this.reportOrder.reportUrl = this.form.value.uploadFile;
      this.reportOrder.orderNumber = 0;
      this.reportOrder.mailAttached ='';
      this.reportOrder.createdAt = localStorage.getItem('userName') + " ";
      this.reportOrder.reportClass = '';
      this.reportOrder.custReport = '';
      console.log(this.reportOrder);
      this.reportOrderService.insertReportOrder(this.reportOrder).subscribe(res => {
        this.onClose();
        this.toastr.success('Saved Successfully');
      }, error => {
        this.toastr.error(error.message)
      }
      );
    }else{ this.toastr.error('Invalid Form')}
    }
  
  onClose(){
   
    this.form.reset();
   this._bottomSheetRef.dismiss();
  }

  OnChangePopName(event: any) {
   console.log(event.value);
   if(event.value === 'RFO')
   {
       this.flag_RFO = true;
   }
   else{
    this.flag_RFO = false;

   }
  }
  OnChangeCustomerName(event: any) {
    this.customerName = event.value ;
   }
   OnChangeBranchName(event: any) {
    this.branchName = event.value ;
   }
}
