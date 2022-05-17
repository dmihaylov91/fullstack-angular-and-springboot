import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Player, Statistic} from '../../common/football-api-classes';

@Component({
    selector: 'app-cska-player',
    templateUrl: './cska-player.component.html',
    styleUrls: ['./cska-player.component.css']
})
export class CskaPlayerComponent implements OnInit {
    player: Player = new Player();
    statics: Statistic[] = [];
    season: number = 0;
    storage: Storage = sessionStorage;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.season = JSON.parse(this.storage.getItem('season'));
        this.route.paramMap.subscribe(() => {
            this.handlePlayerDetails();
        });
    }

    private handlePlayerDetails() {
        const thePlayerId: number = +this.route.snapshot.paramMap.get('id');
        this.player = JSON.parse(this.storage.getItem('players_dictionary_' + this.season))[thePlayerId];
        this.statics = JSON.parse(this.storage.getItem('statistics_' + this.season))[thePlayerId];
    }
}
