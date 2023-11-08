import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './account/login/login.component';
import { MemberListComponent } from './members/member-list/member-list.component';
//import { AuthGuard } from './_guards/auth.guard';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { authGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  { path:'',
  runGuardsAndResolvers:'always',
  canActivate:[authGuard],
  children: [
    {path:'members',component:MemberListComponent}
  
  ],

  },
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'not-found',component:NotFoundComponent},
 
  {path:'**',component:NotFoundComponent,pathMatch:'full'}
                           

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
