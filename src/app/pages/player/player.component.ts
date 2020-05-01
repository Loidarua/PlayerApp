import { Component, OnInit } from '@angular/core';
import { PlayerModel } from 'src/app/model/player.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PlayersService } from 'src/app/services/players.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player=new PlayerModel;
  constructor(private playersService: PlayersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   
    const id=this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo'){
      this.playersService.getPlayer(id).subscribe((resp:PlayerModel) =>{
        this.player= resp;
        this.player.id=id;
      });

    }
  }


  guardar(form:NgForm){
    if(form.invalid){return;}


    Swal.fire ({
      icon:'info',
      title:'Espere',
      text:'Guardando información',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.player.id != null){
     peticion= this.playersService.actualizarPlayer(this.player);
      
    }else{
     peticion= this.playersService.crearPlayer(this.player);
     if(peticion){
      Swal.fire({
        icon:'error',
        title:this.player.nombre, 
        text:'Se ha producido un error'

      });
     } 
    }

    peticion.subscribe(resp=>{
      Swal.fire({
        icon:'success',
        title:this.player.nombre, 
        text:'Se actualizo correctamente'

      });
    });
    
  }
}