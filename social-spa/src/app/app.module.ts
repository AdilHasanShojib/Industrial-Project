import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { MainComponent } from './layout/main/main.component';
import { LoggedInMainComponent } from './layout/main/logged-in-main/logged-in-main.component';
import { LoggedOutMainComponent } from './layout/main/logged-out-main/logged-out-main.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TbInputComponent } from './_forms/tb-input/tb-input.component';
import { DatePickerComponent } from './_forms/date-picker/date-picker.component';
import {MatNativeDateModule} from '@angular/material/core';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ServerErrorComponent } from './error/server-error/server-error.component';
import { TestErrorComponent } from './error/test-error/test-error.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    MainComponent,
    LoggedInMainComponent,
    LoggedOutMainComponent,
    LoginComponent,
    RegisterComponent,
    TbInputComponent,
    DatePickerComponent,
    MemberDetailsComponent,
    MemberListComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    MemberMessagesComponent,
    MemberCardComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TestErrorComponent,
    
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      
      positionClass: 'toast-bottom-right',
      
    }),
    NgxSpinnerModule.forRoot({
      type:'pacman'
    }),
    MatPaginatorModule,


  ],
  providers: [
     {provide:HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true,},
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
