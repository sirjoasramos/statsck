import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimesService {

  constructor(private http: HttpClient) { }

  getDataTeams(urlTeams: string) {
    return this.http.get(urlTeams);
  } 

}
