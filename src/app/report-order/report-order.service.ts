import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/IPagination';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs';
import { ReportOrderParams } from '../shared/models/shopParams';
import { IReportOrder } from '../shared/models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ReportOrderService {
  baseUrl = environment.apiUrl;
  
  pagination = new Pagination();
  reportOrderParams = new ReportOrderParams();
  ReportOrderCache = new Map();

  constructor(private http: HttpClient) { }

  getReportOrder(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string) {
   

    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null ){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    
     return this.http.get<any>(this.baseUrl + 'home', { observe: 'response', params })
      .pipe(
        map(response => {
          this.ReportOrderCache.set(Object.values(this.reportOrderParams).join('-'), response.body.data);
        //  this.pagination = response.body;
          return  response.body;
        })
      )
  }

  setReportOrderParams(params: ReportOrderParams) {
    this.reportOrderParams = params;
  }

  getShopParams() {
    return this.reportOrderParams;
  }
  getReportOrderById(id: number): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'GetOrderReportById', id);
  }
  insertReportOrder(data: IReportOrder): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Home/AddOrderReport',data);
  }
 
  getAccounts(): Observable<any>{
    return this.http.get<any>(this.baseUrl + 'Home/GetAllAccountName');
  }

  getAccountNameByNumber(accountNumber : string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'Home/GetAccountNameByAccNumber/' + accountNumber);
  }

  getAccountBranches(accountName : string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'Home/GetAccountBranch/' + accountName);
  }


}
