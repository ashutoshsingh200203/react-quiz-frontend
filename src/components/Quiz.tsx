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

  const [number, setNumber] = useState<number>(0);
  const [question, setQuestion] = useState<string>('')
  const [correct, setCorrect] = useState<string>('')
  const [difficulty, setdifficulty] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const [finaldata, setFinaldata] = useState<dataresult[]>([])
  const [option, setOption] = useState<string[]>([])
  const navigate = useNavigate()

  const shuffle = (array: string[]): string[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  var shuffledoptions: string[] = []

  const fetchData = async () => {

    const data : dataresult[] = (await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple')).data.results ;

    for (let i : number = 0; i < data.length; i++) {
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

  const handleLogout = async () : Promise<void> => {
    localStorage.removeItem('token')
    navigate('/auth/login')
  }

  useEffect(() => {
    const setData = async () => {
      fetchData()
    }
    setData()
  }, [])

  const doNext = () : void => {
    let elements : HTMLCollectionOf<Element> = document.getElementsByClassName('opt')
    for(let i:number = 0; i<elements.length ; i++)
    {
      elements[i].classList.remove("disabled")
      elements[i].classList.remove("text-success")
      elements[i].classList.remove("text-danger" )
    }
    setNumber(number + 1)
    setQuestion(finaldata[number + 1].question)
    setdifficulty(finaldata[number + 1].difficulty)
    setCorrect(finaldata[number + 1].correct_answer)
    shuffledoptions = shuffle(finaldata[number + 1].incorrect_answers)
    setOption((shuffledoptions))
  }

  const doPrev = () : void=> {
    setNumber(number - 1)
    setQuestion(finaldata[number - 1].question)
    setdifficulty(finaldata[number - 1].difficulty)
    setCorrect(finaldata[number - 1].correct_answer)
    setOption((finaldata[number - 1].incorrect_answers))
  }

  const checkAnswer: MouseEventHandler<HTMLInputElement> = (e) => {
    console.log(e)
    let elements : NodeListOf<HTMLInputElement> = document.querySelectorAll('.opt')
    if(e.currentTarget.value === correct)
    {
      setScore(score + 1)
    }
    for(let i:number = 0; i<elements.length ; i++)
    {
      elements[i].classList.add("disabled")
      if (elements[i].value === correct) {
        elements[i].classList.add('text-success')
        console.log(("true"))
      }
      else
      {
        console.log(("false"))
        elements[i].classList.add('text-danger') 
      }
    }
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
