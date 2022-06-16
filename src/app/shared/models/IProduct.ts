export interface IReportOrder {
    id: number
    creationDate: Date
    updateDate: Date
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    orderedBy: string
    customerName: string
    accountNumber: string
    branch: string
    ticketNumber: number
    reportType: string
    periodFrom: Date
    periodTo: Date
    reportStatus: string
    reportUrl: string
    sendTo: string
    ccTo: string
    orderNumber: number
    mailAttached: string
    createdAt: string
    reportClass: string
    custReport: string
  }
