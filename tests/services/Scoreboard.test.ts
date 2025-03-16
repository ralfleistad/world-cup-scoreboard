import { Match } from "../../src/models/Match";
import { Scoreboard } from "../../src/services/Scoreboard";
import ScoreboardException from "../../src/services/ScoreboardException";

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

  test("should set the start time of the match", () => {
    const scoreboard = new Scoreboard();
    const match = scoreboard.startMatch("Team A", "Team B");

    expect(match.getStartTime()).toBeGreaterThan(0);
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
      ScoreboardException.TeamAlreadyInMatch
    );
    expect(() => scoreboard.startMatch("Team A", "Team C")).toThrow(
      ScoreboardException.TeamAlreadyInMatch
    );
    expect(() => scoreboard.startMatch("Team C", "Team A")).toThrow(
      ScoreboardException.TeamAlreadyInMatch
    );
  });

  test("should throw an error when starting a match with empty team names", () => {
    const scoreboard = new Scoreboard();

    expect(() => scoreboard.startMatch("", "Team B")).toThrow(
      ScoreboardException.MissingTeam
    );
    expect(() => scoreboard.startMatch("Team A", "")).toThrow(
      ScoreboardException.MissingTeam
    );
    expect(() => scoreboard.startMatch("", "")).toThrow(
      ScoreboardException.MissingTeam
    );
  });

  // Test cases for error handling when updating a match score
  test("should throw an error when updating a non-existent match score", () => {
    const scoreboard = new Scoreboard();
    const match = new Match("Team A", "Team B");

    expect(() => scoreboard.updateScore(match, 1, 0)).toThrow(
      ScoreboardException.MatchNotFound
    );
  });

  // Test cases for error handling when finishing a match
  test("should throw an error when finishing a non-existent match", () => {
    const scoreboard = new Scoreboard();
    const match = new Match("Team A", "Team B");

    expect(() => scoreboard.finishMatch(match)).toThrow(
      ScoreboardException.MatchNotFound
    );
  });
});
