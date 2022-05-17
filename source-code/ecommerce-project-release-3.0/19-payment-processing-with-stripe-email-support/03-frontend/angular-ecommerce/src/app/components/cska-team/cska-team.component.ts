import {Component, OnInit} from '@angular/core';
import {FootballApiServiceService} from '../../services/football-api-service.service';
import {Player, Response, Statistic} from '../../common/football-api-classes';
import {forkJoin, mergeMap, takeLast, tap} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-cska-team',
    templateUrl: './cska-team.component.html',
    styleUrls: ['./cska-team.component.css']
})
export class CskaTeamComponent implements OnInit {

    players: Player[] = [];
    seasons: number[] = [];
    season: number = 0;
    storage: Storage = sessionStorage;

    constructor(private footballApiService: FootballApiServiceService) {
    }

    ngOnInit(): void {
        this.getSeasonsAndPlayers();
    }

    getSeasonsAndPlayers(): void {
        const seasons = JSON.parse(this.storage.getItem('seasons'));
        if (seasons != null) {
            this.seasons = seasons;
        }
        const season = JSON.parse(this.storage.getItem('season'));
        let players: null;
        if (season != null) {
            this.season = season;
            players = JSON.parse(this.storage.getItem('players_' + this.season));
            if (players != null) {
                this.players = players;
            }
        }

        if (seasons == null || season == null || players == null) {
            this.footballApiService.getCskaSeasons().pipe(tap(x => {
                console.log('Seasons retrieved: ' + x);
                this.season = x[x.length - 1];
                this.seasons = x;
                this.storage.setItem('seasons', JSON.stringify(this.seasons));
                this.storage.setItem('season', JSON.stringify(this.season));


            }), mergeMap(x => forkJoin(this.footballApiService.getAllCskaPlayers(x[x.length - 1])))).subscribe(
                data => {
                    const allResponses: Response[] = [].concat(...data);
                    const allPlayers: Player[] = allResponses.map(y => y.player);

                    const dictionary = Object.assign({}, ...allResponses.map((x) => ({[x.player.id]: x.statistics})));
                    console.log(dictionary);
                    this.storage.setItem('statistics', JSON.stringify(dictionary));

                    console.log('All CSKA players retrieved');
                    console.log(JSON.stringify(allPlayers));
                    console.log(allPlayers);

                    this.players = allPlayers;
                    this.storage.setItem('players_' + this.season, JSON.stringify(allPlayers));


                }
            );
        }
    }

    savePlayerStatistics(playerId: number, statistics: Statistic[]) {
        //
    }

    getPlayers(): void {
        const data = JSON.parse(this.storage.getItem('players_' + this.season));
        if (data != null) {
            this.players = data;
        } else {
            forkJoin(this.footballApiService.getAllCskaPlayers(this.season)).subscribe(data => {
                const allResponses: Response[] = [].concat(...data);
                const allPlayers: Player[] = allResponses.map(y => y.player);

                const dictionary = Object.assign({}, ...allResponses.map((x) => ({[x.player.id]: x.statistics})));
                console.log(dictionary);
                this.storage.setItem('statistics', JSON.stringify(dictionary));

                console.log('Getting all CSKA players');
                console.log(JSON.stringify(allPlayers));
                console.log(allPlayers);
                this.players = allPlayers;

                this.storage.setItem('players_' + this.season, JSON.stringify(allPlayers));
            });
        }
    }

    getSeasons(): void {
        const seasons = JSON.parse(this.storage.getItem('seasons'));
        if (seasons != null) {
            this.seasons = seasons;
            //this.season = this.seasons[this.seasons.length - 1];
        } else {
            this.footballApiService.getCskaSeasons().subscribe(data => {
                console.log('CSKA Seasons: ' + console.log(data));
                this.seasons = data;
                //this.season = this.seasons[this.seasons.length - 1];

                this.storage.setItem('seasons', JSON.stringify(data));

            });
        }
    }

    changeSeason(seasonVal) {

        console.log('New value: ' + seasonVal);
        this.season = seasonVal;
        this.storage.setItem('season', JSON.stringify(this.season));
        this.getPlayers();

    }

}
