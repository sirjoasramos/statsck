export interface ITorneio {
    getUrlStandings(): void;
    getUrlRounds(): void;
    getUrlRound(): void;

}

export class TorneioApi {

    public urlApi = 'https://api.sofascore.com/api/v1/unique-tournament/$id/season/$idSeason/events/round/';
    public urlApiStandings = 'https://api.sofascore.com/api/v1/unique-tournament/$id/season/$idSeason/standings/total';
    public urlApiRounds = 'https://api.sofascore.com/api/v1/unique-tournament/$id/season/$idSeason/rounds';

}