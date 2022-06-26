import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, scan } from 'rxjs/operators';
import { ReportOrderService } from 'src/app/report-order/report-order.service';
import { IAccount } from 'src/app/shared/models/accounts';
import { IBranch } from 'src/app/shared/models/branch';
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
  branches:IBranch


  viewaccountNames : IAccount[] = []; 
  private readonly RELOAD_TOP_SCROLL_POSITION = 100;
  @ViewChild('accountNameSelect') selectElem : MatSelect ;
_startIndex = 0;
_endIdex = 10;



  constructor(private cd: ChangeDetectorRef, readonly sd: ScrollDispatcher, private toastr: ToastrService, private reportOrderService: ReportOrderService, private _bottomSheetRef: MatBottomSheetRef<EditReportComponent>) {
    this.LoadAccountName();
  }
  ngAfterViewInit() {
    this.selectElem.openedChange.subscribe(() => this.registerPanelScrollEvent());
  }
  ngOnInit(): void {

  
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  emailPattern= "(([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)(\s*,\\s*|\\s*$))*";
  form: FormGroup = new FormGroup({
    id: new FormControl(this.id),
    SendTo: new FormControl('', [Validators.required,Validators.pattern(this.emailPattern)]),
    cc: new FormControl('', [Validators.required,Validators.pattern(this.emailPattern)]),
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
      this.viewaccountNames= this.accountNames.slice(this._startIndex,this._endIdex);
    });

  }

  OnFindCustomer() {
    this.reportOrderService.getAccountNameByNumber(this.accountNumber).subscribe(res => {
      this.viewaccountNames.push( res.data[0])
      this.accountName = res.data[0].accountNumber;
     this.reportOrderService.getAccountBranches(res.data[0].accountName).subscribe(response =>{
      console.log(response.data);
      this.branches = response.data;
     })
    })
  }

  

  registerPanelScrollEvent() {
    let panel = this.selectElem.panel.nativeElement;
     panel.addEventListener('scroll', event => this.loadAllOnScroll(event));
  }

  loadAllOnScroll(event) {
    debugger;
    if (event.target.scrollTop > this.RELOAD_TOP_SCROLL_POSITION) {
      this.viewaccountNames  = [...this.viewaccountNames, ...this.accountNames.slice(this._startIndex + 10 ,this._endIdex + 10 )];
    }
  }

  reset() {
    this.viewaccountNames = this.accountNames.slice(0, 10);
  }

}
