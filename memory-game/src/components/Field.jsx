import {useEffect, useState} from "react";
import Card from "./Card";
import './Field.css';

const FieldStates = {
    START: "start",
    PLAY: "play",
    LOSE: "lose",
    WIN: "win",
}

const MEMORY_TIMEOUT = 2000;

// Generate random field with provided width, height and number of cards to memorize
function generateField(width, height, cardsToMemorize) {
    const field = Array.from({ length: height }, (_, row) =>
        Array.from({ length: width }, (_, column) => ({
            isChecked: false,
            isFlipped: false,
            x: row,
            y: column,
        }))
    );

    // Choose random cards on the field
    for (let i = 0; i < cardsToMemorize; i++) {
        const randomX = Math.floor(Math.random() * height);
        const randomY = Math.floor(Math.random() * width);

        if (field[randomX][randomY].isChecked) {
            i--;
            continue;
        }

        field[randomX][randomY].isChecked = true;
    }

    return field;
}

function DisplayField({playerField, onCardClick, isFlipped}) {
    return playerField.map((field) => {
        return (
            <div className="field__row">
                {field.map((card) => {
                    return (
                        <Card
                            key={`${card.x}-${card.y}`}
                            isChecked={card.isChecked}
                            isFlipped={isFlipped ? true : card.isFlipped}
                            onClick={() => isFlipped ? null : onCardClick(card.x, card.y)}
                            isWrong={card.isWrong}
                        />
                    );
                })}
            </div>
        );
    })
}

export default function Field({width, height, cardsToMemorize, onWin, onLose}) {
    const [fieldState, setFieldState] = useState(FieldStates.START);
    const [fields, setFields] = useState([]);
    const [playerField, setPlayerField] = useState([]);
    const [checkLeft, setCheckLeft] = useState(cardsToMemorize);

    // process card click
    function onCardClick(x, y) {
        if (playerField[x][y].isFlipped) {
            return;
        }

        if (!fields[x][y].isChecked) {
            setPlayerField((playerField) => {
                const newPlayerField = [...playerField];
                newPlayerField[x][y].isFlipped = true;
                newPlayerField[x][y].isWrong = true;

                return newPlayerField;
            })

            setFieldState(FieldStates.LOSE);
            onLose()
            return
        }

        setPlayerField((playerField) => {
            const newPlayerField = [...playerField];
            newPlayerField[x][y].isFlipped = true;

            return newPlayerField;
        })

        setCheckLeft((checkLeft) => {
            console.log('checkLeft', checkLeft)
            if (checkLeft === 1) {
                onWin()
                setFieldState(FieldStates.WIN)
            }

            return checkLeft - 1
        });
    }

    // Generate field with cards to memorize on game start
    useEffect(() => {
        console.log('generate field', fields);
        if (fieldState !== FieldStates.START) {
            return;
        }

        const newField = generateField(width, height, cardsToMemorize);
        console.log('newField', newField)

        setFields(newField);
        setPlayerField(newField);
    }, []);

    // Show cards for 5 seconds and then hide them to start the game
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('set game');
            setFieldState(FieldStates.PLAY);
        }, MEMORY_TIMEOUT);

        return () => clearTimeout(timer);
    }, [])

    return (
        <div>
            {
                fieldState === FieldStates.START ? <DisplayField playerField={fields} isFlipped={true}/>
                : fieldState === FieldStates.PLAY ? <DisplayField playerField={playerField} isFlipped={false} onCardClick={onCardClick}/>
                : fieldState === FieldStates.LOSE ? <DisplayField playerField={playerField} isFlipped={true}/>
                : <DisplayField playerField={playerField} isFlipped={true}/>
            }
        </div>
    );
}
