import { ITorneio, TorneioApi } from "./ITorneio";

export class TorneioImpl implements ITorneio {

    private _id: number;
    private _apelido: string;
    private _season: number;
    public torneio: TorneioApi;

    constructor(id: number, apelido: string, season: number) {
        this._id = id;
        this._apelido = apelido;
        this._season = season;
        this.torneio = new TorneioApi();
    }

    get id(): number{
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get apelido(): string {
        return this._apelido;
    }

    set apelido(value: string) {
        this._apelido = value;
    }

    get season(): number {
        return this._season;
    }

    set season(value: number) {
        this._season = value;
    }

    getUrlStandings(): void {
        throw new Error("Method not implemented.");
    }
    getUrlRounds(): void {
        throw new Error("Method not implemented.");
    }
    getUrlRound(): void {
        throw new Error("Method not implemented.");
    }

}