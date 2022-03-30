
export interface RoundsInfo {
    currentRound: {
      round: number
    },
    rounds: {
      round: number
    }[]
  }
  
  export interface GameInfo {
    id: number,
    date: number,
    status: string
    dateAux: number,
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number,
    tournament: string,
    round?: number,
    homeP?: number,
    awayP?: number
  }

  export interface Game {
    round?: number,
    game: GameInfo
    ballPossession: BallPoss,
    cornerKicks: CornerKicks,
    shots: Shots,
    shotsInTarget: ShotsInTarget,
    shotsOffTarget: ShotsOffTarget,
    shotsBlocked: ShotsBlocked
  }
  
  export enum StatusGame {
    FINISHED = "finished",
    CANCELED = "canceled",
    NOTSTARTED = "notstarted"
  }
  
  export enum TypeStats {
    POSSESSION = 'Possession',
    TVDATA = 'TVData',
    SHOTS = 'Shots',
    SHOTSINBOX = 'Shots inside box',
    SHOTOUTBOX = 'Shots outside box',
    SHOTSEXTRA = 'Shots extra',
    SHOTSINTARGET = 'Shots on target',
    SHOTSOFFTARGET = 'Shots off target',
    SHOTSBLOCKED = 'Blocked shots',
  }
  
  export interface BallPoss {
    home: number,
    away: number;
  }
  
  export interface CornerKicks {
    home: number,
    away: number;
  }

  export interface Shots {
    home: number,
    away: number;
  }

  export interface ShotsInTarget {
    home: number,
    away: number;
  }

  export interface ShotsOffTarget {
    home: number,
    away: number;
  }

  export interface ShotsBlocked {
    home: number,
    away: number;
  }

  
