import { useState } from 'react'


const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if(total == 0){
    return <p>No Feedback Given</p>
  }
  else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="total" value={total} />
            <StatisticsLine text="average" value={average} />
            <StatisticsLine text="positive" value={`${positive} %`} />
          </tbody>
    </table>
      </div>
    )
  }
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({onClick, text}) => {
  return (
      <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

      
  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedTotal = total + 1
    setGood(updatedGood)
    setTotal(updatedTotal)
    setAverage((updatedGood - bad) / updatedTotal)
    setPositive(updatedGood / updatedTotal * 100) 
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = total + 1
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    setAverage((good - bad) / updatedTotal)
    setPositive(good / updatedTotal * 100) 
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedTotal = total + 1
    setBad(updatedBad)
    setTotal(updatedTotal)
    setAverage((good - updatedBad) / updatedTotal)
    setPositive(good / updatedTotal * 100) 
  }

  
  return (
    <div>
      <h1>Unicafe Feedback</h1>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <h2>Feedback Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
  
}

export default App