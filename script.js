const conferenceTeams = {
    north: ["Aliens", "Astronauts", "Blizzards", "Crabs", "Defenders", "Dragons", "Eagles", "Hammers", "Ogres", "Riot", "Rocks", "Stars", "Tigers", "Volcanoes", "Wind", "Zombies"],
    east: ["Bears", "Beavers", "Dribblers", "Fighters", "Flames", "Gnomes", "Ice", "Mustangs", "Sailors", "Skeletons", "Tornadoes", "Troopers", "Wasps", "Wings", "Wizards", "Wolves"],
    south: ["Bats", "Comets", "Flash", "Gators", "Gladiators", "Hoopers", "Hustlers", "Longhorns", "Miners", "Monsters", "Mysteries", "Roses", "Sharks", "Snipers", "Silencers", "Whales"],
    west: ["Ballers", "Crusaders", "Dinos", "Dogs", "Explorers", "Frogs", "Jungle", "Knights", "Magicians", "Missiles", "Phantoms", "Pirates", "Scorpions", "Turtles", "Vipers", "Wave"]
};

const schedule = {
    day: 1,
    1: [[1, 2], [8, 10], [9, 16], [7, 11], [3, 15], [6, 12], [4, 14], [5, 13]],
    2: [[9, 10], [1, 3], [8, 11], [2, 16], [7, 12], [4, 15], [6, 13], [5, 14]],
    3: [[2, 3], [9, 11], [1, 4], [8, 12], [10, 16], [7, 13], [5, 15], [6, 14]],
    4: [[10, 11], [2, 4], [9, 12], [1, 5], [8, 13], [3, 16], [7, 14], [6, 15]],
    5: [[3, 4], [10, 12], [2, 5], [9, 13], [1, 6], [8, 14], [11, 16], [7, 15]],
    6: [[11, 12], [3, 5], [10, 13], [2, 6], [9, 14], [1, 7], [8, 15], [4, 16]],
    7: [[4, 5], [11, 13], [3, 6], [10, 14], [2, 7], [9, 15], [1, 8], [12, 16]],
    8: [[13, 12], [4, 6], [11, 14], [3, 7], [10, 15], [2, 8], [5, 16], [1, 9]],
    9: [[5, 6], [12, 14], [4, 7], [11, 15], [3, 8], [13, 16], [2, 9], [1, 10]],
    10: [[13, 14], [5, 7], [12, 15], [4, 8], [6, 16], [3, 9], [1, 11], [2, 10]],
    11: [[6, 7], [13, 15], [5, 8], [14, 16], [4, 9], [1, 12], [3, 10]],
    12: [[2, 11], [14, 15], [6, 8], [7, 16], [5, 9], [1, 13], [4, 10]],
    13: [[2, 12], [3, 11], [7, 8], [15, 16], [6, 9], [1, 14], [5, 10]],
    14: [[2, 13], [4, 11], [3, 12], [8, 16], [7, 9], [1, 15], [6, 10]],
    15: [[2, 14], [5, 11], [3, 13], [4, 12], [8, 9], [1, 16], [7, 10]],
    16: [[2, 15], [6, 11], [3, 14], [5, 12], [4, 13]] 
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

function displaySchedule() {
    if (document.getElementById("schedule-div")) {
        const scheduleDiv = document.getElementById("schedule-div");
        scheduleDiv.remove();
    }
    const scheduleDiv = document.createElement("div");
    const scheduleTitle = document.createElement("div");
    const scheduleSection = document.createElement("div");
    scheduleDiv.id = "schedule-div";
    scheduleTitle.id = "schedule-title";
    scheduleSection.id = "schedule-section";
    scheduleTitle.innerHTML = "Schedule";
    document.getElementById("container").append(scheduleDiv);
    document.getElementById("schedule-div").append(scheduleTitle);
    document.getElementById("schedule-div").append(scheduleSection);
    if (schedule.day <= 16) {
        const day = schedule.day.toString();
        for (const conference in teams) {
            const conferenceDiv = document.createElement("div");
            const conferenceTitle = document.createElement("div");
            conferenceDiv.id = conference + "-schedule";
            conferenceTitle.id = "conference-title";
            document.getElementById("schedule-div").append(conferenceDiv);
            document.getElementById(conference + "-title").append(conferenceTitle);
            for (let i = 0; i < schedule[day].length; i++) {
                let team1;
                let team2;
                let record1;
                let record2;
                for (const team in teams[conference]) {
                    if (teams[conference][team].teamNum === schedule[day][i][0]) {
                        team1 = team;
                        record1 = "(" + teams[conference][team].wins + "-" + teams[conference][team].losses + ")";
                    } else if (teams[conference][team].teamNum === schedule[day][i][1]) {
                        team2 = team;
                        record2 = "(" + teams[conference][team].wins + "-" + teams[conference][team].losses + ")";
                    }
                }
                let matchup = document.createElement("div");
                matchup.innerHTML = team1 + " " + record1 + " vs. " + team2 + " " + record2;
                document.getElementById(conference + "-schedule").append(matchup);
            }
        } 
    } else {
        document.getElementById("schedule-div").innerHTML = "No more regular season games";
    }
}

function orderStandings() {
    for (const conference in teams) {
        let teamsArr = [];
        for (const team in teams[conference]) {
            teamsArr.push({name: teams[conference][team].name, wins: teams[conference][team].wins, standing: teams[conference][team].standing});
        }
        teamsArr.sort(function(a, b) {
            return b.wins - a.wins;
        });
        for (let i = 1; i < teamsArr.length + 1; i++) {
            for (const team in teams[conference]) {
                if (teams[conference][team].name === teamsArr[i - 1].name) {
                    teams[conference][team].standing = i;
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
displaySchedule();