  import {IReportOrder} from './IProduct'
  export interface IPagination {
      pageIndex: number;
      pageSize: number;
      count:number;
      data:IReportOrder[]; 
    }
    export class Pagination implements IPagination {
      pageIndex: number;
      pageSize: number;
      count: number;
      data: IReportOrder[] = [];
  }