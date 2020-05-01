import { Component, OnInit } from '@angular/core';
import { PlayerModel } from 'src/app/model/player.model';
import { PlayersService } from '../../services/players.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  
    players: PlayerModel[]=[];
    cargando=false;
  
    constructor(private playersService: PlayersService) { }
  
    ngOnInit(): void {
  
  
      this.cargando=true;
      this.playersService.getPlayers().subscribe(resp=>{
         this.players=resp;
         this.cargando=false;      
      });
    }
  
    borrarPlayer(player:PlayerModel, i: number){
  
      Swal.fire({
        title:'¿Esta seguro?',
        text: `Esta seguro que desea borrar a ${player.nombre}`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true
          }).then(resp =>{
            if(resp.value){
              this.players.splice(i,1);
      this.playersService.borrarPlayer(player.id).subscribe();
            }
          });    
    };
  
  
  
  }
  