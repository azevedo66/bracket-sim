const teamA = {
    name: "Team A",
    teamScore: 0,
    players: [
        {name: "Player 1A", rating: 90, points: 0},
        {name: "Player 2A", rating: 90, points: 0},
        {name: "Player 3A", rating: 90, points: 0},
        {name: "Player 4A", rating: 90, points: 0},
        {name: "Player 5A", rating: 90, points: 0}
    ]
};

const teamB = {
    name: "Team B",
    teamScore: 0,
    players: [
        {name: "Player 1B", rating: 80, points: 0},
        {name: "Player 2B", rating: 80, points: 0},
        {name: "Player 3B", rating: 80, points: 0},
        {name: "Player 4B", rating: 80, points: 0},
        {name: "Player 5B", rating: 80, points: 0}
    ]
};

function simulatePlayerScore(player) {
    const randomNum = Math.random() * 100;
    const minFgPercentage = 40;
    const playerFgPercentage = ((player.rating - 69) * 0.5) + minFgPercentage;
    if (randomNum < playerFgPercentage) {
        const pointAmountNum = Math.random() * 100;
        if (pointAmountNum < 70) {
            player.points += 2;
            return 2;
        } else {
            player.points += 3;
            return 3;
        }
    }
    return 0;
}

function simulatePossesion(team) {
    const randomPlayerIndex = Math.floor(Math.random() * team.players.length);
    const player = team.players[randomPlayerIndex];
    const points = simulatePlayerScore(player);
    team.teamScore += points;
}

function simulateGame() {
    const possessions = 100;
    for (let i = 0; i < possessions; i++) {
        simulatePossesion(teamA);
        simulatePossesion(teamB);
    }

    console.log(`Final Score:`);
    console.log(`${teamA.name}: ${teamA.teamScore}`);
    console.log(`${teamB.name}: ${teamB.teamScore}`);
    console.log(`${teamA.name} player scores:`);
    for (let i = 0; i < 5; i++) {
        console.log(`${teamA.players[i].name}: ${teamA.players[i].points} points`);
    }

    console.log(`${teamB.name} player scores:`);
    for (let i = 0; i < 5; i++) {
        console.log(`${teamB.players[i].name}: ${teamB.players[i].points} points`);
    }

}

simulateGame();
