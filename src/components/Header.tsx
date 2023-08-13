export interface HeaderProps {
  winnerPlayer: string
  currentPlayer: string
  isGameFinished: boolean
  players: string[]
}

const Header = ({
  currentPlayer,
  winnerPlayer,
  isGameFinished,
  players,
}: HeaderProps) => {
  return (
    <header className='mb-8'>
      {isGameFinished ? (
        <p className='text-2xl font-bold'>
          {players.includes(winnerPlayer) ? (
            <>
              El ganador es el jugador :{' '}
              <span className='text-red-500'>{winnerPlayer}</span>
            </>
          ) : (
            'Empate' 
          )}
        </p>
      ) : (
        <p className='text-lg'>
          Turno de: <span className='font-bold'>{currentPlayer}</span>
        </p>
      )}
    </header>
  )
}

export default Header
