import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { AccountModule } from './account/account.module';
import { RouterModule} from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AppComponent,
   
    
  ],
  imports: [
    BrowserModule,
     AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule, 
    // HomeModule,
    NgxSpinnerModule,
    // ReportOrderModule,
    LayoutModule,
    AccountModule,
   RouterModule,
   ScrollingModule 
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS , useClass:ErrorInterceptor , multi:true},
    {provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true},
    {provide:HTTP_INTERCEPTORS , useClass:JwtInterceptor , multi:true},
 
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
