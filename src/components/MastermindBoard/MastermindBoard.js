import React from 'react';
import MastermindRow from '../MastermindRow/MastermindRow';
import Inventory from '../Inventory/Inventory';

const COLORS = [
  'darkred',
  'orange',
  'gold',
  'limegreen',
  'green',
  'darkturquoise',
  'lightskyblue',
  'dodgerblue',
  'purple',
  'violet',
];

const MAX_ATTEMPTS = 10;

// Function: generate the winning combination randomly

function generateSecret(colors) {
  return [
    colors[Math.floor(Math.random() * colors.length)],
    colors[Math.floor(Math.random() * colors.length)],
    colors[Math.floor(Math.random() * colors.length)],
    colors[Math.floor(Math.random() * colors.length)],
  ];
}

const initialGuessList = [
  {
    colors: [null, null, null, null],
    blackCount: 0,
    whiteCount: 0,
  },
];

const initialSecret = generateSecret(COLORS);

export default function MastermindBoard() {
  const [activeColor, setActiveColor] = React.useState(null);
  const [secret, setSecret] = React.useState(initialSecret);
  const [guessList, setGuessList] = React.useState(initialGuessList);

  const getActiveRowIndex = () => {
    return guessList.length - 1;
  };

  const updateCellValue = columnIndex => {
    const rowIndex = getActiveRowIndex();
    const colors = [...guessList[rowIndex].colors];
    colors[columnIndex] = activeColor;

    const newState = guessList.map((row, i) =>
      i === rowIndex
        ? {
            colors: colors,
            blackCount: guessList[rowIndex].blackCount,
            whiteCount: guessList[rowIndex].whiteCount,
          }
        : row
    );

    setGuessList(newState);
  };

  const evaluateCallback = () => {
    const rowIndex = getActiveRowIndex();

    const updatedGuessList = [...guessList];
    const blackCount = getBlackCount();
    updatedGuessList[rowIndex].blackCount = blackCount;
    updatedGuessList[rowIndex].whiteCount = getWhiteCount(blackCount);

    if (blackCount < 4) {
      updatedGuessList.push({
        colors: [null, null, null, null],
        blackCount: 0,
        whiteCount: 0,
      });
    }

    if (blackCount < 4 && rowIndex + 1 === MAX_ATTEMPTS) {
      alert('Game Over!');
    }

    setGuessList(updatedGuessList);
  };

  const newGamePressed = () => {
    setGuessList(initialGuessList);
    setSecret(generateSecret(COLORS));
  };

  const rows = new Array(MAX_ATTEMPTS)
    .fill(null)
    .map((_, index) => (
      <MastermindRow
        key={index}
        isActive={
          index === getActiveRowIndex() && guessList[index]?.blackCount < 4
        }
        updateCellValue={updateCellValue}
        evaluateCallback={evaluateCallback}
        blackCount={guessList[index]?.blackCount}
        whiteCount={guessList[index]?.whiteCount}
        currentValues={guessList[index]?.colors}
      />
    ));

  const getBlackCount = () => {
    const guess = guessList[getActiveRowIndex()].colors;
    var blacks = 0;

    for (let i = 0; i < guess.length; i += 1) {
      if (guess[i] === secret[i]) {
        blacks += 1;
      }
    }

    return blacks;
  };

  const getWhiteCount = blackCount => {
    function comboToMap(combo) {
      var map = {};
      for (let color of combo) {
        map[color] = (map[color] ?? 0) + 1;
      }
      return map;
    }

    const guess = guessList[getActiveRowIndex()].colors;

    const guessMap = comboToMap(guess);
    const secretMap = comboToMap(secret);
    const min = Math.min;

    let blackOrWhiteCount = 0;
    for (let key in guessMap) {
      blackOrWhiteCount += min(guessMap[key], secretMap[key] ?? 0);
    }

    return blackOrWhiteCount - blackCount;
  };

  const getWinningMessage = () => {
    if (guessList[getActiveRowIndex()].blackCount === 4) {
      return <h2>Congratulations! You have won the game!</h2>;
    }
    return null;
  };

  return (
    <>
      <Inventory
        colors={COLORS}
        newGamePressed={newGamePressed}
        setActiveColor={setActiveColor}
        selectedColor={activeColor}
      />
      {getWinningMessage()}
      {rows}
    </>
  );
}
