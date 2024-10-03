const teamA = {
    name: "Team A",
    teamScore: 0,
    starters: [
        {name: "Player 1A", rating: 90, points: 0},
        {name: "Player 2A", rating: 90, points: 0},
        {name: "Player 3A", rating: 90, points: 0},
        {name: "Player 4A", rating: 90, points: 0},
        {name: "Player 5A", rating: 90, points: 0}
    ],
    bench: [
        {name: "Player 6A", rating: 75, points: 0},
        {name: "Player 7A", rating: 75, points: 0},
        {name: "Player 8A", rating: 75, points: 0},
        {name: "Player 9A", rating: 75, points: 0},
        {name: "Player 10A", rating: 75, points: 0}
    ]
};

const teamB = {
    name: "Team B",
    teamScore: 0,
    starters: [
        {name: "Player 1B", rating: 80, points: 0},
        {name: "Player 2B", rating: 80, points: 0},
        {name: "Player 3B", rating: 80, points: 0},
        {name: "Player 4B", rating: 80, points: 0},
        {name: "Player 5B", rating: 80, points: 0}
    ],
    bench: [
        {name: "Player 6B", rating: 75, points: 0},
        {name: "Player 7B", rating: 75, points: 0},
        {name: "Player 8B", rating: 75, points: 0},
        {name: "Player 9B", rating: 75, points: 0},
        {name: "Player 10B", rating: 75, points: 0}
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

function simulatePossesion(team, lineup) {
    let player;
    if (lineup === "starters") {
        const randomPlayerIndex = Math.floor(Math.random() * team.starters.length);
        player = team.starters[randomPlayerIndex];
    } else {
        randomPlayerIndex = Math.floor(Math.random() * team.bench.length);
        player = team.bench[randomPlayerIndex];
    }
    const points = simulatePlayerScore(player);
    team.teamScore += points;
}

function simulateGame() {
    const starterPossessions = 50;
    const benchPossesions = 25;
    for (let i = 0; i < starterPossessions; i++) {
        simulatePossesion(teamA, "starters");
        simulatePossesion(teamB, "bench");
    }

    console.log(`Final Score:`);
    console.log(`${teamA.name}: ${teamA.teamScore}`);
    console.log(`${teamB.name}: ${teamB.teamScore}`);
    console.log(`${teamA.name} Starter scores:`);
    for (let i = 0; i < 5; i++) {
        console.log(`${teamA.starters[i].name}: ${teamA.starters[i].points} points`);
    }

    console.log(`${teamB.name} Bench scores:`);
    for (let i = 0; i < 5; i++) {
        console.log(`${teamB.bench[i].name}: ${teamB.bench[i].points} points`);
    }

}

simulateGame();
