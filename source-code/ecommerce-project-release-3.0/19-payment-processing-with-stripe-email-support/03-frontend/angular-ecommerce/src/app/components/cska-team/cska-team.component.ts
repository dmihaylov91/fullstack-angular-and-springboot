import { Component, OnInit } from '@angular/core';
import {FootballApiServiceService} from '../../services/football-api-service.service';
import {Player} from '../../common/football-api-classes';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-cska-team',
  templateUrl: './cska-team.component.html',
  styleUrls: ['./cska-team.component.css']
})
export class CskaTeamComponent implements OnInit {

  players: Player[] = [];
  storage: Storage = sessionStorage;

  constructor(private footballApiService: FootballApiServiceService) {}

  ngOnInit(): void {
    this.getPlayers();
  }

   getPlayers(): void
   {
     const data = JSON.parse(this.storage.getItem('players'));
     if (data != null)
     {
       this.players = data;
     }
     else
     {
       forkJoin(this.footballApiService.getAllCskaPlayers()).subscribe(data =>
       {
         const allPlayers : Player[] = [].concat(...data);

         console.log('Getting all CSKA players');
         console.log(JSON.stringify(allPlayers));
         console.log(allPlayers);
         this.players = allPlayers;

         this.storage.setItem('players', JSON.stringify(allPlayers));
       });


       // this.footballApiService.getAllCskaPlayers().subscribe(data => {
       //   console.log('Getting all CSKA players');
       //   console.log(JSON.stringify(data));
       //   console.log(data);
       //   this.players = data;
       //
       //   this.storage.setItem('players', JSON.stringify(data));
       //
       // });

     }
   }

}
