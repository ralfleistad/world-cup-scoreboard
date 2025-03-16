import { Match } from "../../src/models/Match";
import { Scoreboard } from "../../src/services/Scoreboard";

describe("Scoreboard", () => {
  // Test cases for successful Scoreboard initialization
  test("should initialize Scoreboard with no matches", () => {
    const scoreboard = new Scoreboard();
    expect(scoreboard.getMatches()).toEqual([]);
  });

  // Test cases for successfully starting a match
  test("should successfully start a match", () => {
    const scoreboard = new Scoreboard();
    const match = scoreboard.startMatch("Team A", "Team B");

    expect(match).toBeDefined();
    expect(match.homeTeam).toBe("Team A");
    expect(match.awayTeam).toBe("Team B");
  });

  // Test cases for successfully updating a match score
  test("should successfully update a match score", () => {
    const scoreboard = new Scoreboard();
    const match = scoreboard.startMatch("Team A", "Team B");

    scoreboard.updateScore(match, 1, 0);

    expect(match.getHomeScore()).toBe(1);
    expect(match.getAwayScore()).toBe(0);
  });

  // Test cases for successfully finishing a match
  test("should successfully finish a match", () => {
    const scoreboard = new Scoreboard();
    const match1 = scoreboard.startMatch("Team A", "Team B");
    const match2 = scoreboard.startMatch("Team C", "Team D");

    scoreboard.finishMatch(match1);

    expect(scoreboard.getMatches()).toEqual([match2]);
  });

  // Test cases for getting the summary of matches
  test("should get the summary of matches", () => {
    const scoreboard = new Scoreboard();
    const match1 = scoreboard.startMatch("Team A", "Team B");
    const match2 = scoreboard.startMatch("Team C", "Team D");

    scoreboard.updateScore(match1, 1, 0);
    scoreboard.updateScore(match2, 1, 1);
    scoreboard.updateScore(match2, 2, 1);

    const summary = scoreboard.getSummary();

    expect(summary).toEqual([match2, match1]);
  });

  test("should get empty summary when no matches are played", () => {
    const scoreboard = new Scoreboard();

    expect(scoreboard.getSummary()).toEqual([]);
  });

  // Test cases for error handling when starting a match
  test("should throw an error when starting a match with the same teams", () => {
    const scoreboard = new Scoreboard();

    scoreboard.startMatch("Team A", "Team B");

    expect(() => scoreboard.startMatch("Team A", "Team B")).toThrow(
      "One or more team is already in an existing match."
    );
    expect(() => scoreboard.startMatch("Team A", "Team C")).toThrow(
      "One or more team is already in an existing match."
    );
    expect(() => scoreboard.startMatch("Team C", "Team A")).toThrow(
      "One or more team is already in an existing match."
    );
  });

  test("should throw an error when starting a match with empty team names", () => {
    const scoreboard = new Scoreboard();

    expect(() => scoreboard.startMatch("", "Team B")).toThrow(
      "Both teams must be provided."
    );
    expect(() => scoreboard.startMatch("Team A", "")).toThrow(
      "Both teams must be provided."
    );
    expect(() => scoreboard.startMatch("", "")).toThrow(
      "Both teams must be provided."
    );
  });

  // Test cases for error handling when updating a match score
  test("should throw an error when updating a non-existent match score", () => {
    const scoreboard = new Scoreboard();
    const match = new Match("Team A", "Team B");

    expect(() => scoreboard.updateScore(match, 1, 0)).toThrow(
      "Could not update score for non-existent match. Make sure the match is started."
    );
  });

  test("should throw an error when updating a match score with negative values", () => {
    const scoreboard = new Scoreboard();
    const match = scoreboard.startMatch("Team A", "Team B");

    // Check that thrown error is propagated correctly
    expect(() => scoreboard.updateScore(match, -1, 0)).toThrow(
      "Cannot update score with negative values."
    );
    expect(() => scoreboard.updateScore(match, 0, -1)).toThrow(
      "Cannot update score with negative values."
    );
  });

  // Test cases for error handling when finishing a match
  test("should throw an error when finishing a non-existent match", () => {
    const scoreboard = new Scoreboard();
    const match = new Match("Team A", "Team B");

    expect(() => scoreboard.finishMatch(match)).toThrow(
      "Could not finish non-existent match. Make sure the match is started."
    );
  });
});
