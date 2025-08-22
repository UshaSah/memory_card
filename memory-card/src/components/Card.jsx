function Card({ card, onClick }) {
    const handleClick = () => {
        console.log('Card component clicked! Card:', card)
        if (onClick) {
            onClick(card.id)
        }
    }

    return (
        <div className="memory-card" onClick={handleClick}>
            <div className="card-inner">
                <div className="card-front">
                    <img
                        src={card.image}
                        alt={card.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '15px'
                        }}
                    />
                </div>
                <div className="card-back">
                    <p style={{ fontSize: '1rem', padding: '10px' }}>
                        {card.title}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Card 