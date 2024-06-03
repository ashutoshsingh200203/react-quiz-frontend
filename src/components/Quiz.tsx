import React, { MouseEventHandler, useEffect, useState } from 'react';
import Questions from './Questions';
import '../App.css';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router';

export default function Quiz() {
  type dataresult = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
  }
  const [number, setNumber] = useState(0);
  const [question, setQuestion] = useState('')
  const [correct, setCorrect] = useState('')
  const [difficulty, setdifficulty] = useState('')
  const [score, setScore] = useState(0)
  const [finaldata, setFinaldata] = useState<dataresult[]>([])
  const [option, setOption] = useState<string[]>([])
  const navigate = useNavigate()

  const shuffle = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };
  var shuffledoptions : string[] = []
  const fetchData = async () => {

    const response = await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple')
    const data: dataresult[] = response.data.results;
     
    for(let i=0 ; i<data.length ; i++)
    {
      (data[i].incorrect_answers).push(data[i].correct_answer)
    }
    
    console.log(shuffledoptions)
    setNumber(number)
    setQuestion(data[0].question)
    setdifficulty(data[0].difficulty)
    setCorrect(data[0].correct_answer)
    shuffledoptions = shuffle(data[0].incorrect_answers)
    setOption(shuffledoptions)
    setFinaldata(data)
  };

  const handleLogout = async () => {
    localStorage.removeItem('token')
    navigate('/auth/login')
  }

  useEffect(() => {
    const setData = async () => {
      fetchData()
    }
    setData()
  }, [])

  const doNext = () => {
    setNumber(number + 1)
    setQuestion(finaldata[number + 1].question)
    setdifficulty(finaldata[number + 1].difficulty)
    setCorrect(finaldata[number + 1].correct_answer)
    shuffledoptions = shuffle(finaldata[number + 1].incorrect_answers)
    setOption((shuffledoptions ))
  }

  const doPrev = () => {
    setNumber(number - 1)
    setQuestion(finaldata[number - 1].question)
    setdifficulty(finaldata[number - 1].difficulty)
    setCorrect(finaldata[number - 1].correct_answer)
    setOption((finaldata[number - 1].incorrect_answers))
  }

  const checkAnswer: MouseEventHandler<HTMLInputElement> = (e) => {
    console.log(e)
    if (e.currentTarget.value === correct) {
      setScore(score + 1);
    }
    // document.getElementById
  }

  return (
    <>
      <button type="button" className="btn btn-danger mt-4" onClick={handleLogout}>Logout</button>
      <div className="App">
        <Questions number={number} question={question} correct_ans={correct} difficulty={difficulty} options={option} checkAnswer={checkAnswer} score={score} />
        <div className="d-flex justify-content-between mt-3 buttons">
          <button type="button" className="btn btn-primary mx-4" onClick={doPrev} disabled={number < 1}>Previous</button>
          <button type="button" className="btn btn-primary" onClick={doNext} disabled={number > 8}>Next</button>
        </div>
      </div>
    </>
  )
}
