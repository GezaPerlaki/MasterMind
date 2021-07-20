import React from 'react';
import ColorBall from '../ColorBall/ColorBall';
import './Inventory.css';

export default function Inventory(props) {
  const selectColor = newColor => {
    props.setActiveColor(newColor);
  };
  const colorBalls = props.colors.map((color, index) => (
    <ColorBall
      color={color}
      isSelected={color === props.selectedColor}
      clickHandler={selectColor}
      key={index}
    />
  ));

  return (
    <>
      <button className='new-game-button' onClick={props.newGamePressed}>
        New Game
      </button>
      <div className='color-balls-container'>{colorBalls}</div>
    </>
  );
}
