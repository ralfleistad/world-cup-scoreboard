import { v4 as uuidv4 } from "uuid";
import { Match } from "../models/Match";
import ScoreboardException from "./ScoreboardException";

export class Scoreboard {
  private readonly id: string = uuidv4();
  private matches: Match[] = [];

  startMatch(homeTeam: string, awayTeam: string): Match {
    if (!homeTeam || !awayTeam) {
      throw new ScoreboardException.MissingTeam();
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
      throw new ScoreboardException.TeamAlreadyInMatch();
    }

    const match = new Match(homeTeam, awayTeam);
    this.matches.push(match);
    return match;
  }

  updateScore(match: Match, homeScore: number, awayScore: number): void {
    const matchToUpdate = this.findMatch(match);
    if (!matchToUpdate) {
      throw new ScoreboardException.MatchNotFound();
    }
    matchToUpdate.updateScore(homeScore, awayScore);
  }

  finishMatch(matchToFinish: Match): void {
    const index = this.matches.findIndex(
      (match) => match.getId() === matchToFinish.getId()
    );
    if (index === -1) {
      throw new ScoreboardException.MatchNotFound();
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
    return this.matches.find((m) => m.getId() === match.getId());
  }

  getMatches(): Match[] {
    return this.matches;
  }

  getId(): string {
    return this.id;
  }
}
