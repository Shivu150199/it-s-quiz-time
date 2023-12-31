import React, { useContext, useState } from 'react'
import axios from 'axios'

const table = {
  sport: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [waiting, setWaiting] = useState(true)
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState(false)
  const [index, setIndex] = useState(0)
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sport',
    difficulty: 'easy',
  })
const [isModalOpen,setIsModalOpen]=useState(false)
const [correct,setCorrect]=useState(0);


  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)
    const response = await axios(url).catch((err) => console.log(err))
    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestions(data)
        setLoading(false)
        setWaiting(false)
        setError(false)
      } else {
        setWaiting(true)
        setError(true)
      }
    } else {
      setWaiting(true)
    }
  }

const nextQuestion=()=>{
  setIndex((oldIndex)=>{
    const index= oldIndex+1
    if(index>questions.length-1){
      openModal()
      return 0
    }else{
      return index
    }
  })
}
const checkAnswer=(value)=>{
  if(value){
    setCorrect((oldState)=>oldState+1)
  }
  nextQuestion()
}



const openModal=()=>{
  setIsModalOpen(true)
}


const closeModal=()=>{
  setWaiting(true);
  setCorrect(0)
  setIsModalOpen(false)
}


const handleChange=(e)=>{
  const name=e.target.name;
  const value=e.target.value
  setQuiz({...quiz,[name]:value})
}

const handleSubmit=(e)=>{
  e.preventDefault()
  const {amount,category,difficulty}=quiz;
const url=`${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`

fetchQuestions(url)
}

  return (
    <AppContext.Provider
      value={{
        loading,
        waiting,
        questions,
        error,
        index,
        quiz,
        handleChange,
        handleSubmit,
        isModalOpen,
        correct,
        closeModal,
        nextQuestion,
        checkAnswer
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
