import React, { useEffect, useState } from 'react'
import BoardSquare from './BoardSquare'
import { useStateContext } from './ContextProvider'

const Board = ({ board, position }) => {

    const [currBoard, setCurrBoard] = useState([])
    const [move, setMove] = useState()
    const { setCurrentColor } = useStateContext();

    useEffect(() => {
        setCurrBoard(
            position === 'w' ? board.flat() : board.flat().reverse()
        )
        setMove(localStorage.getItem('move'))
        console.log(move)
        setCurrentColor(localStorage.getItem('move'))
    }, [board, position])


  useEffect(() => {
    // console.log(move)
    // setCurrentColor(localStorage.getItem('move'))
  }, [move])

    const getXYPosition = (i) => {
        const x = position === 'w' ? i % 8 : Math.abs((i % 8) - 7)
        const y =
            position === 'w'
                ? Math.abs(Math.floor(i / 8) - 7)
                : Math.floor(i / 8)
 
        return {x,y}
    }

    const isBlack = (i) => {
        const {x,y} = getXYPosition(i)

        return (x + y) % 2 === 1
    }

    const getPosition = (i) => {
        const {x, y} = getXYPosition(i)
        const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x]
        
        // console.log(`${letter}${y + 1}`)
        return `${letter}${y + 1}`
    }

  return (
    <div className='board'>
        {currBoard.map((piece, i) => (
        <div key={i} className="square">
          <BoardSquare
            piece={piece}
            black={isBlack(i)}
            position={getPosition(i)}
          />
        </div>
      ))}
    </div>
  )
}

export default Board