import axios from 'axios'
import React, { useState } from 'react'
import { Button } from './Button'

const Quiz = () => {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState({})
  const [selectedanswer, setselectedanswer] = useState('')
  const [correctanswer, setcorrectanswer] = useState('')
  const [answerStatus, setAnswerstatus] = useState('')
  const API_KEY = "x159m185zbG2U87cucMN7tWwdVnsRW1ya48Y7kyV"

  const getQuestion = async () => {
    try {
      const response = await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&limit=10&category=Linux&difficulty=easy`
      )

      const data = response.data[1] // or use random like: response.data[Math.floor(Math.random() * 10)]
      console.log(data)

      setQuestion(data.question)
      setOptions(data.answers)
      setcorrectanswer(data.correct_answer)
      console.log("correct answerssssss==>", data.correct_answer)
    } catch (err) {
      console.error("Failed to fetch question", err)
    }
  }

  const handleSelection = (key) => {
    setselectedanswer(key)
    console.log("key=>>>", key)
    console.log("correct answer====>", correctanswer)
    if (key === correctanswer) {
      setAnswerstatus('correct')
    } else {
      setAnswerstatus('wrong')
    }
    console.log(selectedanswer)
  }

  return (
    <div>
      <Button onClick={getQuestion}>Get Question</Button>

      {question && <p><strong>Question:</strong> {question}</p>}

      {options && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Object.entries(options).map(([key, value]) => (
            value && (
              <li key={key} style={{ marginBottom: '10px' }}>
                <button
                  style={{
                    padding: '10px 20px',
                    width: '100%',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    borderWidth:'10px',
                    borderColor: selectedanswer === key 
                      ? answerStatus === 'correct' 
                        ? 'green' 
                        : answerStatus === 'wrong' 
                          ? 'red' 
                          : '#ccc' 
                      : '#ccc',
                  }}
                  onClick={() => handleSelection(key)}
                >
                  {value}
                </button>
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  )
}

export default Quiz
