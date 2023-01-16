import React from 'react'
import { move } from './Game'
import Square from './Square'

const promotionPieces = ['r', 'n', 'b', 'q']

const Promote = ({ promotion: {from, to, color} }) => {
  return (
    <div className="board">
      {promotionPieces.map((p, i) => (
        <div key={i} className="promote-square">
          <Square black={i % 3 === 0}>
            <div
              className="piece-container"
              onClick={() => move(from, to, p)}
            >
              <img
                src={require(`./assets/${p}_${color}.png`)}
                alt=""
                className="piece cursor-pointer"
              />
            </div>
          </Square>
        </div>
      ))}
    </div>
  )
}

export default Promote