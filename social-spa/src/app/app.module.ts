import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { LoggedInMainComponent } from './layout/main/logged-in-main/logged-in-main.component';
import { LoggedOutMainComponent } from './layout/main/logged-out-main/logged-out-main.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Module Imports
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TbInputComponent } from './_forms/tb-input/tb-input.component';
import { TbDatePickerComponent } from './_forms/tb-date-picker/tb-date-picker.component';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MemberCardComponent } from './members/member-card/member-card.component';

import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ServerErrorComponent } from './error/server-error/server-error.component';
import { TestErrorComponent } from './error/test-error/test-error.component';
import { GalleryModule } from 'ng-gallery';
import { MemberPhotoEditorComponent } from './members/member-photo-editor/member-photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { LikesListComponent } from './likes-list/likes-list.component';
import { TimeagoModule } from 'ngx-timeago';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { RolesManagementComponent } from './admin/roles-management/roles-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { HasRolesDirective } from './_directives/has-roles.directive';
import { ConfirmationModalComponent } from './_modals/confirmation-modal/confirmation-modal.component';
import { RolesModalComponent } from './_modals/roles-modal/roles-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    LoggedInMainComponent,
    LoggedOutMainComponent,
    LoginComponent,
    RegisterComponent,
    TbInputComponent,
    TbDatePickerComponent,
    MemberDetailsComponent,
    MemberListComponent,
    MemberEditComponent,
    MemberMessagesComponent,
    MemberCardComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TestErrorComponent,
    MemberPhotoEditorComponent,
    LikesListComponent,
    MessagePanelComponent,
    AdminPanelComponent,
    RolesManagementComponent,
    PhotoManagementComponent,
    HasRolesDirective,
    ConfirmationModalComponent,
    RolesModalComponent,
   
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
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatPaginatorModule,
    GalleryModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgxSpinnerModule.forRoot({
      type: 'pacman',
    }),
    TimeagoModule.forRoot(),
    FileUploadModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
