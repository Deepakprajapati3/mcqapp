import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { McqComponent } from './mcq/mcq.component';

const routes: Routes = [
  {path:"welcome",component:WelcomeComponent},
  {path:"mcq",component:McqComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
