import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './account/login/login.component';
import { MemberListComponent } from './members/member-list/member-list.component';
// import { AuthGuard } from './_guards/auth.guard';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './error/test-error/test-error.component';
import { ServerErrorComponent } from './error/server-error/server-error.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { memberResolver } from './_resolvers/member.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { LikesListComponent } from './likes-list/likes-list.component';
import { MessagePanelComponent } from './message-panel/message-panel.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { adminGuard } from './_guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'member/edit', 
      component: MemberEditComponent,
      canDeactivate: [preventUnsavedChangesGuard]
    },
      
      { path: 'member/:userName', 
      component: MemberDetailsComponent, 
      resolve: {
        member: memberResolver
      }
      }, 
       {
        path: 'like-lists', component: LikesListComponent
       },
       {
        path: 'message-panel', component: MessagePanelComponent
       },
       {
        path: 'admin', component: AdminPanelComponent , canActivate: [adminGuard]
       },
       
  ],
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'test-error', component: TestErrorComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'not-found', component: NotFoundComponent},
  
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
