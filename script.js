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

const firstRoundMatchups = [[1, 16], [8, 9], [5, 12], [4, 13], [6, 11], [3, 14], [7, 10], [2, 15]];

const teams = {};

const bracketMatchups = {
    round: 0
};

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
                return Math.floor(Math.random() * (99 - 70) + 70);
            }
            function benchOvr() {
                return Math.floor(Math.random() * (70 - 60) + 60);
            }
            function teamOvr(starters, bench) {
                let overallSum = 0;
                for (let i = 0; i < 5; i++) {
                    overallSum += starters[i];
                    overallSum += bench[i];
                }
                return Math.round((overallSum + 145) / 10);
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
        conferenceTitle.id = conference + "-title-standings";
        conferenceTitle.innerHTML = conference;
        document.getElementById("standings-section").append(conferenceDiv);
        document.getElementById(conference).append(conferenceTitle);
        for (let i = 1; i <= 16; i++) {
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
            conferenceTitle.id = conference + "-title-schedule";
            document.getElementById("schedule-div").append(conferenceDiv);
            document.getElementById(conference + "-schedule").append(conferenceTitle);
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

function simulateGame(team1, team2) {
    const starterPossessions = 50;
    const benchPossessions = 25;
    let teamScore1 = 0;
    let teamScore2 = 0;
    for (let i = 0; i < starterPossessions; i++) {
        const possession1 = simulatePossession(team1, "starters");
        const possession2 = simulatePossession(team2, "starters");
        teamScore1 += possession1;
        teamScore2 += possession2;
    }
    for (let i = 0; i < benchPossessions; i++) {
        const possession1 = simulatePossession(team1, "bench");
        const possession2 = simulatePossession(team2, "bench");
        teamScore1 += possession1;
        teamScore2 += possession2;
    }
    if (teamScore1 > teamScore2) {
        return team1;
    } else if (teamScore2 > teamScore1) {
        return team2;
    } else {
        const randomWinner = Math.floor(Math.random());
        if (randomWinner === 1) {
            return team1;
        } else {
            return team2;
        }
    }
}

function simulatePossession(team, lineup) {
    let player;
    if (lineup === "starters") {
        const randomPlayerIndex = Math.floor(Math.random() * team.starters.length);
        player = team.starters[randomPlayerIndex];
    } else {
        const randomPlayerIndex = Math.floor(Math.random() * team.bench.length);
        player = team.bench[randomPlayerIndex];
    }
    const points = simulatePlayerScore(player);
    return points;
}

function simulatePlayerScore(player) {
    const randomNum = Math.random() * 100;
    const minFgPercentage = 40;
    const playerFgPercentage = ((player - 69) * 0.5) + minFgPercentage;
    if (randomNum < playerFgPercentage) {
        const pointAmountNum = Math.random() * 100;
        if (pointAmountNum < 70) {
            return 2;
        } else {
            return 3;
        }
    }
    return 0;
}

function simDay() {
    const day = schedule.day.toString();
    for (const conference in teams) {
        for (let i = 0; i < schedule[day].length; i++) {
            let team1;
            let team2;
            for (const team in teams[conference]) {
                if (teams[conference][team].teamNum === schedule[day][i][0]) {
                    team1 = teams[conference][team];
                } else if (teams[conference][team].teamNum === schedule[day][i][1]) {
                    team2 = teams[conference][team];
                }
            }
            const winner = simulateGame(team1, team2);
            if (winner.name === team1.name) {
                teams[conference][team1.name].wins += 1;
                teams[conference][team2.name].losses += 1; 
            } else if (winner.name === team2.name) {
                teams[conference][team1.name].losses += 1;
                teams[conference][team2.name].wins += 1;
            }
        }
    }
    schedule.day += 1;
}

function createBracketMatchups() {
    if (bracketMatchups.round === 1) {
        let roundMatchups = [];
        for (const conference in teams) {
            for (let i = 0; i < firstRoundMatchups.length; i++) {
                let team1;
                let team2;
                for (const team in teams[conference]) {
                    if (teams[conference][team].standing === firstRoundMatchups[i][0]) {
                        team1 = teams[conference][team];
                    } else if (teams[conference][team].standing === firstRoundMatchups[i][1]) {
                        team2 = teams[conference][team];
                    }
                }
                roundMatchups.push([team1, team2]);
            }
        }
        bracketMatchups[1] = roundMatchups;
    }
    console.log(bracketMatchups);
}

function displayBracket() {
    const bracketDiv = document.createElement("div");
    bracketDiv.id = "bracket-div";
    document.getElementById("container").append(bracketDiv);
    for (const round in bracketMatchups) {        
        if (round !== "round") {
            const roundSection = document.createElement("div");
            const roundTitle = document.createElement("div");
            roundSection.id = round + "-section"; 
            roundTitle.id = "round-title-" + round;
            roundTitle.innerHTML = "Round " + round;
            document.getElementById("bracket-div").append(roundTitle);
            document.getElementById("bracket-div").append(roundSection);
            for (let i = 0; i < bracketMatchups[round].length; i++) {
                const matchupDiv = document.createElement("div");
                const teamDiv1 = document.createElement("div");
                const teamDiv2 = document.createElement("div");
                matchupDiv.id = round + "-matchup-" + (i + 1);
                teamDiv1.id = round + "-matchup-" + (i + 1) + "-team-1";
                teamDiv2.id = round + "-matchup-" + (i + 1) + "-team-2";
                teamDiv1.innerHTML = bracketMatchups[round][i][0].name;
                teamDiv2.innerHTML = bracketMatchups[round][i][1].name;
                document.getElementById(round + "-section").append(matchupDiv);
                document.getElementById(round + "-matchup-" + (i + 1)).append(teamDiv1);
                document.getElementById(round + "-matchup-" + (i + 1)).append(teamDiv2);
            }
        }
        
    }
}

function clearAllElements() {
    document.getElementById("container").innerHTML = "";
}

function refreshScreen() {
    clearAllElements();
    if (bracketMatchups.round === 0) {
        const button = document.createElement("button");
        button.id = "simulateGameBtn";
        button.innerHTML = "Simulate Game";
        document.getElementById("container").append(button);
        button.addEventListener("click", function() {
            if (schedule.day <= 17) {
                if (schedule.day <= 16) {
                    simDay();
                    refreshScreen();
                } else if (schedule.day === 17) {
                    bracketMatchups.round += 1;
                    schedule.day += 1;
                    refreshScreen();
                }
            }
        });
        orderStandings();
        displayStandings();
        displaySchedule();
    } else {
        if (bracketMatchups.round === 1) {
            createBracketMatchups();
        }
        displayBracket();
    }
}

function start() {
    createLeague();
    refreshScreen();
}

start();
