import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameInfo, RoundsInfo } from './sofascore/entities';
import { Torneios, TorneiosEnum } from './sofascore/torneios';
import { TorneioClass } from './torneio/classes/TorneioClass';

@Injectable({
  providedIn: 'root'
})
export class SofascoreService {

  private urlServer = 'https://statsck-api.rj.r.appspot.com';
  //private urlServer = 'http://localhost:8080';

  private urlApi = this.urlServer + "/run";
  private urlGetHomeTeams = this.urlServer + "/hometeams";
  private urlGetAwayTeams = this.urlServer + "/awayteams";
  private urlAllTeams = this.urlServer + "/allteams";

  private _torneioSelect: string = '';

  private torneio: any;

  constructor(public http: HttpClient) { }

  set torneioSelect(torneioSel: string) {
    this._torneioSelect = torneioSel;
    const i = Object.keys(TorneiosEnum).indexOf(this._torneioSelect);
    const v = Object.values(TorneiosEnum)[i];
    const t = Torneios[v];
    this.torneio = new TorneioClass(t.id, t.apelido, t.idSeason);
  }

  testGetData(): any {
    return new Promise((resolve, reject) => {
      this.http.get(this.getUrlStandings()).subscribe(
        {
          next: data => resolve(data),
          error: err => reject(err)
        }
      )
    })
  }

  testGetDataPromise(): Promise<RoundsInfo> {
    return new Promise((resolve, reject) => {
      this.http.get<RoundsInfo>(this.getUrlRounds()).subscribe(
        {
          next: data => resolve(data),
          error: err => reject(err)
        }
      );
    });
  }

  testGetGamesByRound(round: number | undefined): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.getUrlRound() + round).subscribe(
        {
          next: data => resolve(this.handleGameInfo(data)),
          error: err => reject(err)
        }
      );
    });
  }

  handleGameInfo(data: any) {
    let games: GameInfo[] = [];

    data.events.forEach((g: any) => {
      let game: GameInfo;
      game = {
        id: g.id,
        date: g.startTimestamp,
        dateAux: g.startTimestamp,
        status: g.status.type,
        homeTeam: g.homeTeam.shortName,
        awayTeam: g.awayTeam.shortName,
        homeScore: g.homeScore.normaltime,
        awayScore: g.awayScore.normaltime,
        tournament: g.tournament.name
      };
      games.push(game);
    });

    return games;
  }

  testGetGameInfo(gameId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get("https://api.sofascore.com/api/v1/event/" + gameId + "/statistics")
        .subscribe({
          next: data => resolve(data),
          error: err => reject(err)
        });
    });
  }

  saveData(dados: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.http.post(this.urlApi, dados).subscribe({
          next: data => resolve(data),
          error: err => reject(err)
        });
      }
    );
  }

  getHomeTeams(params: any) {
    return this.http.get(this.urlGetHomeTeams, { params: params });
  }

  getAwayTeams(params: any) {
    return this.http.get(this.urlGetAwayTeams, { params: params });
  }

  getAllTeams() {
    return this.http.get(this.urlAllTeams);
  }

  getUrlStandings() {
    return this.torneio.getUrlStandings();
  }

  getUrlRounds() {
    return this.torneio.getUrlRounds();
  }

  getUrlRound() {
    return this.torneio.getUrlRound();
  }
}
