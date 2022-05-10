
    export class Parameters {
        team: string;
        season: string;
    }

    export class Paging {
        current: number;
        total: number;
    }

    export class Birth {
        date: string;
        place: string;
        country: string;
    }

    export class Player {
        id: number;
        name: string;
        firstname: string;
        lastname: string;
        age: number;
        birth: Birth;
        nationality: string;
        height: string;
        weight: string;
        injured: boolean;
        photo: string;
    }

    export class Team {
        id: number;
        name: string;
        logo: string;
    }

    export class League {
        id?: number;
        name: string;
        country: string;
        logo: string;
        flag?: any;
        season: any;
    }

    export class Games {
        appearences: number;
        lineups: number;
        minutes: number;
        number?: any;
        position: string;
        rating: string;
        captain: boolean;
    }

    export class Substitutes {
        in: number;
        out: number;
        bench: number;
    }

    export class Shots {
        total?: number;
        on?: number;
    }

    export class Goals {
        total: number;
        conceded?: number;
        assists?: number;
        saves?: number;
    }

    export class Passes {
        total?: number;
        key?: number;
        accuracy?: number;
    }

    export class Tackles {
        total?: number;
        blocks?: number;
        interceptions?: number;
    }

    export class Duels {
        total?: number;
        won?: number;
    }

    export class Dribbles {
        attempts?: number;
        success?: number;
        past?: any;
    }

    export class Fouls {
        drawn?: number;
        committed?: number;
    }

    export class Cards {
        yellow: number;
        yellowred: number;
        red: number;
    }

    export class Penalty {
        won?: any;
        commited?: any;
        scored?: number;
        missed?: number;
        saved?: number;
    }

    export class Statistic {
        team: Team;
        league: League;
        games: Games;
        substitutes: Substitutes;
        shots: Shots;
        goals: Goals;
        passes: Passes;
        tackles: Tackles;
        duels: Duels;
        dribbles: Dribbles;
        fouls: Fouls;
        cards: Cards;
        penalty: Penalty;
    }

    export class Response {
        player: Player;
        statistics: Statistic[];
    }

    export class RootObject {
        get: string;
        parameters: Parameters;
        errors: any[];
        results: number;
        paging: Paging;
        response: Response[];
    }



