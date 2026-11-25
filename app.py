from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Scorecard
scorecard = {
    "Wins": 0,
    "Losses": 0,
    "Ties": 0
}

# Open the game webpage
@app.route("/")
def home():
    return render_template("index.html", scorecard=scorecard)


# Play Rock Paper Scissors
@app.route("/play", methods=["POST"])
def play_game():

    # Get the player's move from JavaScript
    player_move = request.json["playerMove"]

    # Computer randomly selects a move
    moves = ["rock", "paper", "scissors"]
    computer_move = random.choice(moves)

    # Find the result
    if player_move == computer_move:
        result = "Tie."
        scorecard["Ties"] += 1

    elif player_move == "rock" and computer_move == "scissors":
        result = "You win.!"
        scorecard["Wins"] += 1

    elif player_move == "paper" and computer_move == "rock":
        result = "You win.!"
        scorecard["Wins"] += 1

    elif player_move == "scissors" and computer_move == "paper":
        result = "You win.!"
        scorecard["Wins"] += 1

    else:
        result = "You lose."
        scorecard["Losses"] += 1

    # Send the result back to JavaScript
    return jsonify({
        "playerMove": player_move,
        "computerMove": computer_move,
        "result": result,
        "scorecard": scorecard
    })


# Reset the scorecard
@app.route("/reset", methods=["POST"])
def reset_game():

    scorecard["Wins"] = 0
    scorecard["Losses"] = 0
    scorecard["Ties"] = 0

    return jsonify(scorecard)


# Run the application
if __name__ == "__main__":
    app.run(debug=True)
