import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditorComponent } from './editor/editor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


const routes: Routes = [
  { path : '' , component : HomeComponent },
  { path : 'editor' , component : EditorComponent },
  { path : 'reset-password' , component : ForgetPasswordComponent},
  { path : '404' , component : PageNotFoundComponent },
  { path : '**' , redirectTo : '/404' , pathMatch : 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
