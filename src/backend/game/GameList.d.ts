import './GameList'

export = new GameList()

declare class GameList {
    constructor();
    addID(ID: string, game: any);
    removeID(ID: string);
    createGame(): string;
    getGame(ID: string): any;
    hasGame(roomID: string): any;
} 