class MatchException extends Error {
  private constructor(message: string) {
    super(message);
    this.name = "MatchException";
  }

  static EmptyTeamName = class extends MatchException {
    constructor() {
      super("Team names cannot be empty.");
    }
  };

  static DuplicateTeamName = class extends MatchException {
    constructor() {
      super("Home and away teams cannot be the same.");
    }
  };

  static NegativeScore = class extends MatchException {
    constructor() {
      super("Cannot update score with negative values.");
    }
  };

  static SameScore = class extends MatchException {
    constructor() {
      super("Cannot update score with the same values.");
    }
  };

  static ScoreDifferenceMoreThanOne = class extends MatchException {
    constructor() {
      super("Cannot update score with more than 1 goal difference.");
    }
  };
}

export default MatchException;
