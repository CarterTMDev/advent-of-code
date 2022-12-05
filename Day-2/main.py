# Key beats value
wins = {
    "Rock": "Scissors",
    "Paper": "Rock",
    "Scissors": "Paper"
}
# Value beats key
losses = {}
for x, y in wins.items():
    losses[y] = x

def main():
    # Read the file
    rounds = open("input.txt").read()
    rounds = rounds.split("\n")
    rounds = rounds[0:len(rounds) - 1] # Get rid of the empty line

    # Part 1
    playerMoves = {
        "X": "Rock",
        "Y": "Paper",
        "Z": "Scissors"
    }
    opponentMoves = {
        "A": "Rock",
        "B": "Paper",
        "C": "Scissors"
    }
    score = 0
    for round in rounds:
        score += calculateScore(playerMoves[round[2]], opponentMoves[round[0]])
    print(f"Score total: {score}")

    # Part 2
    score = 0
    for round in rounds:
        opponentMove = opponentMoves[round[0]]
        if round[2] == "X": # Lose
            score += calculateScore(wins[opponentMove], opponentMove)
        elif round[2] == "Z": # Win
            score += calculateScore(losses[opponentMove], opponentMove)
        else: # Tie
            score += calculateScore(opponentMove, opponentMove)
    print(f"Score total: {score}")

def calculateScore(playerMove, opponentMove):
    points = {
        "Rock": 1,
        "Paper": 2,
        "Scissors": 3
    }
    score = points[playerMove]
    if wins[playerMove] == opponentMove:
        score += 6
    elif playerMove == opponentMove:
        score += 3
    return score

# Run main
main()