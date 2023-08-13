const Board = () => {
  const gridSize = Array.from({ length: 3 }, (_, i) => i + 1)

  return (
    <section>
      {gridSize.map((col, index) => (
        <div key={index} className='flex'>
          {gridSize.map((row, index) => (
            <div key={index} className='border h-20 w-20 flex justify-center items-center hover:bg-slate-50'>s</div>
          ))}
        </div>
      ))}
    </section>
  )
}

export default Board
