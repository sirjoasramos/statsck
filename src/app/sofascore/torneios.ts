export const Torneios: any = [
    {
        id: 17,
        idSeason: 37036,
        name: 'Premier League',
        apelido: 'PremierLeague'
    },
    {
        id: 18,
        idSeason: 37154,
        name: 'Championship',
        apelido: 'Championship'       
    },
    {
        id: 35,
        idSeason: 37166,
        name: 'Bundesliga',
        apelido: 'Bundesliga'    
    },
    {
        id: 44,
        idSeason: 37168,
        name: '2. Bundesliga',
        apelido: 'Bundesliga2'       
    },
    {
        id: 8,
        idSeason: 37223,
        name: 'LaLiga',
        apelido: 'Laliga'
    },
    {
        id: 54,
        idSeason: 37225,
        name: 'LaLiga 2',
        apelido: 'Laliga2'
    },
    {
        id: 23,
        idSeason: 37475,
        name: 'Serie A',
        apelido: 'Serieatim'
    },
    {
        id: 53,
        idSeason: 37642,
        name: 'Serie B',
        apelido: 'Seriebtim'
    },
    {
        id: 34,
        idSeason: 37167,
        name: 'Ligue 1',
        apelido: 'Ligueone'
    },
    {
        id: 182,
        idSeason: 37169,
        name: 'Ligue 2',
        apelido: 'Ligue2'
    },
    {
        id: 37,
        idSeason: 36890,
        name: 'Eredivisie',
        apelido: 'Eredivisie'
    },
    {
        id: 131,
        idSeason: 36893,
        name: 'Eerste Divisie',
        apelido: 'Eerstedivisie'
    },
    {
        id: 52,
        idSeason: 37466,
        name: 'Süper Lig',
        apelido: 'Superlig'
    },
    {
        id: 238,
        idSeason: 37358,
        name: 'Primeira Liga',
        apelido: 'Primeiraliga'
    },   
    {
        id: 202,
        idSeason: 37062,
        name: 'Ekstraklasa',
        apelido: 'Polonia'
    },
    {
        id: 13475,
        idSeason: 40377,
        name: 'Copa de la Liga Profesional',
        apelido: 'Argentina'
    },
    {
        id: 136,
        idSeason: 38979,
        name: 'A-League Men',
        apelido: 'Australia'
    },
    {
        id: 24,
        idSeason: 37155,
        name: 'League One',
        apelido: 'Leagueone'      
    },
    {
        id: 25,
        idSeason: 37156,
        name: 'League Two',
        apelido: 'Leaguetwo'
    },
    {
        id: 11653,
        idSeason: 40515,
        name: 'Primera División',
        apelido: 'Chile'
    },
    {
        id: 11539,
        idSeason: 40320,
        name: 'Primera A, Apertura',
        apelido: 'Colombia'
    },
    {
        id: 196,
        idSeason: 40230,
        name: 'J.League',
        apelido: 'Japao'
    },
    {
        id: 325,
        idSeason: 40557,
        name: 'Brasileiro Série A',
        apelido: 'Brasileirao'
    }
];

export enum TorneiosEnum {
    PremierLeague = 0,
    Championship = 1,
    Bundesliga = 2,
    Bundesliga2 = 3,
    Laliga = 4,
    Laliga2 = 5,
    Serieatim = 6,
    Seriebtim = 7,
    Ligueone = 8,
    Ligue2 = 9,
    Eredivisie = 10,
    Eerstedivisie = 11,
    Superlig = 12,
    Primeiraliga = 13,
    Polonia = 14,
    Argentina = 15,
    Australia = 16,
    Leagueone = 17,
    Leaguetwo = 18,
    Chile = 19,
    Colombia = 20,
    Japao = 21,
    Brasileirao = 22
}

export enum TorneiosEnumStr {
    PremierLeague = Torneios[TorneiosEnum.PremierLeague].apelido,
    Championship = Torneios[TorneiosEnum.Championship].apelido,
    Bundesliga = Torneios[TorneiosEnum.Bundesliga].apelido,
    Bundesliga2 = Torneios[TorneiosEnum.Bundesliga2].apelido,
    Laliga = Torneios[TorneiosEnum.Laliga].apelido,
    Laliga2 = Torneios[TorneiosEnum.Laliga2].apelido,
    Serieatim = Torneios[TorneiosEnum.Serieatim].apelido,
    Seriebtim = Torneios[TorneiosEnum.Seriebtim].apelido,
    Ligueone = Torneios[TorneiosEnum.Ligueone].apelido,
    Ligue2 = Torneios[TorneiosEnum.Ligue2].apelido,
    Eredivisie = Torneios[TorneiosEnum.Eredivisie].apelido,
    Eerstedivisie = Torneios[TorneiosEnum.Eerstedivisie].apelido,
    Superlig = Torneios[TorneiosEnum.Superlig].apelido,
    Primeiraliga = Torneios[TorneiosEnum.Primeiraliga].apelido,
    Polonia = Torneios[TorneiosEnum.Polonia].apelido,
    Argentina = Torneios[TorneiosEnum.Argentina].apelido,
    Australia = Torneios[TorneiosEnum.Australia].apelido,
    Leagueone = Torneios[TorneiosEnum.Leagueone].apelido,
    Leaguetwo = Torneios[TorneiosEnum.Leaguetwo].apelido,
    Chile = Torneios[TorneiosEnum.Chile].apelido,
    Colombia = Torneios[TorneiosEnum.Colombia].apelido,
    Japao = Torneios[TorneiosEnum.Japao].apelido,
    Brasileirao = Torneios[TorneiosEnum.Brasileirao].apelido
}