export class Match {
  public readonly homeTeam: string;
  public readonly awayTeam: string;
  private homeScore: number = 0;
  private awayScore: number = 0;
  private readonly startTime: number = Date.now();

  constructor(homeTeam: string, awayTeam: string) {
    if (homeTeam.toLowerCase() === awayTeam.toLowerCase()) {
      throw new Error("Home and away teams cannot be the same.");
    }

    if (!homeTeam || !awayTeam) {
      throw new Error("Team names cannot be empty.");
    }

    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }

  updateScore(newHomeScore: number, newAwayScore: number): void {
    if (newHomeScore < 0 || newAwayScore < 0) {
      throw new Error("Cannot update score with negative values.");
    }

    if (this.homeScore === newHomeScore && this.awayScore === newAwayScore) {
      throw new Error("Cannot update score with the same values.");
    }

    if (
      newHomeScore - this.homeScore > 1 ||
      newAwayScore - this.awayScore > 1
    ) {
      throw new Error("Cannot update score with more than 1 goal difference.");
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
}
