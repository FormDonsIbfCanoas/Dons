import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./perguntas/perguntas.module').then(m => m.PerguntasModule) },
  { path: 'resultado', loadChildren: () => import('./results/results.module').then(m => m.ResultsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
