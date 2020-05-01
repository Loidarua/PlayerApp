import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './pages/player/player.component';
import { PlayersComponent } from './pages/players/players.component';


const routes: Routes = [ 
{path:'players', component:PlayersComponent},
{path:'player/:id', component:PlayerComponent},
{path:'**', pathMatch:'full',redirectTo:'players'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
