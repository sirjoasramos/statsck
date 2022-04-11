import { Component, OnChanges, OnInit } from '@angular/core';
import { TimesComponent } from '../times/times.component';
import { TimesService } from '../times/times.service';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-classificacao',
  templateUrl: './classificacao.component.html',
  styleUrls: ['./classificacao.component.css']
})
export class ClassificacaoComponent extends TimesComponent implements OnInit, OnChanges {

  faMapPin = faMapPin;

  constructor(service: TimesService) {
    super(service);
  }

}
