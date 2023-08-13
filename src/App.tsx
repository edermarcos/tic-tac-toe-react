import { useState, useEffect } from 'react'

import Board, { IPlay } from './components/Board'
import Footer from './components/Footer'
import Header from './components/Header'

const players = ['X', 'O']

const randomNumberBetween0And1 = (): number => {
  return Math.round(Math.random())
}
const App = () => {
  const [winnerPlayer, setWinnerPlayer] = useState('')
  const [isGameFinished, setIsGameFinished] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(
    players[randomNumberBetween0And1()]
  )
  const [plays, setPlays] = useState<IPlay[]>([])

  useEffect(() => {
    console.log({ winnerPlayer, isGameFinished, currentPlayer })
  }, [winnerPlayer, isGameFinished, currentPlayer])

  const handleReset = () => {
    setWinnerPlayer('')
    setIsGameFinished(false)
    setCurrentPlayer(players[randomNumberBetween0And1()])
    setPlays([])
  }

  return (
    <section className='flex justify-center items-center flex-col h-screen'>
      <Header
        currentPlayer={currentPlayer}
        winnerPlayer={winnerPlayer}
        isGameFinished={isGameFinished}
        players={players}
      />
      <Board
        setWinnerPlayer={setWinnerPlayer}
        isGameFinished={isGameFinished}
        setIsGameFinished={setIsGameFinished}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        plays={plays}
        setPlays={setPlays}
      />
      <Footer handleReset={handleReset} isGameFinished={isGameFinished} />
    </section>
  )
}

export default App
