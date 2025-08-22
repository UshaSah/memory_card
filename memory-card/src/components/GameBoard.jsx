import Card from './Card'

function GameBoard({ cards }) {
    return (
        <div className="cards-grid">
            {cards.length > 0 ? (
                cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                    />
                ))
            ) : (
                <p className="text-lg col-span-full text-center">Loading cards...</p>
            )}
        </div>
    )
}

export default GameBoard 