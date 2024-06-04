const conferenceTeams = {
    north: ["Aliens", "Astronauts", "Blizzards", "Crabs", "Defenders", "Dragons", "Eagles", "Hammers", "Ogres", "Riot", "Rocks", "Stars", "Tigers", "Volcanoes", "Wind", "Zombies"],
    east: ["Bears", "Beavers", "Dribblers", "Fighters", "Flames", "Gnomes", "Ice", "Mustangs", "Sailors", "Skeletons", "Tornadoes", "Troopers", "Wasps", "Wings", "Wizards", "Wolves"],
    south: ["Bats", "Comets", "Flash", "Gators", "Gladiators", "Hoopers", "Hustlers", "Longhorns", "Miners", "Monsters", "Mysteries", "Roses", "Sharks", "Snipers", "Silencers", "Whales"],
    west: ["Ballers", "Crusaders", "Dinos", "Dogs", "Explorers", "Frogs", "Jungle", "Knights", "Magicians", "Missiles", "Phantoms", "Pirates", "Scorpions", "Turtles", "Vipers", "Wave"]
}

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
}

const firstRoundMatchups = [[1, 16], [8, 9], [5, 12], [4, 13], [6, 11], [3, 14], [7, 10], [2, 15]];

let bracketRound = 0;

let teams = {}

let bracketMatchups = {}

function Team(name, conference, wins, losses, standing, overall, teamNum, pg, sg, sf, pf, c) {
    this.name = name;
    this.conference = conference;
    this.wins = wins; 
    this.losses = losses;
    this.standing = standing;
    this.overall = overall;
    this.teamNum = teamNum;
    this.pg = pg;
    this.sg = sg;
    this.sf = sf;
    this.pf = pf; 
    this.c = c;
}

function createLeague() {
    for (const conference in conferenceTeams) {
        teams[conference] = {};
        for (let i = 0; i < conferenceTeams[conference].length; i++) {
            let name = conferenceTeams[conference][i];
            let conferenceName = conference;
            let pg = Math.floor(Math.random() * (99 - 70) + 70);
            let sg = Math.floor(Math.random() * (99 - 70) + 70);
            let sf = Math.floor(Math.random() * (99 - 70) + 70);
            let pf = Math.floor(Math.random() * (99 - 70) + 70);
            let c = Math.floor(Math.random() * (99 - 70) + 70);
            let overall = Math.round((pg + sg + sf + pf + c) / 5);
            let team = new Team(name, conferenceName, 0, 0, i + 1, overall, i + 1, pg, sg, sf, pg, c);
            teams[conference][conferenceTeams[conference][i]] = team;
        }
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

function displayStandings() {
    if (document.getElementById("standings-div")) {
        let standingsDiv = document.getElementById("standings-div");
        let standingsTitle = document.getElementById("standings-title");
        standingsDiv.remove();
        standingsTitle.remove();
    }
    let standingsDiv = document.createElement("div");
    let standingsTitle = document.createElement("div");
    standingsDiv.id = "standings-div";
    standingsTitle.id = "standings-title";
    standingsTitle.innerHTML = "Standings";
    document.getElementById("standings").append(standingsTitle);
    document.getElementById("standings").append(standingsDiv);
    for (const conference in teams) {
        let conferenceDiv = document.createElement("div");
        conferenceDiv.id = conference;
        document.getElementById("standings-div").append(conferenceDiv);
        let conferenceTitle = document.createElement("div");
        conferenceTitle.id = conference + "-title";
        conferenceTitle.className = "conference-title";
        document.getElementById(conference).append(conferenceTitle);
        conferenceTitle.innerHTML = conference;
        for (let i = 1; i <= 16; i++) {
            for (const team in teams[conference]) {
                if (teams[conference][team].standing === i) {
                    let teamDiv = document.createElement("div");
                    teamDiv.innerHTML = i + ". " + team + " (" + teams[conference][team].overall + " ovr)" + " (" + teams[conference][team].wins + "-" + teams[conference][team].losses + ")";
                    document.getElementById(conference).append(teamDiv);
                }
            }
        }   
    }
}

function displaySchedule() {
    if (document.getElementById("schedule-div")) {
        let scheduleDiv = document.getElementById("schedule-div");
        let scheduleTitle = document.getElementById("schedule-title");
        scheduleDiv.remove();
        scheduleTitle.remove();
    }
    let scheduleDiv = document.createElement("div");
    let scheduleTitle = document.createElement("div");
    scheduleDiv.id = "schedule-div";
    scheduleTitle.id = "schedule-title";
    scheduleTitle.innerHTML = "Schedule";
    document.getElementById("standings").append(scheduleTitle);
    document.getElementById("standings").append(scheduleDiv);
    if (schedule.day <= 16) {
        let day = schedule.day.toString();
        for (const conference in teams) {
            let conferenceDiv = document.createElement("div");
            let conferenceTitle = document.createElement("div");
            conferenceDiv.id = conference + "-schedule";
            conferenceTitle.className = "conference-title";
            conferenceTitle.innerHTML = conference;
            document.getElementById("schedule-div").append(conferenceDiv);
            document.getElementById(conference + "-schedule").append(conferenceTitle);
            for (let i = 0; i < schedule[day].length; i++) {
                let team1;
                let team2;
                let record1;
                let record2;
                for (const team in teams[conference]) {
                    if (teams[conference][team].standing === schedule[day][i][0]) {
                        team1 = team;
                        record1 = "(" + teams[conference][team].wins + "-" + teams[conference][team].losses + ")";
                    } else if (teams[conference][team].standing === schedule[day][i][1]) {
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

function displayBracket() {
    if (document.getElementById("bracket-div")) {
        let bracketDiv = document.getElementById("bracket-div");
        let finalsSection = document.getElementById("finals-section");
        bracketDiv.remove();
        finalsSection.remove();
    }
    let finalsSection = document.createElement("div");
    let finalsTitle = document.createElement("div");
    let finalsMatchup = document.createElement("div");
    let finalsTeam1 = document.createElement("div");
    let finalsTeam2 = document.createElement("div");
    let finalsWinner = document.createElement("div");
    finalsSection.id = "finals-section";
    finalsTitle.id = "finals-title";
    finalsMatchup.id = "finals-matchup";
    finalsTeam1.id = "finals-team-1";
    finalsTeam2.id = "finals-team-2";
    finalsWinner.id = "finals-winner";
    finalsTitle.innerHTML = "Championship";
    finalsMatchup.className = "matchup";
    finalsTeam1.className = "team";
    finalsTeam2.className = "team";
    document.getElementById("bracket").append(finalsSection);
    document.getElementById("finals-section").append(finalsTitle);
    document.getElementById("finals-section").append(finalsMatchup);
    document.getElementById("finals-matchup").append(finalsTeam1);
    document.getElementById("finals-matchup").append(finalsTeam2);
    document.getElementById("finals-section").append(finalsWinner);
    let bracketDiv = document.createElement("div");
    bracketDiv.id = "bracket-div";
    document.getElementById("bracket").append(bracketDiv);
    for (let i = 1; i <= 9; i++) {
        let bracketSection = document.createElement("div");
        bracketSection.id = "bracket-section-" + i;
        bracketSection.className = "bracket-section";
        document.getElementById("bracket-div").append(bracketSection);
    }
    for (let i = 1; i <= 5; i++) {
        let iteration = 64;
        for (let j = 0; j < i; j++) {
            iteration /= 2;
        }
        for (let j = 1; j <= iteration; j++) {
            let bracketMatchup = document.createElement("div");
            let matchupTeam1 = document.createElement("div");
            let matchupTeam2 = document.createElement("div");
            bracketMatchup.id = "round-" + i + "-matchup-" + j;
            matchupTeam1.id = "round-" + i + "-matchup-" + j + "-team-" + 1;
            matchupTeam2.id = "round-" + i + "-matchup-" + j + "-team-" + 2;
            bracketMatchup.className = "matchup";
            matchupTeam1.className = "team";
            matchupTeam2.className = "team";
            if (j <= iteration / 2) {
                document.getElementById("bracket-section-" + i).append(bracketMatchup);
                document.getElementById("round-" + i + "-matchup-" + j).append(matchupTeam1);
                document.getElementById("round-" + i + "-matchup-" + j).append(matchupTeam2);
            } else {
                document.getElementById("bracket-section-" + (10 - i)).append(bracketMatchup)
                document.getElementById("round-" + i + "-matchup-" + j).append(matchupTeam1);
                document.getElementById("round-" + i + "-matchup-" + j).append(matchupTeam2);
            }
        }
    }
    for (const round in bracketMatchups) {
        if (round < 6) {
            for (let i = 1; i <= bracketMatchups[round].length; i++) {
                let team1 = bracketMatchups[round][i - 1][0];
                let team2 = bracketMatchups[round][i - 1][1];
                document.getElementById("round-" + round + "-matchup-" + i + "-team-" + 1).innerHTML = team1.standing + ". " + team1.name + " (" + team1.overall + ")";
                document.getElementById("round-" + round + "-matchup-" + i + "-team-" + 2).innerHTML = team2.standing + ". " + team2.name + " (" + team2.overall + ")";
            }
        } else if (round == 6) {
            let team1 = bracketMatchups[round][0][0];
            let team2 = bracketMatchups[round][0][1];
            document.getElementById("finals-team-1").innerHTML = team1.standing + ". " + team1.name + " (" + team1.overall + ")";
            document.getElementById("finals-team-2").innerHTML = team2.standing + ". " + team2.name + " (" + team2.overall + ")";
        } else if (round == 7) {
            let winner = bracketMatchups[round][0];
            document.getElementById("finals-winner").innerHTML = "Champions: " + winner.name + " (" + winner.overall + ")";
        }
    }
}

function playGame(team1, team2) {
    let teamScore1 = Math.floor(Math.random() * ((team1.overall * 2) - 100)) + 100;
    let teamScore2 = Math.floor(Math.random() * ((team2.overall * 2) - 100)) + 100;
    if (teamScore1 > teamScore2) {
        return team1;
    } else if (teamScore1 < teamScore2) {
        return team2;
    } else {
        let winningNum = Math.round(Math.random());
        if (winningNum === 1) {
            return team1;
        } else {
            return team2;
        }
    }
}

function simDay() {
    let day = schedule.day.toString();
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
            let winner = playGame(team1, team2);
            if (winner.name === team1.name) {
                teams[conference][team1.name].wins += 1;
                teams[conference][team2.name].losses += 1;
            } else if (winner.name === team2.name) {
                teams[conference][team2.name].wins += 1;
                teams[conference][team1.name].losses += 1;
            }
        }
    }
}

function createInitialMatchups() {
    if (bracketRound === 1) {
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
        bracketMatchups["1"] = roundMatchups;
    }
    displayBracket();
}

function simRound() {
    let roundMatchups = bracketMatchups[bracketRound];
    if (bracketRound > 5) {
        let team1 = roundMatchups[0][0];
        let team2 = roundMatchups[0][1];
        let winner = playGame(team1, team2);
        bracketMatchups[bracketRound + 1] = [winner];
    } else {
        let nextRoundMatchups = [];
        for (let i = 0; i < roundMatchups.length; i += 2) {
            let team1 = roundMatchups[i][0];
            let team2 = roundMatchups[i][1];
            let team3 = roundMatchups[i + 1][0];
            let team4 = roundMatchups[i + 1][1];
            let winner1 = playGame(team1, team2);
            let winner2 = playGame(team3, team4);
            nextRoundMatchups.push([winner1, winner2]);
        }
        bracketMatchups[bracketRound + 1] = nextRoundMatchups;
    }
    displayBracket();
}

function standingsBtn() {
    document.getElementById("standings").style.display = "block";
    document.getElementById("bracket").style.display = "none";
    document.getElementById("user-bracket").style.display = "none";
}

function simGameBtn() {
    if (schedule.day <= 17) {
        if (schedule.day <= 16) {
            simDay();
        } else if (schedule.day === 17) {
            bracketRound = 1;
            bracketBtn();
        }
        orderStandings();
        displayStandings();
        displaySchedule();
        schedule.day += 1;
    }
}

function simSeasonBtn() {
    while (schedule.day <= 17) {
        if (schedule.day <= 16) {
            simDay();
        } else if (schedule.day === 17) {
            bracketRound = 1;
            bracketBtn();
        }
        orderStandings();
        displayStandings();
        displaySchedule();
        schedule.day += 1;
    }
    
}

function bracketBtn() {
    document.getElementById("standings").style.display = "none";
    document.getElementById("bracket").style.display = "block";
    document.getElementById("user-bracket").style.display = "none";
    createInitialMatchups();
}

function simRoundBtn() {
    if (bracketRound > 0 && bracketRound <= 7) {
        if (bracketRound < 7) {
            simRound();
            bracketRound++;
        } else {
            bracketRound++;
        }
        
    }
}

function startBtn() {
    document.getElementById("standings").style.display = "block";
    document.getElementById("bracket").style.display = "none";
    document.getElementById("user-bracket").style.display = "none";
    createLeague();
    orderStandings();
    displayStandings();
    displaySchedule();
}