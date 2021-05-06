import { User } from '../../../store/auth/interface';

export enum TicTacToeFlag {
    EMPTY = -1,
    RED = 0,
    BLUE = 1,
}

export enum TTTAction {
    TTT_JOIN = 'ttt-join',
    TTT_GET = 'ttt-get',
    TTT_RESTART = 'ttt-restart',
}

export enum TicTacToeStatus {
    'NOT-YET' = 0,
    'PLAYING' = 1,
    'END' = 2,
}

export interface TicTacToePlayer {
    id: string;
    flag: TicTacToeFlag.BLUE | TicTacToeFlag.RED;
    time: number;
    ready: boolean;
    username: string;
    elo: number;
    avatarUrl: string;
    name: string;
}
export interface TicTacToe {
    id: string;
    users: [User, User];
    status: TicTacToeStatus;
    winner: TicTacToeFlag;
    startDate: Date;
    endDate: Date;
}

export interface TicTacToeBoard {
    id: string;
    startDate: Date;
    lastStep: Date;
    status: TicTacToeStatus;
    board: Array<Array<TicTacToeFlag>>;
    currentTurn: boolean;
    users: TicTacToePlayer[];
    isBotMode: boolean;
    winner: TicTacToeFlag;
}
