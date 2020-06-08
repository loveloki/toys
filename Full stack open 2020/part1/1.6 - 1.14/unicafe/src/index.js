import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Title = ({text}) => <h1>{text}</h1>

const Button = props => {
  const { text, handleClick } = props

  return <button onClick={ handleClick }>{text}</button>
}

const Statistics = props => {
  const { good, neutral, bad } = props

  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => setGood(good + 1)
  const clickNeutral = () => setNeutral(neutral + 1)
  const clickBad = () => setBad(bad + 1)

  return (
    <div>
      <Title text='Give feedback' />
      <Button text='good' handleClick={ clickGood } />
      <Button text='neutral' handleClick={ clickNeutral } />
      <Button text='bad' handleClick={ clickBad } />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
