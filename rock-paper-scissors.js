import * as readline from "node:readline/promises";
import colors from "ansi-colors";

/*
 * Rock Paper Scissors game
 */

const options = ["paper", "scissors", "rock"];

const userWinningChoice = {
  rock: "paper",
  scissors: "rock",
  paper: "scissors",
};

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("You're playing 'Rock Paper Scissors'");

const playGame = async () => {
  while (true) {
    const answer = await prompt.question(
      `Type "rock", "paper" or "scissors" in the terminal and press enter to confirm your choice\n`
    );

    const userChoice = answer.toLowerCase().trim();

    if (!options.includes(userChoice)) {
      console.log(
        `"${answer}" isn't a valid option. Please enter a valid one\n`
      );
      continue;
    }

    const botChoice = options[Math.floor(Math.random() * options.length)];

    console.log(
      `${userChoice} versus ${botChoice}`.toUpperCase()
    );
    if (userChoice === botChoice) {
      console.log(`${userChoice} cancels with ${botChoice}`);
      console.log(colors.yellowBright("It's a Tie\n"));
    } else if (userChoice === userWinningChoice[botChoice]) {
      console.log(`${userChoice} beats ${botChoice}`);
      console.log(colors.greenBright("You Win\n"));
    } else {
      console.log(`${userChoice} loses to ${botChoice}`);
      console.log(colors.redBright("You Lose\n"));
    }

    const wantsToPlayAgain = await prompt.question(
      "Do you want to play again. press 'y' to continue or any character to quit\n\n"
    );

    if (!(wantsToPlayAgain.trim() === "y")) break;
  }
  prompt.close();
}


playGame();
