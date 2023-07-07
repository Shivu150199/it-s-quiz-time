import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const { quiz, error, handleChange,handleSubmit } = useGlobalContext()
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>quiz</h2>
          <div className="form-control">
            <label htmlFor="amount">number of question</label>
            <input
              type="number"
              className="form-input"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
              min={1}
              max={50}
            />
          </div>
          {/* category */}
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              name="category"
              id="category"
              className="form-input"
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="sport">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="difficulty">difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>

          {error && (
            <p className="error">
              cant generate question please try different options
            </p>
          )}
<button type='submit' onClick={handleSubmit} className='submit-btn'>Start</button>

        </form>
      </section>
    </main>
  )
}

export default SetupForm
