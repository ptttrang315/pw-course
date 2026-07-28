class Team {
    name: string;
    players: string[];

    constructor(name: string) {
        this.name = name;
        this.players = [];
    }

    addPlayer(playerName: string) {
        this.players.push(playerName);
    }

    listPlayers(){
        return this.players;
    }

    
}

const playerNames = [
    'An',
    'Will',
    'Bob',
    'Ray',
    'Bill'
]

const team = new Team ('Team 1');
for(let player of playerNames){
    team.addPlayer(player);
}
console.log(team);

console.log(team.listPlayers());