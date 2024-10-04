const conferenceTeams = {
    north: ["Aliens", "Astronauts", "Blizzards", "Crabs", "Defenders", "Dragons", "Eagles", "Hammers", "Ogres", "Riot", "Rocks", "Stars", "Tigers", "Volcanoes", "Wind", "Zombies"],
    east: ["Bears", "Beavers", "Dribblers", "Fighters", "Flames", "Gnomes", "Ice", "Mustangs", "Sailors", "Skeletons", "Tornadoes", "Troopers", "Wasps", "Wings", "Wizards", "Wolves"],
    south: ["Bats", "Comets", "Flash", "Gators", "Gladiators", "Hoopers", "Hustlers", "Longhorns", "Miners", "Monsters", "Mysteries", "Roses", "Sharks", "Snipers", "Silencers", "Whales"],
    west: ["Ballers", "Crusaders", "Dinos", "Dogs", "Explorers", "Frogs", "Jungle", "Knights", "Magicians", "Missiles", "Phantoms", "Pirates", "Scorpions", "Turtles", "Vipers", "Wave"]
};

const teams = {};

class Team {
    constructor(name, conference, wins, losses, standing, overall, teamNum, starters, bench) {
        this.name = name;
        this.conference = conference;
        this.wins = wins;
        this.losses = losses;
        this.standing = standing;
        this.overall = overall;
        this.teamNum = teamNum;
        this.starters = starters;
        this.bench = bench;
    }
}

function createLeague() {
    for (const conference in conferenceTeams) {
        teams[conference] = {};
        for (let i = 0; i < conferenceTeams[conference].length; i++) {
            function starterOvr() {
                return Math.floor(Math.random() * (99 - 80) + 80);
            }
            function benchOvr() {
                return Math.floor(Math.random() * (80 - 69) + 69);
            }
            function teamOvr(starters, bench) {
                let overallSum = 0;
                for (let i = 0; i < 5; i++) {
                    overallSum += starters[i];
                    overallSum += bench[i];
                }
                return Math.round((overallSum + 95) / 10);
            }
            const name = conferenceTeams[conference][i];
            const conferenceName = conference;
            const starters = [starterOvr(), starterOvr(), starterOvr(), starterOvr(), starterOvr()];
            const bench = [benchOvr(), benchOvr(), benchOvr(), benchOvr(), benchOvr()];
            const overall = teamOvr(starters, bench);
            const team = new Team(name, conferenceName, 0, 0, i + 1, overall, i + 1, starters, bench);
            teams[conference][conferenceTeams[conference][i]] = team;
        }
    }
}

function displayStandings() {
    if (document.getElementById("standings-div")) {
        const standingsDiv = document.getElementById("standings-div");
        standingsDiv.remove();
    } 
    const standingsDiv = document.createElement("div");
    const standingsTitle = document.createElement("div");
    const standingsSection = document.createElement("div");
    standingsDiv.id = "standings-div";
    standingsTitle.id = "standings-title";
    standingsSection.id = "standings-section";
    standingsTitle.innerHTML = "Standings";
    document.getElementById("container").append(standingsDiv);
    document.getElementById("standings-div").append(standingsTitle);
    document.getElementById("standings-div").append(standingsSection);
    for (const conference in teams) {
        const conferenceDiv = document.createElement("div");
        const conferenceTitle = document.createElement("div");
        conferenceDiv.id = conference;
        conferenceTitle.id = conference + "-title";
        conferenceTitle.innerHTML = conference;
        document.getElementById("standings-section").append(conferenceDiv);
        document.getElementById(conference).append(conferenceTitle);
        for (let i = 1; i <= 16; i++) {
            console.log(teams[conference]);
            for (const team in teams[conference]) {
                if (teams[conference][team].standing === i) {
                    const teamDiv = document.createElement("div");
                    teamDiv.innerHTML = i + ". " + team + " (" + teams[conference][team].overall + " ovr)" + " (" + teams[conference][team].wins + "-" + teams[conference][team].losses + ")";
                    document.getElementById(conference).append(teamDiv);
                }
            }
        }
    }
}

/*
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

*/
createLeague();
displayStandings();