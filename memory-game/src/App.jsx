import './App.css'
import Field from "./components/Field.jsx";
import {useState} from "react";

const GameStates = {
    START: "start",
    PLAY: "play",
    WIN: "win",
    LOSE: "lose",
}

function App() {
  const [gameState, setGameState] = useState(GameStates.START);
  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(3);
  const [cardsToMemorize, setCardsToMemorize] = useState(3);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0);

  const onLose = () => {
    setGameState(GameStates.LOSE)
  }

  const onWin = () => {
    setScore(score + cardsToMemorize);

    setGameState(GameStates.WIN);
    console.log('game win', score);
  }

  const nextLevel = () => {
    setGameState(GameStates.PLAY);

    if (cardsToMemorize > width * height / 3) {
      setWidth(width + 1);
      setHeight(height + 1);
    }
    setCardsToMemorize(cardsToMemorize + 1);

    setKey(key + 1);
    console.log('next level', width, height, cardsToMemorize);
  }

  const startGame = () => {
    setWidth(3);
    setHeight(3);
    setCardsToMemorize(3);
    setScore(0);
    setKey(key > 0 ? 0 : 1);
    setGameState(GameStates.PLAY)
  }

  return (
    <div className="app">
      {
        gameState === GameStates.START ?
              <div className="control-btn" onClick={startGame}>
                  Start new game
              </div>
            : <>
              <Field key={key} width={width} height={height} cardsToMemorize={cardsToMemorize} onLose={onLose} onWin={onWin}/>

              {gameState === GameStates.WIN ?
                  <>
                    <div className="score"> Your score is {score} </div>
                    <div className="control-btn" onClick={nextLevel}>
                      Next
                    </div>
                  </>
                  : gameState === GameStates.LOSE ?
                      <>
                        <div className="score"> Your score is {score} </div>
                        <div className="control-btn" onClick={startGame}>
                          Start new game
                        </div>
                      </>
                      : null
              }
              </>
      }
    </div>
  )
}

export default App
