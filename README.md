# LaikaChallenge

## Requirements
This repo requires you to have Nodejs installed, and NPM installed.

## Build and Run
1. Clone this repo
2. In "backend" folder, perform the usual `npm i` to install required packages
3. In "backend" folder, run `node server.js`.  This will start the server running on localhost:9000
4. In "tic-tac-toe", perform the usual `npm i` to install required packages
5. In "tic-tac-toe" folder, run `npm start`.  This kicks off react-scripts and starts running the application on localhost:3000

## Thoughts
I think that I misread the intent of the challenge and glazed over the AI behavior requirements initially - instead focusing on the details of how the application should be structured.
So I ended up actually doing the logic at the very end.
I honestly haven't had to work on recursive focused logic in quite a while, this threw me for a bit of a loop.

My relatively light experience with React became apparent as I wasn't sure how to handle presenting the win state as a result of an API call.
Just not sure which hook to grab, not sure where in the lifecycle to perform the action.
So I opted out of routing on completion and left it as an unfortunatly ugly alert for brevity's sake.

## Challenge Prompt
### Instructions

1. Create a program that can interactively play the game of Tic-Tac-Toe against a human 
   player. 
   * The program should win or draw, but never lose.
   * The human player should make the first move.
   * The program should announce the result of the game before clearing the board for 
     another round of play.
1. A git repo has been initialized in the project root - commit early and often, with good messages.

When you've completed your submission, zip or tar the project back up, and be sure to include
your `.git` folder so we can see your commit history.

We are more interested in getting a view into how you approach the problem than 
anything else, so a good commit history is vital.

This isn't a timed test, so don't think of the commit history as being a measure of 
pace - we're not looking at that.
We understand this is something you'll be working on in between other things.
If, for some reason, you feel unable to complete the entire exercise, that's fine.
Just try to give us enough code to look at to get a sense of your approach.

### Implementation Guidelines

Your implementation should meet the following requirements:

* The game logic should be executed server-side (you pick the language/framework but we 
  use a mix Django and Flask in Python).
* The interface for the game should be a JavaScript Single Page Application (SPA) running
  in a browser (again, you pick the frameworks/toolchains but we use a mix of React and 
  Angular 1.x).
* You should rewrite this `README.md` to include build/run instructions for your apps 
  (both client and server).

For a little extra credit:

* The SPA should _not_ be hosted by the server-side app, but instead through a separate 
  server process (the client app should be completely standalone).
