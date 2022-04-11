import { Component, OnInit } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{

  faCog = faCog;

  torneioSelecionado: any;
  timeSelecionado: String = '';

  setParentTorneio($event: any) {
    this.torneioSelecionado = $event;
  }

  setParentTime($event: any){
    this.timeSelecionado = $event;
  }

}
