import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SofascoreService } from '../sofascore.service';

@Injectable({
  providedIn: 'root'
})
export class InfoService extends SofascoreService{

  constructor(http: HttpClient) { 
    super(http);
  }

  getGamesToday(i: number) {
    return this.http.get('https://api.sofascore.com/api/v1/sport/football/scheduled-events/' + this.getDay(i));
  }

  getDay(i: number) {
    let today = new Date();
    today.setDate(today.getDate() + i);
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    let m, d;

    m = month < 10 ? '0' + month : month;


    d = day < 10 ? '0' + day : day;

    return year + '-' + m + '-' + d;
  }
}
