# Scoreboard
### The scoreboard supports the following operations:
1. Start a new match, assuming initial score 0 – 0 and adding it the scoreboard.
This should capture following parameters:
a. Home team
b. Away team
2. Update score. This should receive a pair of absolute scores: home team score and away
team score.
3. Finish match currently in progress. This removes a match from the scoreboard.
4. Get a summary of matches in progress ordered by their total score. The matches with the
same total score will be returned ordered by the most recently started match in the
scoreboard.

# Assumptions
Some assumptions are made in this implementation to make it behave a bit more similar to how an actual football match would work.
1. A team **must** have a name.
2. A match cannot be created if either of the teams are already playing in an existing match.
3. A match cannot be finished if it is not currently in progress.
4. The score of a team cannot be negative.
5. The score of a team cannot be updated to a value lower than the current score.
6. The score of a team cannot be increased by more than 1 goal at a time.
7. A match's start time is only set when created through the `Scoreboard` class, when the `startMatch` method is called. This is to ensure that the start time is only set when the match is actually started.

# Usage
First, install the dependencies.
```bash
npm install
```

Then, start the CLI by running the following command.
```bash
npm start
```

Run the tests by running the following command.
```bash
npm test
```

