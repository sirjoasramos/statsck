import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Torneios } from '../sofascore/torneios';

@Component({
  selector: 'app-torneio',
  templateUrl: './torneio.component.html',
  styleUrls: ['./torneio.component.css']
})
export class TorneioComponent implements OnInit {

  @Output()
  torneio: EventEmitter<any> = new EventEmitter();

  torneioList = Torneios;

  constructor() { }

  ngOnInit(): void {
  }

  change($event: any) {
    this.torneio.emit($event.target.value);
  }
}
