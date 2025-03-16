import { Match } from "../models/Match";

export class Scoreboard {
  private matches: Match[] = [];

  startMatch(homeTeam: string, awayTeam: string): Match {
    if (!homeTeam || !awayTeam) {
      throw new Error("Both teams must be provided.");
    }

    const homeTeamAlreadyExists = this.matches.some(
      (match) =>
        match.homeTeam.toLowerCase() === homeTeam.toLowerCase() ||
        match.awayTeam.toLowerCase() === homeTeam.toLowerCase()
    );
    const awayTeamAlreadyExists = this.matches.some(
      (match) =>
        match.homeTeam.toLowerCase() === awayTeam.toLowerCase() ||
        match.awayTeam.toLowerCase() === awayTeam.toLowerCase()
    );

    if (homeTeamAlreadyExists || awayTeamAlreadyExists) {
      throw new Error("One or more team is already in an existing match.");
    }

    const match = new Match(homeTeam, awayTeam);
    this.matches.push(match);
    return match;
  }

  updateScore(match: Match, homeScore: number, awayScore: number): void {
    const matchToUpdate = this.findMatch(match);
    if (!matchToUpdate) {
      throw new Error(
        "Could not update score for non-existent match. Make sure the match is started."
      );
    }
    matchToUpdate.updateScore(homeScore, awayScore);
  }

  finishMatch(matchToFinish: Match): void {
    const index = this.matches.findIndex(
      (match) =>
        match.homeTeam === matchToFinish.homeTeam &&
        match.awayTeam === matchToFinish.awayTeam
    );
    if (index === -1) {
      throw new Error(
        "Could not finish non-existent match. Make sure the match is started."
      );
    }
    this.matches.splice(index, 1);
  }

  getSummary(): Match[] {
    return [...this.matches].sort((a, b) => {
      const scoreDiff = b.getTotalScore() - a.getTotalScore();
      return scoreDiff !== 0 ? scoreDiff : b.getStartTime() - a.getStartTime();
    });
  }

  private findMatch(match: Match): Match | undefined {
    return this.matches.find(
      (m) => m.homeTeam === match.homeTeam && m.awayTeam === match.awayTeam
    );
  }

  getMatches(): Match[] {
    return this.matches;
  }
}
