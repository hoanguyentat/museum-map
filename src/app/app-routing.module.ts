import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewInfoComponent } from './view-info/view-info.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/trang-chu', pathMatch: 'full' },
  { path: 'vung/:id', component: ViewInfoComponent },
  { path: 'trang-chu', component: HomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
