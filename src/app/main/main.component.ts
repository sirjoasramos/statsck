import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{

  torneioSelecionado: any;
  timeSelecionado: String = '';

  setParentTorneio($event: any) {
    this.torneioSelecionado = $event;
  }

  setParentTime($event: any){
    this.timeSelecionado = $event;
  }

}
