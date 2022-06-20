import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, scan } from 'rxjs/operators';
import { ReportOrderService } from 'src/app/report-order/report-order.service';
import { IAccount } from 'src/app/shared/models/accounts';
import { IReportOrder } from 'src/app/shared/models/IProduct';


@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss']
})
export class EditReportComponent implements OnInit {
  accountNumber: string;
  accountName: string;
  reportOrder: IReportOrder = <IReportOrder>{};
  flag_RFO = false;
  id: number = 0;
  customerName: string;
  branchName: string;
  accountNames: IAccount[] = [];
  _accountNames: any[] = [];



  constructor(private cd: ChangeDetectorRef, readonly sd: ScrollDispatcher, private toastr: ToastrService, private reportOrderService: ReportOrderService, private _bottomSheetRef: MatBottomSheetRef<EditReportComponent>) {
 
  }

  ngOnInit(): void {
    this.LoadAccountName();
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(this.id),
    SendTo: new FormControl(''),
    cc: new FormControl(''),
    type: new FormControl(''),
    accountNumber: new FormControl(''),
    periodfrom: new FormControl(''),
    periodto: new FormControl(''),
    ticketNumber: new FormControl(''),
    uploadFile: new FormControl(''),
    customerName: new FormControl('')

  });
  onSubmit() {

    if (this.form.valid) {
      this.reportOrder.id = this.form.value.id;
      this.reportOrder.sendTo = this.form.value.SendTo;
      this.reportOrder.ccTo = this.form.value.cc;
      this.reportOrder.accountNumber = this.form.value.accountNumber;
      this.reportOrder.periodFrom = this.form.value.periodfrom;
      this.reportOrder.periodTo = this.form.value.periodto;
      this.reportOrder.ticketNumber = 22;
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
      this.reportOrder.mailAttached = '';
      this.reportOrder.createdAt = localStorage.getItem('userName') + " ";
      this.reportOrder.reportClass = '';
      this.reportOrder.custReport = '';
      this.reportOrderService.insertReportOrder(this.reportOrder).subscribe(res => {
        this.onClose();
        this.toastr.success('Saved Successfully');
      }, error => {
        this.toastr.error(error.message)
      }
      );
    } else { this.toastr.error('Invalid Form') }
  }

  onClose() {

    this.form.reset();
    this._bottomSheetRef.dismiss();
  }

  OnChangePopName(event: any) {
    if (event.value === 'RFO') {
      this.flag_RFO = true;
    }
    else {
      this.flag_RFO = false;

    }
  }

  OnChangeBranchName(event: any) {
    this.branchName = event.value;
  }
  LoadAccountName() {
    this.reportOrderService.getAccounts().subscribe(res => {
      this.accountNames = res.data;
    });
  }

  OnFindCustomer() {
    debugger;
    this.reportOrderService.getAccountNameByNumber(this.accountNumber).subscribe(res => {
      this.accountName = res.data[0].accountNumber;
    })
  }

}
