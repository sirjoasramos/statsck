import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusGame } from '../sofascore/entities';
import { Torneios } from '../sofascore/torneios';
import { InfoService } from './info.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnChanges {

  @Input()
  time: String = '';

  @Input()
  torneio: any;

  private torneioId: number = 0;
  private timeName: string = '';
  public games: any = [];
  public msg: string = '';
  private homeTeams: any[] = [];

  constructor(private service: InfoService) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['torneio'] !== undefined && changes['torneio'].currentValue) {
      this.torneioId = parseInt(changes['torneio'].currentValue);
      this.getGameToday();
    }
  }

  getGameToday() {
    let gamesAux: any = [];
    this.games = [];
    for (let i = 0; i < 3; i++) {
      this.service.getGamesToday(i).subscribe(
        (data: any) => {
          data.events.forEach((el: any) => {
            if ((el.tournament.uniqueTournament != undefined) && (el.tournament.uniqueTournament.id == this.torneioId)) {
              if (el.status.type == StatusGame.NOTSTARTED) {  

                this.getHomeInfo(el.homeTeam.shortName).subscribe(
                  (team: any) => {
                    let ckCount = 0;
                    team.forEach((e: any) => {
                      ckCount += e.cornerKicks.home;
                      el.homeTeam.ckCount = ckCount / team.length;
                      el.homeTeam.poss = e.game.homeP;
                    });
                  }
                );

                this.getAwayInfo(el.awayTeam.shortName).subscribe(
                  (team: any) => {
                    let ckCount = 0;
                    team.forEach((e: any) => {
                      ckCount += e.cornerKicks.away;
                      el.awayTeam.ckCount = ckCount / team.length;
                      el.awayTeam.poss = e.game.awayP;
                    });
                  }
                );

                gamesAux.push(el);
              }
            }
          });
          this.games = this.removeDuplicates(gamesAux).sort(this.compareRounds);
        },
      );
    }
    if (this.games.length == 0) {
      this.msg = 'Sem jogos por enquanto.';
    }
  }

  compareRounds(a: any, b: any) {
    if (a.startTimestamp < b.startTimestamp) {
      return -1;
    }
    if (a.startTimestamp > b.startTimestamp) {
      return 1;
    }
    return 0;
  }

  removeDuplicates(array: any) {
    return Array.from(new Set(array.map((a: any) => a.id))).map(
      id => {
        return array.find((a: any) => a.id == id);
      }
    )
  }

  getStartTimestamp(t: number) {
    return new Date(t * 1000).toLocaleString();
  }

  getHomeInfo(teamName: string): Observable<any> {
    return this.service.getHomeTeams({ tournament: this.getTorneio(), team: teamName });
  }

  getAwayInfo(teamName: string): Observable<any> {
    return this.service.getAwayTeams({ tournament: this.getTorneio(), team: teamName });
  }

  getTorneio() {
    return Torneios.find((el: any) => {
      return el.id == this.torneioId;
    }).name;
  }


}
