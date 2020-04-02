import React from 'react'
import './App.css'

const Card = ({ cardText, switchColumns, colI, cardI, removeCard }) => {
  return (
    <div className='card'>
      {colI > 0 && (
        <span className='arrow' onClick={() => switchColumns(colI, cardI, colI - 1)}>
          {'<'}
        </span>
      )}
      <span className='card-text'>{cardText}</span>
      <span className='remove-card' onClick={() => removeCard(colI, cardI)}>
        X
      </span>
      {colI < 3 && (
        <span className='arrow' onClick={() => switchColumns(colI, cardI, colI + 1)}>
          {'>'}
        </span>
      )}
    </div>
  )
}

const Column = ({ column: { headColor, headText, cards }, addCard, colI, switchColumns, removeCard }) => {
  return (
    <div className='column'>
      <div className='column-head' style={{ background: headColor }}>
        {headText}
      </div>
      {cards.map((cardText, cardI) => (
        <Card
          cardText={cardText}
          switchColumns={switchColumns}
          colI={colI}
          cardI={cardI}
          key={cardI}
          removeCard={removeCard}
        />
      ))}
      <div className='add-card-container'>
        <span className='add-card' onClick={() => addCard(window.prompt('What card would you like to add?'), colI)}>
          + Add a card
        </span>
      </div>
    </div>
  )
}

export default Column
