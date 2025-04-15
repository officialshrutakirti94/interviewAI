import axios from 'axios'
import React, { useState } from 'react'

const Quiz = () => {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState({})
  const [selectedanswer, setselectedanswer] = useState('')
  const [correctanswer, setcorrectanswer] = useState('')
  const [answerStatus, setAnswerstatus] = useState('')
  const [correctCounter,setCorrectCounter]= useState(0)
  const API_KEY = "6THdtbSZeOyq4kgXYDNyHY22i7j3H1x0bF3Kl9Ef"

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
    var count=0;
    if (key === correctanswer) {
      setAnswerstatus('correct')
      setCorrectCounter((prev)=>prev+1)
    } else {
      setAnswerstatus('wrong')
    }
    console.log(selectedanswer)
  }

  return (
    <div >
      <button onClick={getQuestion} 
         style={{
          backgroundColor: '#4F46E5', // Indigo-600
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
        }}
      >Get Question</button>

      {question && <p style={{marginTop:'1rem',marginBottom:'1rem'}}><strong>Question:</strong> {question}</p>}

      {options && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Object.entries(options).map(([key, value]) => (
            value && (
              <li key={key} style={{ marginBottom: '10px' }}>
                <button
                  style={{
                    padding: '10px 20px',
                    width: '50%',
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
      <div className="correctCounter">Correct count:{correctCounter}</div>
      <button 
         style={{
          backgroundColor: '#4F46E5', // Indigo-600
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
          marginTop:'1rem'
        }}
      >Submit</button>
    </div>
  )
}

export default Quiz
