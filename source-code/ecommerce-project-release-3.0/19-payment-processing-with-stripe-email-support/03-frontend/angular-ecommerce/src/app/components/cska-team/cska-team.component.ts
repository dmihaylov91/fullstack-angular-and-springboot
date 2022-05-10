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
  seasons : number[] = [];
  season: number = 2021;
  storage: Storage = sessionStorage;

  constructor(private footballApiService: FootballApiServiceService) {}

  ngOnInit(): void {
    this.getSeasons();
    this.getPlayers();
  }

   getPlayers(): void
   {
     const data = JSON.parse(this.storage.getItem('players_' + this.season));
     if (data != null)
     {
       this.players = data;
     }
     else
     {
       forkJoin(this.footballApiService.getAllCskaPlayers(this.season)).subscribe(data =>
       {
         const allPlayers : Player[] = [].concat(...data);

         console.log('Getting all CSKA players');
         console.log(JSON.stringify(allPlayers));
         console.log(allPlayers);
         this.players = allPlayers;

         this.storage.setItem('players_' + this.season, JSON.stringify(allPlayers));
       });
     }
   }

  getSeasons(): void
  {
    const seasons = JSON.parse(this.storage.getItem('seasons'));
    if(seasons != null)
    {
      this.seasons = seasons;
      //this.season = this.seasons[this.seasons.length - 1];
    }
    else
    {
      this.footballApiService.getCskaSeasons().subscribe(data =>
      {
        console.log('CSKA Seasons: ' +  console.log(data));
        this.seasons = data;
        //this.season = this.seasons[this.seasons.length - 1];

        this.storage.setItem('seasons', JSON.stringify(data));

      });
    }
  }

   changeSeason(seasonVal)
   {

       console.log('New value: ' + seasonVal);
       this.season = seasonVal;
       this.getPlayers();

   }

}
