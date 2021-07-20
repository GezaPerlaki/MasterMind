import React from 'react';
import './MastermindRow.css';

export default function MastermindRow(props) {
  const classList = props.isActive ? 'row active' : 'row';

  const handleClick = index => {
    if (props.isActive) {
      props.updateCellValue(index);
    }
  };

  const currentValues = props.currentValues ?? [];
  const Cells = [];
  let filledCellCount = 0;
  for (let i = 0; i < 4; i += 1) {
    const styleObject = { backgroundColor: currentValues[i] };
    Cells.push(
      <span
        key={i}
        className='cell'
        style={styleObject}
        onClick={() => handleClick(i)}
      ></span>
    );

    if (currentValues[i]?.length > 0) {
      filledCellCount += 1;
    }
  }

  const Controls =
    props.isActive && filledCellCount === 4 ? (
      <button className='evaluate-button' onClick={props.evaluateCallback}>
        Evaluate
      </button>
    ) : (
      ''
    );

  const EvaluationCells = [];
  var blacksLeft = props.blackCount ?? 0;
  var whitesLeft = props.whiteCount ?? 0;
  for (let i = 0; i < 4; i += 1) {
    let classSuffix = '';
    if (blacksLeft > 0) {
      blacksLeft -= 1;
      classSuffix = 'black';
    } else if (whitesLeft > 0) {
      whitesLeft -= 1;
      classSuffix = 'white';
    }
    const evaluationClassList = `evaluation-cell ${classSuffix}`;
    EvaluationCells.push(<span className={evaluationClassList} key={i}></span>);
  }

  return (
    <div className={classList}>
      <div className='input-cells'>{Cells}</div>
      <div className='control-cells'>{Controls}</div>
      <div className='evaluation-cells'>{EvaluationCells}</div>
    </div>
  );
}
