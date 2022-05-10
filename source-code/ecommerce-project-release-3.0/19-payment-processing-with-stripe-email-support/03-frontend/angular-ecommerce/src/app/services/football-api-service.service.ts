import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Product } from '../common/product';
import {forkJoin, Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Paging, Parameters, Player, Response} from '../common/football-api-classes';

@Injectable({
  providedIn: 'root'
})
export class FootballApiServiceService {

  private url = 'https://api-football-v1.p.rapidapi.com/v3/players?team=853&season=2021';


  constructor(private httpClient: HttpClient) { }

  getAllCskaPlayers(): Observable<Player[]>[] {

    return [this.getPlayers(this.url), this.getPlayersForPage(this.url, 2)];
  }

  private getPlayers(searchUrl: string): Observable<Player[]> {
    const headerDict = {
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '22f70b951dmshe4a4e7b5adebd52p12cd5bjsne9c3eb8076f2'
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.httpClient.get<GetResponsePlayers>(searchUrl, requestOptions).pipe(map(x => x.response.map(y => y.player)));

  }

  private getPlayersForPage(searchUrl: string, page: number): Observable<Player[]> {

    const headerDict = {
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '22f70b951dmshe4a4e7b5adebd52p12cd5bjsne9c3eb8076f2'
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.httpClient.get<GetResponsePlayers>(searchUrl + '&page=' + page, requestOptions).pipe(map(x => x.response.map(y => y.player)));
  }

}

interface GetResponsePlayers {
  get: string;
  parameters: Parameters;
  errors: any[];
  results: number;
  paging: Paging;
  response: Response[];
}
