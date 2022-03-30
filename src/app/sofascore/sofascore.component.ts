import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SofascoreService } from '../sofascore.service';
import {
  BallPoss, CornerKicks, Game, GameInfo, RoundsInfo,
  Shots, ShotsBlocked, ShotsInTarget, ShotsOffTarget,
  StatusGame, TypeStats
} from './entities';
import { Torneios } from './torneios';

@Component({
  selector: 'app-sofascore',
  templateUrl: './sofascore.component.html',
  styleUrls: ['./sofascore.component.css'],
  providers: [SofascoreService]
})

export class SofascoreComponent implements OnInit {

  public dados: Game[] = [];
  public msg: string = '';
  private torneioId: number = 0;

  constructor(private service: SofascoreService, private router: ActivatedRoute) { }

  ngOnInit(): void { }

  setTorneio($event: any) {
    this.torneioId = $event;
    this.service.torneioSelect = this.getTorneio();
    this.run();
  }

  private getTorneio() {
    return Torneios.find((el: any) => {
      return el.id == this.torneioId;
    }).apelido;
  }

  /**
   * Start data insert
   */
  async run() {
    this.msg = 'Atualizando Torneio. Aguarde...';
    await this.getData().then((data: Game[]) => {
      this.dados = data.sort(this.compareRounds);
      this.service.saveData(this.dados).then(
        (data) => {
          //alert('Successful update.');
          //this.route.navigate(['./querys']);
          this.msg = 'Torneio ' + this.getTorneio() + ' atualizado com sucesso!';
        },
        (err) => {
          this.msg = 'Erro ao atualizar. Vide log.';
        }
      ).catch(err => console.log(err));
    });
  }

  /**
   * 
   * @returns os dados de todo torneio
   */
  async getData(): Promise<Game[]> {
    return this.getRounds()
      .then((roundsInfo: any) => {
        return this.getGames(roundsInfo);
      })
      .then((games: any) => {
        return this.getGamesDetail(games);
      });
  }

  /**
   * 
   * @returns uma promise resolvida com todas as rodadas
   */
  getRounds(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let roundsInfo: RoundsInfo | undefined;
      roundsInfo = (await this.service.testGetDataPromise());
      resolve(roundsInfo);
    });
  }

  /**
   * 
   * @param roundsInfo rodadas
   * @returns uma promise com todos os jogos 
   */
  getGames(roundsInfo: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let gamesAux: any[] = [];
      Promise.all(roundsInfo.rounds.map(async (item: any) => {
        let game: any = (await this.service.testGetGamesByRound(item.round));
        game.round = item.round;
        gamesAux.push(game);
      })).then(() => {
        resolve(gamesAux);
      });
    });
  }

  /**
   * 
   * @param games 
   * @returns uma promise com os detalhes dos jogos
   */
  getGamesDetail(games: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let gamesArrayAux: Game[] = [];
      Promise.all(games.map(async (item: any) => {
        return new Promise((resolve, reject) => {
          Promise.all(item.map(async (g: GameInfo) => {
            if (this.isGameFinished(g.status)) {
              const x: any = await this.service.testGetData();
              let gameInfoAux: any = await this.service.testGetGameInfo(g.id);
              const ballPossession = this.extractPossession(gameInfoAux.statistics[0].groups);
              const cornerKicks = this.extractCornerKicks(gameInfoAux.statistics[0].groups);
              const shots = this.extractShots(gameInfoAux.statistics[0].groups);
              const shotsInTarget = this.extractShotsInTarget(gameInfoAux.statistics[0].groups);
              const shotsOffTarget = this.extractShotsOffTarget(gameInfoAux.statistics[0].groups);
              const shotsBlocked = this.extractShotsBlocked(gameInfoAux.statistics[0].groups);

              g.homeP = this.getTeamPosition(x, g.homeTeam);
              g.awayP = this.getTeamPosition(x, g.awayTeam);

              gamesArrayAux.push({
                game: g,
                ballPossession: ballPossession,
                cornerKicks: cornerKicks,
                shots: shots,
                shotsInTarget: shotsInTarget,
                shotsOffTarget: shotsOffTarget,
                shotsBlocked: shotsBlocked,
                round: item.round
              });
            }
          })).then(() => resolve(true));
        })
      })).then(() => resolve(gamesArrayAux));
    })
  }

  getTeamPosition(x: any, s: any) {
    const y = x.standings[0].rows;
    //console.log(y);
    const o = y.filter((el: any) => el.team.shortName == s)[0];
    let p = 0;

    if (o != undefined) {
      p = o.position;
    }

    return p;
  }

  extractPossession(data: any = []): BallPoss {
    const ballPossession = data.filter((el: any) => el.groupName == TypeStats.POSSESSION)[0].statisticsItems[0];
    return { home: parseFloat(ballPossession.home) / 100.0, away: parseFloat(ballPossession.away) / 100.0 };
  }

  extractCornerKicks(data: any = []): CornerKicks {
    const cornerKick = data.filter((el: any) => el.groupName == TypeStats.TVDATA)[0].statisticsItems[0];
    return { home: parseInt(cornerKick.home), away: parseInt(cornerKick.away) };
  }

  extractShots(data: any = []): Shots {
    const shots = data.filter((el: any) => el.groupName == TypeStats.SHOTS)[0].statisticsItems[0];
    return { home: parseInt(shots.home), away: parseInt(shots.away) };
  }

  extractShotsInTarget(data: any = []): ShotsInTarget {
    const shotsAux = data.filter((el: any) => el.groupName == TypeStats.SHOTS)[0].statisticsItems[1];
    //const shotsAux = shots.filter((el: any) => el.name == TypeStats.SHOTSINTARGET)[0];
    return { home: parseInt(shotsAux.home), away: parseInt(shotsAux.away) };
  }

  extractShotsOffTarget(data: any = []): ShotsOffTarget {
    const shotsAux = data.filter((el: any) => el.groupName == TypeStats.SHOTS)[0].statisticsItems[2];
    //const shotsAux = shots.filter((el: any) => el.name == TypeStats.SHOTSOFFTARGET)[0];
    return { home: parseInt(shotsAux.home), away: parseInt(shotsAux.away) };
  }

  extractShotsBlocked(data: any = []): ShotsBlocked {
    const shotsAux = data.filter((el: any) => el.groupName == TypeStats.SHOTS)[0].statisticsItems[3];
    //const shotsAux = shots.filter((el: any) => el.name == TypeStats.SHOTSBLOCKED)[0];
    // console.log(shotsAux);
    return { home: parseInt(shotsAux.home), away: parseInt(shotsAux.away) };
  }

  isGameNotStarted(statusGame: string) {
    return statusGame == StatusGame.NOTSTARTED ? true : false;
  }

  isGameFinished(statusGame: string) {
    return statusGame == StatusGame.FINISHED ? true : false;
  }

  isGameCanceled(statusGame: string) {
    return statusGame == StatusGame.CANCELED ? true : false;
  }

  compareRounds(a: any, b: any) {
    if (a.round < b.round) {
      return -1;
    }
    if (a.round > b.round) {
      return 1;
    }
    return 0;
  }

}
