import { Component, OnInit, ViewChild } from '@angular/core';
import { IReportOrder } from '../shared/models/IProduct';
import { ReportOrderParams } from '../shared/models/shopParams';
import { ReportOrderService } from './report-order.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificationMsgService } from './notification-msg.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditReportComponent } from '../Forms/edit-report/edit-report.component';
@Component({
  selector: 'app-report-order',
  templateUrl: './report-order.component.html',
  styleUrls: ['./report-order.component.scss']
})
export class ReportOrderComponent implements OnInit {

  searchKey:string ='' ;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  displayedColumns: string[] = ['id', 'orderedBy', 'customerName', 'accountNumber' , 'branch' ,'ticketNumber','reportType', 'periodFrom' , 'periodTo' ,'reportStatus','sendTo','ccTo', 'createdAt' , 'reportClass','report','customReport'];
  dataSource = new MatTableDataSource<any>();

  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  searchData: string = '';
  reportOrders: any[] = [];
  shopParams: ReportOrderParams;
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ]
  constructor(private reportOrderService: ReportOrderService, public notificationService: NotificationMsgService, private _bottomSheet: MatBottomSheet ) {
    this.shopParams = this.reportOrderService.getShopParams();
  }

  ngOnInit(): void {
    this.getReportOrders(1, 25, this.searchData, this.sortColumnDef, this.SortDirDef);
  }
  getReportOrders(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.reportOrderService.getReportOrder(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      debugger;
      console.log(response);
      this.reportOrders = response.data;
      this.totalCount = response.count;
      this.reportOrders.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.reportOrders);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    }, error => {
      console.log(error);
    })
  }

  //this section for pagination 
  panelOpenState = false;
  pageIn = 0;
  previousSizedef = 25;
  pagesizedef: number = 25;
  public pIn: number = 0;
  loader: boolean = false;
  loading: boolean = false;
  pageNumber = 1;
  pageSize = 25;
  pageChanged(event: any) {
    this.loader = true;
    this.pIn = event.pageIndex;
    this.pageIn = event.pageIndex;
    this.pagesizedef = event.pageSize;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousSize = pageSize * pageIndex;
    this.previousSizedef = previousSize;
    this.getRequestdataNext(previousSize, pageIndex + 1, pageSize, '', this.sortColumnDef, this.SortDirDef);
  }
  getRequestdataNext(cursize: number, pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loading = false;
    this.pageSize = pageSize;
    this.pageNumber = pageNum;
    this.reportOrderService.getReportOrder(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
      if (res.status == true) {
        this.reportOrders.length = cursize;
        this.reportOrders.push(...res?.data);
        this.reportOrders.length = res?.pagination.totalCount;
        this.dataSource = new MatTableDataSource<any>(this.reportOrders);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.paginator as MatPaginator;
        this.loader = false;
      }
      else this.notificationService.warn(res.error)
    }, err => {
      this.notificationService.warn("! Fail");
      this.loader = false;

    })


  }
  togglePanel() {

    this.panelOpenState = !this.panelOpenState
  }

  lastcol: string = 'Id';
  lastdir: string = 'asc';
  sortData(sort: any) {
    if (this.pIn != 0)
      window.location.reload();
    if (this.lastcol == sort.active && this.lastdir == sort.direction) {
      if (this.lastdir == 'asc')
        sort.direction = 'desc';
      else
        sort.direction = 'asc';
    }
    this.lastcol = sort.active; this.lastdir = sort.direction;
    var c = this.pageIn;
    this.getReportOrders(1, 25, '', sort.active, this.lastdir);
  }



  onSearchClear(){
    this.searchKey ='';
    this.applyFilter();
  }
  applyFilter(){
    this.dataSource.filter=this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    //this.service.initializeFormGroup();
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.disableClose=true;
    dialogGonfig.autoFocus= true;
    dialogGonfig.width="50%";
    dialogGonfig.panelClass='modals-dialog';
  
    this._bottomSheet.open(EditReportComponent);
  
  }
}
