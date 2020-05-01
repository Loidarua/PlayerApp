import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { PlayerModel } from '../model/player.model';
import {map,delay} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private url="https://login-app-86bb8.firebaseio.com"; // url de faaribase

  private url1="http://localhost:8080/player" // con el puerto 8080 trabaja en java  y con el puerto 9090 trabaja en scala (Spring Boot y Scala Akka)

  private token;
  private headers;

  constructor(private http:HttpClient,) { 
    var usuario={
      username : "admin1",
      password :"admin"
    };  
   this.token= null;    
    //es para autenticar el usuario anterior y crear un token 
    //this.http.post("http://localhost:8080/",usuario).subscribe(resp=>this.token=resp);
   
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  crearPlayer(player:PlayerModel){

    return this.http.post(`${this.url1}/addplayer`,player)
                  .pipe(
                    map((resp:any)=>{
                      player.id= resp.id;
                      return player;
                    })
                  );
  }

  actualizarPlayer(player:PlayerModel){
    const playerTemp={
      ...player
    };

   delete playerTemp.id;

    return this.http.put(`${this.url1}/editplayer/${player.id}`,player);
  }
  
  borrarPlayer(id:string){

    return this.http.delete(`${this.url1}/removeplayer/${id}`);

  }

  getPlayer(id : string){
    console.log(this.token)
    this.headers= new HttpHeaders().set('Authorization',`${this.token}`);

    //para el consumo de un servicio con token
    //this.http.get("http://localhost:8080/secureEndpoint",{headers:this.headers}).subscribe(resp=>console.log(resp))

    return this.http.get(`${this.url1}/getplayer/${id}`);

  }

  getPlayers(){   
    
    return this.http.get(`${this.url1}/getplayers`)
                      .pipe(map(resp=> this.crearArreglo(resp)),delay(0)
                      );

  }

  private crearArreglo(playersObj: object){

   const players:PlayerModel[]=[];

   if (playersObj === null){return [];}

   Object.keys(playersObj).forEach(key=>{
     const player: PlayerModel=playersObj[key];     
     players.push(player);
   });
   return players;
  }

}