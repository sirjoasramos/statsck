
import { Component } from '@angular/core';
import { SofascoreService } from '../sofascore.service';
import { Torneios } from '../sofascore/torneios';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})

export class QueryComponent {

  public homeTeams: any = [];
  public awayTeams: any = [];

  public idTorneio = 0;
  public teamName = '';

  constructor(private service: SofascoreService) { }

  getAllTeams() {
    this.service.getAllTeams().subscribe((data: any) => {
      this.homeTeams['jogos'] = data.filter((el: any) => {
        el.totalCornerKicks = el.cornerKicks.home + el.cornerKicks.away;
        return el;
      });
      this.homeTeams['jogos'].sort(this.orderByCornerKicks);
    });
  }

  getHomeTeams() {
    if (this.teamName.length > 0) {
      this.service.getHomeTeams({ tournament: this.getTorneio(), team: this.teamName }).subscribe((data: any) => {
        this.filterByCK(data, this.orderByCornerKicks);
        this.countAvgCkUnderHome();
        this.afterSearchHome();
      });
    }
  }

  getAwayTeams() {
    if (this.teamName.length > 0) {
      this.service.getAwayTeams({ tournament: this.getTorneio(), team: this.teamName }).subscribe((data: any) => {
        this.filterByCKAway(data, this.orderByCornerKicks);
        this.countAvgCkUnderAway();
        this.afterSearchAway();
      });
    }
  }

  getTorneio() {
    return Torneios.find((el: any) => {
      return el.id == this.idTorneio;
    }).name;
  }

  filterByCK(data: any, fn: any) {
    let ckCount = 0;
    let sCount = 0;
    let sInTCount = 0;
    let sBkdCount = 0;
    this.homeTeams['jogos'] = data.filter((el: any) => {
      el.totalCornerKicks = el.cornerKicks.home + el.cornerKicks.away;
      ckCount += el.cornerKicks.home;
      sCount += el.shots.home;
      sInTCount += el.shotsInTarget.home;
      sBkdCount += el.shotsBlocked.home;
      this.homeTeams.sumCornersHome = ckCount;
      this.homeTeams.sumShots = sCount;
      this.homeTeams.sumShotsInTarget = sInTCount;
      this.homeTeams.sumShotsBlocked = sBkdCount;
      return el.ballPossession.home > 0.0;
    });
    this.homeTeams['jogos'].sort(fn);
  }

  filterByCKAway(data: any, fn: any) {
    let ckCount = 0;
    let sCount = 0;
    let sInTCount = 0;
    let sBkdCount = 0;
    this.awayTeams['jogos'] = data.filter((el: any) => {
      el.totalCornerKicks = el.cornerKicks.home + el.cornerKicks.away;
      ckCount += el.cornerKicks.away;
      sCount += el.shots.away;
      sInTCount += el.shotsInTarget.away;
      sBkdCount += el.shotsBlocked.away;
      this.awayTeams.sumCornersAway = ckCount;
      this.awayTeams.sumShots = sCount;
      this.awayTeams.sumShotsInTarget = sInTCount;
      this.awayTeams.sumShotsBlocked = sBkdCount;
      return el.ballPossession.away > 0.0;
    });
    this.awayTeams['jogos'].sort(fn);
  }

  //@deprecate
  filterByPoss(data: any, fn: any) {
    let ckCount = 0;
    this.homeTeams['jogos'] = data.filter((el: any) => {
      el.totalCornerKicks = el.cornerKicks.home + el.cornerKicks.away;
      ckCount += el.cornerKicks.home;
      this.homeTeams.sumCornersHome = ckCount;
      return el.ballPossession.home;
    });
    this.homeTeams['jogos'].sort(fn);
  }

  countAvgCkUnderHome() {
    let c = 0;
    this.homeTeams['jogos'].forEach((el: any) => {
      if (el.totalCornerKicks < (this.homeTeams.sumCornersHome / this.homeTeams['jogos'].length)) {
        c++;
      }
    });
    this.homeTeams.cAvgCkUnder = c;
  }

  countAvgCkUnderAway() {
    let c = 0;
    this.awayTeams['jogos'].forEach((el: any) => {
      if (el.totalCornerKicks < (this.awayTeams.sumCornersAway / this.awayTeams['jogos'].length)) {
        c++;
      }
    });
    this.awayTeams.cAvgCkUnder = c;
  }

  orderByCornerKicks(a: any, b: any) {
    if (a.totalCornerKicks > b.totalCornerKicks) {
      return -1;
    }
    if (a.totalCornerKicks < b.totalCornerKicks) {
      return 1;
    }
    return 0;
  }

  orderByAwayPosition(a: any, b: any) {
    if (a.game.awayP < b.game.awayP) {
      return -1;
    }
    if (a.game.awayP > b.game.awayP) {
      return 1;
    }
    return 0;
  }

  orderByHomePosition(a: any, b: any) {
    if (a.game.homeP < b.game.homeP) {
      return -1;
    }
    if (a.game.homeP > b.game.homeP) {
      return 1;
    }
    return 0;
  }

  orderByPoss(a: any, b: any) {
    if (a.ballPossession.home > b.ballPossession.home) {
      return -1;
    }
    if (a.ballPossession.home < b.ballPossession.home) {
      return 1;
    }
    return 0;
  }

  afterSearchHome(): void { }

  afterSearchAway(): void { }

}
