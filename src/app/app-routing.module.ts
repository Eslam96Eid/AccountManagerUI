import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
// import { HomeComponent } from './home/home/home.component';
import { ReportOrderComponent } from './report-order/report-order.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account/register.component';
import { StepperComponent } from './shared/components/stepper/stepper.component';
import { OrderTotalsComponent } from './shared/components/order-totals/order-totals.component';

const routes: Routes = [
  // {
  //   path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule),
  //   data: { breadcrumb: { skip: true } }
  // },
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent},

  {
    path: '', component: LayoutComponent, children: [

      { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
      { path: 'shop', component: OrderTotalsComponent, data: { breadcrumb: 'Shop' } },
      { path: 'test-error', component: TestErrorComponent, data: { breadcrumb: 'Test Errors' } },
      { path: 'server-error', component: ServerErrorComponent, data: { breadcrumb: 'Server Error' } },
      { path: 'not-found', component: NotFoundComponent, data: { breadcrumb: 'Not found' } },
      // {
      //   path: 'reportorders',
      //   component: ReportOrderComponent,
      //   canActivate: [AuthGuard],
      //   loadChildren: () => import('./report-order/report-order.module').then(mod => mod.ReportOrderModule),
      //   data: { breadcrumb: 'ReportOrder' }
      // }
      {
        path: 'reportorders',
        component: ReportOrderComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'ReportOrder' }
      }




    ], data: { breadcrumb: 'Report' }
  },


  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }