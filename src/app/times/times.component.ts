import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Torneios } from '../sofascore/torneios';
import { TorneioClass } from '../torneio/classes/TorneioClass';
import { TimesService } from './times.service';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.css']
})
export class TimesComponent implements OnInit, OnChanges {

  @Input()
  torneio: string = '';

  @Output()
  timeSelecionado: EventEmitter<String> = new EventEmitter();

  teams: any[] = [];

  torneioClass!: TorneioClass;

  constructor(private service: TimesService) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    this.teams = [];
    if (changes['torneio'].currentValue) {
      this.teams = [];
      let t = Torneios.find((el: any) => {
        return el.id == parseInt(this.torneio);
      });
      this.torneioClass = new TorneioClass(t.id, t.apelido, t.idSeason);
      this.getData();
    }
  }

  change($event: any) {
    const time = $event.target.value;
    this.timeSelecionado.emit(time);
  }

  getData() {
    this.service.getDataTeams(this.torneioClass.getUrlStandings()).subscribe(
      (data: any) => {
        for (let i = 0; i < 8; i++) {//gambiarra para torneios com grupos
          if (data.standings[i] != undefined) {
            data.standings[i].rows.forEach((el: any) => {
              this.teams.push(el.team.shortName);
            });
          }
        }
      }
    )
  }

}
