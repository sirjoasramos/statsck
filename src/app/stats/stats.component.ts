import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { SofascoreService } from '../sofascore.service';
import { QueryComponent } from '../query/query.component';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent extends QueryComponent implements OnChanges {

  @Input()
  time: String = '';

  @Input()
  torneio: any;

  private torneioId: number = 0;
  private timeName: string = '';
  private chartRefHome!: Chart;
  private chartRefAway!: Chart;

  private config: any = {
    type: 'bubble',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Home',
          data: []
        }
      ]
    },
    options: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'black'
        }
      }
    }
  }

  private config2: any = {
    type: 'bubble',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Away',
          data: []
        }
      ]
    },
    options: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'black'
        }
      }
    }
  }

  constructor(service: SofascoreService) {
    super(service);
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.homeTeams = [];
    this.awayTeams = [];

    if (changes['torneio'] !== undefined && changes['torneio'].currentValue) {
      this.torneioId = parseInt(changes['torneio'].currentValue);
    }

    if (changes['time'] !== undefined && changes['time'].currentValue) {
      this.timeName = changes['time'].currentValue;
    } else {
      this.timeName = '';
    }

    this.destroyChart();

    if (this.torneioId && (this.timeName.length > 0)) {
      this.idTorneio = this.torneioId;
      this.teamName = this.timeName;
      this.getHomeTeams();
      this.getAwayTeams();
    }

  }

  destroyChart() {
    if (this.chartRefHome != undefined) {
      this.chartRefHome.destroy();
    }
    if (this.chartRefAway != undefined) {
      this.chartRefAway.destroy();
    }
  }

  setConfigChartHome() {
    const charElementHome: any = document.getElementById('teamChartHome');
    if (charElementHome != undefined) {
      this.chartRefHome = new Chart(charElementHome, this.config);
    }
  }

  setConfigChartAway() {
    const charElementAway: any = document.getElementById('teamChartAway');
    if (charElementAway != undefined) {
      this.chartRefAway = new Chart(charElementAway, this.config2);     
    }
  }

  override afterSearchHome(): void {
    const jogos = this.homeTeams['jogos'];
    const homeGames = jogos.sort(this.orderByAwayPosition);
    let dados: any = [];
    this.setConfigChartHome();

    this.chartRefHome.data.labels = [];
    this.chartRefHome.data.datasets = [];

    homeGames.forEach((el: any) => {    
      dados.push({ x: el.game.awayP, y: el.totalCornerKicks, r: 10 });
    });

    this.chartRefHome.data = {
      datasets: [
        {
          label: 'Posição do Visitante x Total Escanteios Jogo',
          data: dados
        }
      ]
    }

    if (this.chartRefHome != null && this.chartRefHome != undefined) {
      this.chartRefHome.update();
    }
  }

  override afterSearchAway(): void {
    const jogos = this.awayTeams['jogos'];
    const awayGames = jogos.sort(this.orderByHomePosition);
    let dados: any = [];

    this.setConfigChartAway();
    this.chartRefAway.data.labels = [];
    this.chartRefAway.data.datasets = [];

    awayGames.forEach((el: any) => {     
      dados.push({ x: el.game.homeP, y: el.totalCornerKicks, r: 10 });
    });

    this.chartRefAway.data = {
      datasets: [
        {
          label: 'Posição Mandante x Total Escanteios Jogo',
          data: dados
        }
      ]
    }

    if (this.chartRefAway != null && this.chartRefAway != undefined) {
      this.chartRefAway.update();
    }
  }
}
