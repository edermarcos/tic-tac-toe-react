export interface FooterProps {
  isGameFinished: boolean
  handleReset: () => void
}

const Footer = ({ isGameFinished, handleReset }: FooterProps) => {
  return (
    <footer>
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-7 rounded disabled:opacity-50 disabled:pointer-events-none'
        onClick={handleReset}
        disabled={!isGameFinished}
      >
        Reiniciar
      </button>
    </footer>
  )
}

export default Footer
