import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SofascoreComponent } from './sofascore/sofascore.component';

const routes: Routes = [
  {
    path: 'sofascore',
    component: SofascoreComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: '', redirectTo: '/main', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
