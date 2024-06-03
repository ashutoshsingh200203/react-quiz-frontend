import React, { MouseEvent, MouseEventHandler } from 'react';

type Questions  = {
  number : number
  question : string,
  correct_ans : string ,
  options : string[],
  difficulty : string,
  checkAnswer : MouseEventHandler<HTMLInputElement>
  score : number
}

 const Questions : React.FC<Questions> = ({number ,question , correct_ans , options,difficulty , checkAnswer , score}) => {
 
  return (
    <>
        <h1 className='mb-5 text-center head'>Quiz Game</h1>
      <div className="container">
        <p className='fs-4 text-danger'>Score : {score}</p>
        <div className="card" style={{ width: "28rem" }}>
          <div className="card-body text-center">
            <h5 className="ques-no">Question {number+1}</h5>
          </div>
          <div className="card-body text-center">
          <p className="ques">{question}</p>
          </div>
          <ul className="list-group list-group-flush p-2 options text-center">
            <input type="button" value={options[0]} className='btn p-2' onClick={checkAnswer}/>
            <input type="button" value={options[1]} className='btn p-2' onClick={checkAnswer}/>
            <input type="button" value={options[2]} className='btn p-2' onClick={checkAnswer}/>
            <input type="button" value={options[3]} className='btn p-2' onClick={checkAnswer}/>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Questions ;