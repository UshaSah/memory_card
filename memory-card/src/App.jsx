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

  const gf = new GiphyFetch('yle9mCoWnx5F2oPoIF2dRCrhq2n8jcq0')

  const fetchGifs = async () => {
    try {
      setLoading(true)
      const { data } = await gf.search('animals', { limit: 10 })

      // create individual cards with Gif data (no paris yet)
      const gifCards = data.map((gif, index) => ({
        id: index,
        title: gif.title || `Card $(index + 1)`,
        image: gif.images.fixed_height.url,
        gifId: gif.id

      }))
      setCards(gifCards)
    } catch (err) {
      console.error('Gifhy API Error:', err)
    } finally {
      setLoading(false)
    }
  }
  // // Fetch GIFs from Giphy
  // const fetchGifs = async () => {
  //   try {
  //     setLoading(true)
  //     // Fetch 8 different GIFs (for 8 pairs = 16 cards total)
  //     const { data } = await gf.search('animals', { limit: 8 })

  //     // Create card pairs with GIF data
  //     const gifCards = data.map((gif, index) => ({
  //       id: index,
  //       title: gif.title || `Card ${index + 1}`,
  //       image: gif.images.fixed_height.url,
  //       gifId: gif.id
  //     }))

  //     // Duplicate cards to create pairs and shuffle
  //     const cardPairs = [...gifCards, ...gifCards]
  //       .sort(() => Math.random() - 0.5)
  //       .map((card, index) => ({
  //         ...card,
  //         id: index, // Ensure unique IDs for the pairs
  //         isFlipped: false,
  //         isMatched: false
  //       }))

  //     setCards(cardPairs)
  //   } catch (err) {
  //     console.error('Giphy API Error:', err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

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

  return (
    <div className="app">
      <div className="game-container">
        <Header />
        <Scoreboard />
        <GameBoard cards={cards} />
        <Modal />
      </div>
    </div>
  )
}

export default App
