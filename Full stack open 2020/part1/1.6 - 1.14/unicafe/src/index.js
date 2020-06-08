import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Title = ({text}) => <h1>{text}</h1>

const Button = props => {
  const { text, handleClick } = props

  return <button onClick={ handleClick }>{text}</button>
}

const Statistic = props => {
  const { text, value } = props

  return (
    <p>{text} {value}</p>
  )
}

const Statistics = props => {
  const { good, neutral, bad } = props

  if(good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  const all = good + neutral + bad
  const average = (good * 1 + bad * -1) / all || 0
  const positive = good / all || 0

  return (
    <div>
      <h1>statistics</h1>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='all' value={all} />
      <Statistic text='average' value={average} />
      <Statistic text='positive' value={positive} />
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
