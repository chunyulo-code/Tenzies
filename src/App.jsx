import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [numberOfRolls, setNumberOfRolls] = React.useState(0);
  const [timer, setTimer] = React.useState("00:00:00");
  const [tenzies, setTenzies] = React.useState(false);

  const intervalIdRef = React.useRef(null);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      clearInterval(intervalIdRef.current);
      setTenzies(true);
    }
  }, [dice]);

  //------------ Timer ------------
  React.useEffect(() => {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    function startTimer() {
      intervalIdRef.current = setInterval(function () {
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
        let timerDisplay =
          (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
          ":" +
          (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds);
        setTimer(timerDisplay);
      }, 1000);
    }

    if (tenzies) {
      clearInterval(intervalIdRef.current);
    } else {
      startTimer();
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [tenzies]);

  //------------ Timer ------------

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setNumberOfRolls((prev) => prev + 1);
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setNumberOfRolls(0);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <p className="numberOfRolls">Number of rolls</p>
      <p className="numberOfRolls-number">{numberOfRolls}</p>
      <p id="timer" className="timer">
        {timer}
      </p>
    </main>
  );
}
