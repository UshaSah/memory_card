import { useState, useEffect } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import Header from './components/Header'
import GameBoard from './components/GameBoard'
import Scoreboard from './components/Scoreboard'
import Modal from './components/Modal'
import './App.css'

function App() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [score, setScore] = useState(0)
  const [clickedTiles, setClickedTiles] = useState(new Set())
  const [gameOver, setGameOver] = useState(false)

  const gf = new GiphyFetch('yle9mCoWnx5F2oPoIF2dRCrhq2n8jcq0')

  const fetchGifs = async () => {
    try {
      setLoading(true)
      const { data } = await gf.search('animals', { limit: 10 })



      // create individual cards with Gif data (no paris yet)
      const gifCards = data.map((gif, index) => ({
        id: index,
        title: gif.title || `Card ${index + 1}`,
        image: gif.images.fixed_height.url,
        gifId: gif.id

      }))

      // duplicate cards and shuffle
      const cardPairs = [...gifCards, ...gifCards]
        .sort(() => Math.random() - 0.5)
        .map((card, index) => ({
          ...card,
          id: index
        }))

      setCards(cardPairs)
    } catch (err) {
      console.error('Gifhy API Error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load GIFs on component mount
  useEffect(() => {
    fetchGifs()
  }, [])

  if (loading) {
    return (
      <div className="app">
        <div className="text-white text-xl">Loading GIFs...</div>
      </div>
    )
  }

  const startNewGame = () => {
    setScore(0)
    setClickedTiles(new Set())
    setGameOver(false)
    fetchGifs()
  }
  // handle card click - replace clicked card and reshuffle
  const handleCardClick = (clickedCardId) => {

    if (gameOver) return

    const clickedCard = cards.find(card => card.id === clickedCardId)
    const cardTitle = clickedCard.title

    // check if this title has been clicked before
    if (clickedTiles.has(cardTitle)) {
      setScore(0)
      setClickedTiles(new Set())
      setGameOver(true)
      alert(`Game Over! clicked "${cardTitle}" again.`)
    } else {
      const newScore = score + 1
      setScore(newScore)
      setClickedTiles(prev => new Set([...prev, cardTitle]))
    }
    // Check if all unique titles have been clicked
    if (newScore === 10) {
      alert(`Congratulations! You've clicked all 10 unique GIFs! Final score: ${newScore}`)
      setGameOver(true)
    }

    // reshuffle all cards 
    const shuffledCards = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: card.id
      }))

    setCards(shuffledCards)
  }
  return (
    <div className="app">
      <div className="game-container">
        <Header />
        <Scoreboard score={score} gameOver={gameOver} onNewGame={startNewGame} />
        <GameBoard cards={cards} onCardClick={handleCardClick} />
        <Modal />
      </div>
    </div>
  )
}

export default App
