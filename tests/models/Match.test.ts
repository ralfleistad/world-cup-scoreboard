import { Match } from "../../src/models/Match";

describe("Match", () => {
  // Test cases for successful match creation
  test("should initialize match with correct teams", () => {
    const homeTeam = "Team A";
    const awayTeam = "Team B";
    const match = new Match(homeTeam, awayTeam);

    expect(match.homeTeam).toBe(homeTeam);
    expect(match.awayTeam).toBe(awayTeam);
  });

  test("should initialize match with 0-0 score", () => {
    const match = new Match("Team A", "Team B");

    expect(match.getHomeScore()).toBe(0);
    expect(match.getAwayScore()).toBe(0);
  });

  // Test cases for successful score updates
  test("should update score correctly", () => {
    const match = new Match("Team A", "Team B");

    match.updateScore(1, 0);
    expect(match.getHomeScore()).toBe(1);
    expect(match.getAwayScore()).toBe(0);

    match.updateScore(2, 0);
    expect(match.getHomeScore()).toBe(2);
    expect(match.getAwayScore()).toBe(0);

    match.updateScore(2, 1);
    expect(match.getHomeScore()).toBe(2);
    expect(match.getAwayScore()).toBe(1);
  });

  test("should get total score correctly", () => {
    const match = new Match("Team A", "Team B");

    expect(match.getTotalScore()).toBe(0);

    match.updateScore(1, 0);
    expect(match.getTotalScore()).toBe(1);

    match.updateScore(2, 1);
    expect(match.getTotalScore()).toBe(3);
  });

  // Test cases for match creation error handling
  test("should not allow same team for home and away", () => {
    expect(() => new Match("Team A", "Team A")).toThrow(
      "Home and away teams cannot be the same."
    );
    expect(() => new Match("team a", "Team A")).toThrow(
      "Home and away teams cannot be the same."
    );
  });

  test("should not allow empty team names", () => {
    expect(() => new Match("", "Team B")).toThrow(
      "Team names cannot be empty."
    );
    expect(() => new Match("Team A", "")).toThrow(
      "Team names cannot be empty."
    );
  });

  // Test cases for score update error handling
  test("should not allow score updates with negative scores", () => {
    const match = new Match("Team A", "Team B");
    expect(() => match.updateScore(-1, 0)).toThrow(
      "Cannot update score with negative values."
    );
    expect(() => match.updateScore(0, -1)).toThrow(
      "Cannot update score with negative values."
    );
  });

  test("should not allow updating score with the same value", () => {
    const match = new Match("Team A", "Team B");
    match.updateScore(1, 0);
    expect(() => match.updateScore(1, 0)).toThrow(
      "Cannot update score with the same values."
    );
  });

  test("should not allow updating team score with more than 1 goal difference", () => {
    const match = new Match("Team A", "Team B");
    match.updateScore(1, 1);
    expect(() => match.updateScore(3, 2)).toThrow(
      "Cannot update score with more than 1 goal difference."
    );
    expect(() => match.updateScore(2, 3)).toThrow(
      "Cannot update score with more than 1 goal difference."
    );
  });
});
