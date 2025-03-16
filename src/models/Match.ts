import { v4 as uuidv4 } from "uuid";
import MatchException from "./MatchException";

export class Match {
  private readonly id: string = uuidv4();
  public readonly homeTeam: string;
  public readonly awayTeam: string;
  private homeScore: number = 0;
  private awayScore: number = 0;
  private readonly startTime: number = -1;

  constructor(homeTeam: string, awayTeam: string) {
    if (homeTeam.toLowerCase() === awayTeam.toLowerCase()) {
      throw new MatchException.DuplicateTeamName();
    }

    if (!homeTeam || !awayTeam) {
      throw new MatchException.EmptyTeamName();
    }

    const stack = new Error().stack;
    const isCalledFromScoreboard = stack?.includes("Scoreboard.startMatch");

    if (isCalledFromScoreboard) {
      this.startTime = Date.now();
    }

    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }

  updateScore(newHomeScore: number, newAwayScore: number): void {
    if (newHomeScore < 0 || newAwayScore < 0) {
      throw new MatchException.NegativeScore();
    }

    if (this.homeScore === newHomeScore && this.awayScore === newAwayScore) {
      throw new MatchException.SameScore();
    }

    if (
      newHomeScore - this.homeScore > 1 ||
      newAwayScore - this.awayScore > 1
    ) {
      throw new MatchException.ScoreDifferenceMoreThanOne();
    }

    this.homeScore = newHomeScore;
    this.awayScore = newAwayScore;
  }

  toString(): string {
    return `${this.homeTeam} ${this.homeScore} - ${this.awayTeam} ${this.awayScore}`;
  }

  public getHomeScore(): number {
    return this.homeScore;
  }

  public getAwayScore(): number {
    return this.awayScore;
  }

  public getTotalScore(): number {
    return this.homeScore + this.awayScore;
  }

  public getStartTime(): number {
    return this.startTime;
  }

  public getId(): string {
    return this.id;
  }
}
