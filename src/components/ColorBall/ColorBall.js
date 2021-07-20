import React from 'react';
import './ColorBall.css';

export default function ColorBall(props) {
  const styleObject = { backgroundColor: props.color };
  const classList = `color-ball${props.isSelected ? ' selected' : ''}`;
  return (
    <div
      className={classList}
      style={styleObject}
      onClick={() => props.clickHandler(props.color)}
    ></div>
  );
}
