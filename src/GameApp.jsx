import './App.css';
import { useEffect, useState } from 'react';
import { gameSubject, initGame, resetGame } from './Game';
import Board from './Board';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from './firebase';
import ReactLoading from 'react-loading'
import { useStateContext } from './ContextProvider'

function GameApp() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [position, setPosition] = useState()
  const [initResult, setInitResult] = useState(null);
  const [game, setGame] = useState({})
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [local, setLocal] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const sharebleLink = window.location.href
  const { currentColor } = useStateContext();

  

  useEffect(() => {
    let subscribe
    id === 'local' ? setLocal(true) : setLocal(false) 
    async function init() {
      const res = await initGame(id !== 'local' ? db.doc(`games/${id}`) : null )
      setInitResult(res)
      setLoading(false)
      if(!res){
        subscribe = gameSubject.subscribe((game) => {
          setBoard(game.board)
          setIsGameOver(game.isGameOver)
          setResult(game.result)
          setPosition(game.position)
          setStatus(game.status)
          setGame(game)
        })

      }

    }
    init()
    return () => subscribe && subscribe.unsubscribe();
  }, [id])

  async function copyToClipboard() {
    await navigator.clipboard.writeText(sharebleLink)
  }

  if (loading) {
    return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ReactLoading type='bars' color='#0096FF' height={300} width={200}/>
    </div>
    )
  }
  if (initResult === 'notfound') {
    return 'Game Not found'
  }

  if (initResult === 'intruder') {
    return 'The game is already full'
  }

  return (
    <div className="app-container">
      {isGameOver && (
        <h2 className="vertical-text">
          GAME OVER
          <button onClick={async () => {
            await resetGame()
            navigate('/')
          }}>
            <span className="vertical-text"> NEW GAME</span>
          </button>
        </h2>
      )}
      <div className="board-container">
        {game.oponent && game.oponent.name && <span className="tag is-link">{game.oponent.name}</span>}
        <Board board={board} position={position} />
        {game.member && game.member.name && <span className="tag is-link">{game.member.name}</span>}
      </div>
      {result && <p className="vertical-text">{result}</p>}
      {status === 'waiting' && (
        <div className="notification is-link share-game">
          <strong>Share this game to continue</strong>
          <br />
          <br />
          <div className="field has-addons">
            <div className="control is-expanded">
              <input type="text" name="" id="" className="input" readOnly value={sharebleLink} />
            </div>
            <div className="control">
              <button className="button is-info" onClick={copyToClipboard}>Copy</button>
            </div>
          </div>
        </div>
      )}
      {
        local && (

          <div style={{display: 'flex', flexDirection: 'column', alignItems:'center' ,marginLeft: 40, padding: 20 }}>
        <h3 style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Current turn</h3>
        <div style={{ width: 90, height: 90, backgroundColor: currentColor === 'b' ? 'black' : 'white', borderRadius: 10  }}>
        </div>
      </div>
        )
        
      }
    </div>
  );
}

export default GameApp;
