class ScoreboardException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ScoreboardException";
  }

  static MissingTeam = class extends ScoreboardException {
    constructor() {
      super("Both teams must be provided.");
    }
  };

  static TeamAlreadyInMatch = class extends ScoreboardException {
    constructor() {
      super("One or more team is already in an existing match.");
    }
  };

  static MatchNotFound = class extends ScoreboardException {
    constructor() {
      super("Match not found.");
    }
  };
}

export default ScoreboardException;
