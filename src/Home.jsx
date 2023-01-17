import React, { useState } from 'react'
import { auth, db } from './firebase'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const { currentUser } = auth
    const [showModal, setShowModal] = useState(false)
    const [local, setLocal] = useState(true)
    const history = useNavigate()
    const newGameOptions = [
        { label: 'Black pieces', value: 'b' },
        { label: 'White pieces', value: 'w' },
        { label: 'Random', value: 'r' },
    ]

    function handlePlayOnline() {
        setShowModal(true)
        setLocal(false)
    }

    function handlePlayLocal(){
        setLocal(true)
        history(`/game/local`)
    }

    function startLocalGame(){
        history(`/game/local`)
    }

    async function startOnlineGame(startingPiece) {
        const member = {
            uid: currentUser.uid,
            piece: startingPiece === 'r' ? ['b', 'w'][Math.round(Math.random())] : startingPiece,
            name: localStorage.getItem('userName'),
            creator: true
        }
        const game = {
            status: 'waiting',
            members: [member],
            gameId: `${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
        }
        await db.collection('games').doc(game.gameId).set(game)
        history(`/game/${game.gameId}`)
    }

    return (
        <>
            <div className="columns home has-background-dark" >
                <div style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-around' }}>
                    <img src='https://static.vecteezy.com/system/resources/previews/004/742/414/original/chess-pawn-with-shadow-of-a-king-chess-vector.jpg' style={{ height: 700, borderRadius: '20%' }}/>
                </div>
                <div className="column  home-columns" style={{ display: 'flex', flexDirection:'column', alignItems: 'flex-end'}}>
                    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'space-between', width: 500, alignContent: 'space-between', height: 200, marginRight: 200 }}>

                        <button className="button is-link is-large box" style={{ display:'flex' }}
                            onClick={handlePlayOnline}>
                            <img src={require('./assets/friend.png')} width={90} alt=''/>
                            Play With Friend
                        </button>
                        <button className="button is-link is-large box" style={{ display: 'flex' }}
                            onClick={handlePlayLocal}>
                            <img src={require('./assets/human.png')} width={50} style={{ marginRight: 20 }} alt=''/>
                            Play Local
                        </button>
                    </div>
                </div>
            </div>
            <div className={`modal ${showModal ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                Please Select the piece you want to start
                            </div>

                        </div>
                        <footer className="card-footer">
                            {newGameOptions.map(({ label, value }) => (
                                <span className="card-footer-item pointer" key={value}
                                    onClick={() => startOnlineGame(value)}>
                                    {label}
                                </span>
                            ))}
                        </footer>
                    </div>
                </div>
                <button className="modal-close is-large" onClick={() => setShowModal(false)}></button>
            </div>
        </>
    )
}