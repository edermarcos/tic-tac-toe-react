import { useState } from 'react'

export interface IPlay {
  col: number
  row: number
  player?: string
}

export interface BoardProps {
  setWinnerPlayer: (winner: string) => void
  isGameFinished: boolean
  setIsGameFinished: (isFinished: boolean) => void
  currentPlayer: string
  setCurrentPlayer: (player: string) => void
  plays: IPlay[]
  setPlays: (plays: IPlay[]) => void
}

const gridSize = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  value: i + 1,
}))

const Board = ({
  setWinnerPlayer,
  isGameFinished,
  setIsGameFinished,
  currentPlayer,
  setCurrentPlayer,
  plays,
  setPlays,
}: BoardProps) => {
  const handlePlay = (play: IPlay) => {
    // Valida que la celda este vacia y que el juego no haya terminado
    if (!isCellEmpty(play) || isGameFinished) {
      return
    }

    // Guarda la jugada
    const newPlays = [...plays, { ...play, player: currentPlayer }]
    setPlays(newPlays)

    // Valida el estado del juego
    validateGame(newPlays)

    // Cambia el simbolo del jugador
    updatePlayerSymbol()
  }

  // Valida que el clic aun este disponible
  const isCellEmpty = ({ row, col }: IPlay): boolean => {
    const result = plays.find((p) => p.row === row && p.col === col) ?? {}
    return Object.keys(result).length === 0
  }

  const updatePlayerSymbol = () => {
    if (currentPlayer === 'X') {
      setCurrentPlayer('O')
      return
    }

    setCurrentPlayer('X')
  }

  const validateGame = (plays: IPlay[]) => {
    console.log({ plays })
    // Se analizan las jugadas del jugador actual
    const playsByPlayer = plays.filter(({ player }) => player === currentPlayer)

    // Valida columnas, filas y diagonales para determinar si el jugador gano
    if (
      validateColOrRow(playsByPlayer, 'col') ||
      validateColOrRow(playsByPlayer, 'row') ||
      validateDiagonal(playsByPlayer)
    ) {
      setWinnerPlayer(currentPlayer)
      setIsGameFinished(true)
      return
    }

    // Valida el numero de jugadas para determinar si el juego termino en empate
    if (plays.length === 9) {
      setWinnerPlayer('None')
      setIsGameFinished(true)
      return
    }
  }

  const validateColOrRow = (
    filteredPlays: IPlay[],
    field: 'row' | 'col'
  ): boolean => {
    // Valida cada fila y/o columna para determinar si el jugador gano
    return gridSize
      .map(
        ({ value }) =>
          filteredPlays.filter((p: IPlay) => p[field] === value).length >= 3
      )
      .some((r) => r)
  }

  const validateDiagonal = (filteredPlays: IPlay[]): boolean => {
    // Valida la diagonal que inicia en 1,1 y termina en 3,3
    const diagonal1 = gridSize.map(
      ({ value }) =>
        filteredPlays.find(({ col, row }) => col === value && row === value) ??
        false
    )

    // Valida la diagonal que inicia en 1,3 y termina en 3,1
    const diagonal2 = gridSize.map(
      ({ value, id }) =>
        filteredPlays.find(
          ({ col, row }) => col === value && row === gridSize.length - id
        ) ?? false
    )

    // Valida si alguna de las diagonales tiene 3 jugadas
    return diagonal1.every((r) => r) || diagonal2.every((r) => r)
  }

  // Regresa el simbolo de la jugada (X || O) basado en las coordenadas
  const getPlay = ({ row, col }: IPlay): string => {
    return (
      (plays.find((p) => p.row === row && p.col === col) ?? {})?.player ?? ''
    )
  }

  return (
    <section className='mb-4'>
      {gridSize.map(({ id, value: col }) => (
        <div key={id} className='flex'>
          {gridSize.map(({ value: row }, index) => (
            <div
              key={index}
              className='border h-32 w-32 flex justify-center items-center hover:bg-slate-100 hover:cursor-pointer'
              onClick={() => handlePlay({ col, row })}
            >
              {getPlay({ col, row })}
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

export default Board
