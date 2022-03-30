import { TorneioImpl } from "./TorneioImpl"

export class TorneioClass extends TorneioImpl {
    constructor(id: number, apelido: string, season: number) {
        super(id, apelido, season);
    }

    override getUrlStandings() {
        return this.torneio.urlApiStandings
            .replace('$id', this.id.toString())
            .replace('$idSeason', this.season.toString());
    }

    override getUrlRounds() {
        return this.torneio.urlApiRounds
            .replace('$id', this.id.toString())
            .replace('$idSeason', this.season.toString());
    }
    override getUrlRound() {
        return this.torneio.urlApi
            .replace('$id', this.id.toString())
            .replace('$idSeason', this.season.toString());
    }
}