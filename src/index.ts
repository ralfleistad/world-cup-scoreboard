import { createInterface } from "readline";
import { Scoreboard } from "./services/Scoreboard";
import { Match } from "./models/Match";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const scoreboard = new Scoreboard();

function displayMenu() {
  console.log("\n=== Football Scoreboard Menu ===");
  console.log("1. Start new match");
  console.log("2. Update match score");
  console.log("3. Finish match");
  console.log("4. Get summary");
  console.log("5. Exit");
  console.log("==============================\n");
}

function promptUser() {
  displayMenu();
  rl.question("Select an option (1-5): ", handleUserInput);
}

async function handleUserInput(choice: string) {
  try {
    switch (choice) {
      case "1":
        await startNewMatch();
        break;
      case "2":
        await updateScore();
        break;
      case "3":
        await finishMatch();
        break;
      case "4":
        showSummary();
        break;
      case "5":
        console.log("Goodbye!");
        rl.close();
        return;
      default:
        console.log("Invalid option. Please try again.");
        promptUser();
    }
  } catch (error) {
    console.error("Error:", error);
    promptUser();
  }
}

function startNewMatch() {
  return new Promise((resolve) => {
    rl.question("Enter home team name: ", (homeTeam) => {
      rl.question("Enter away team name: ", (awayTeam) => {
        try {
          scoreboard.startMatch(homeTeam, awayTeam);
          console.log(`Match started: ${homeTeam} vs ${awayTeam}`);
        } catch (error) {
          console.error("Error starting match:", error);
        }
        resolve(null);
        promptUser();
      });
    });
  });
}

function getMatchList(): Match[] {
  try {
    return scoreboard.getSummary();
  } catch (error) {
    console.error("Error getting matches:", error);
    return [];
  }
}

function displayMatchList(matches: Match[]): void {
  if (matches.length === 0) {
    console.log("No active matches.");
    return;
  }
  console.log("\nActive matches:");
  matches.forEach((match, index) => {
    console.log(`${index + 1}. ${match.toString()}`);
  });
}

function updateScore() {
  return new Promise((resolve) => {
    const matches = getMatchList();
    if (matches.length === 0) {
      resolve(null);
      promptUser();
      return;
    }

    displayMatchList(matches);
    rl.question("Select match number to update: ", (matchIndex) => {
      const selectedIndex = parseInt(matchIndex) - 1;
      if (
        selectedIndex < 0 ||
        selectedIndex >= matches.length ||
        isNaN(selectedIndex)
      ) {
        console.error("Invalid match selection");
        resolve(null);
        promptUser();
        return;
      }

      const selectedMatch = matches[selectedIndex];
      rl.question("Enter home team score: ", (homeScore) => {
        rl.question("Enter away team score: ", (awayScore) => {
          try {
            scoreboard.updateScore(
              selectedMatch,
              parseInt(homeScore),
              parseInt(awayScore)
            );
            console.log(
              `Score updated for ${selectedMatch.homeTeam} vs ${selectedMatch.awayTeam}`
            );
          } catch (error) {
            console.error("Error updating score:", error);
          }
          resolve(null);
          promptUser();
        });
      });
    });
  });
}

function finishMatch() {
  return new Promise((resolve) => {
    const matches = getMatchList();
    if (matches.length === 0) {
      resolve(null);
      promptUser();
      return;
    }

    displayMatchList(matches);
    rl.question("Select match number to finish: ", (matchIndex) => {
      const selectedIndex = parseInt(matchIndex) - 1;
      if (
        selectedIndex < 0 ||
        selectedIndex >= matches.length ||
        isNaN(selectedIndex)
      ) {
        console.error("Invalid match selection");
        resolve(null);
        promptUser();
        return;
      }

      const selectedMatch = matches[selectedIndex];
      try {
        scoreboard.finishMatch(selectedMatch);
        console.log(`Match finished: ${selectedMatch.toString()}`);
      } catch (error) {
        console.error("Error finishing match:", error);
      }
      resolve(null);
      promptUser();
    });
  });
}

function showSummary() {
  try {
    const summary = scoreboard.getSummary();
    console.log("\nCurrent Scoreboard Summary:");
    summary.forEach((match) => {
      console.log(match.toString());
    });
  } catch (error) {
    console.error("Error getting summary:", error);
  }
  promptUser();
}

console.log("Welcome to the Football Scoreboard System!");
promptUser();
