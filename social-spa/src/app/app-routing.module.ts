import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './account/login/login.component';
import { MemberListComponent } from './members/member-list/member-list.component';
//import { AuthGuard } from './_guards/auth.guard';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './error/test-error/test-error.component';
import { ServerErrorComponent } from './error/server-error/server-error.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  { path:'',
  runGuardsAndResolvers:'always',
  canActivate:[authGuard],
  children: [
    {path:'members',component:MemberListComponent},
    {path:'member/edit',component:MemberListComponent},
    {path:'member/:userName',component:MemberDetailsComponent}
  
  ],

  },
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'test-error',component:TestErrorComponent},
  {path:'server-error',component:ServerErrorComponent},
  {path:'**',component:NotFoundComponent,pathMatch:'full'}
                           

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
