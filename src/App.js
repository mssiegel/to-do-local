import React, { useState, useEffect } from 'react'
import Column from './Column'
import './App.css'

function App() {
  useEffect(() => {
    localStorage['columns'] = JSON.stringify(columns)
  })

  const initialColumns = [
    { headColor: 'red', headText: 'Blocked', cards: ['Buy peaches', 'Drink milk'] },
    { headColor: 'lightblue', headText: 'Todo', cards: ['Buy oranges', 'Run 4'] },
    { headColor: 'gold', headText: 'In-Progress', cards: ['Bake Cookies', 'Snack on munchies'] },
    { headColor: 'green', headText: 'Completed', cards: ['Do homework'] }
  ]

  const storedColumns = localStorage['columns'] && JSON.parse(localStorage['columns'])
  const [columns, setColumns] = useState(storedColumns || initialColumns)

  function addCard(cardText, colI) {
    if (!cardText) return null
    setColumns(
      columns.map((column, curColI) => {
        if (curColI !== colI) return column
        else return { ...column, cards: [...column.cards, cardText] }
      })
    )
  }

  function removeCard(colI, cardI) {
    setColumns(
      columns.map((column, curColI) => {
        if (curColI !== colI) return column
        else return { ...column, cards: column.cards.filter((card, curCardI) => curCardI !== cardI) }
      })
    )
  }

  function switchColumns(oldColI, cardI, newColI) {
    const cardText = columns[oldColI].cards[cardI]
    setColumns(
      columns.map((column, curColI) => {
        if (curColI === oldColI)
          return { ...column, cards: column.cards.filter((card, curCardI) => curCardI !== cardI) }
        else if (curColI === newColI) return { ...column, cards: [...column.cards, cardText] }
        else return column
      })
    )
  }

  return (
    <div className='App'>
      {columns.map((column, colI) => (
        <Column
          column={column}
          addCard={addCard}
          removeCard={removeCard}
          colI={colI}
          key={colI}
          switchColumns={switchColumns}
        />
      ))}
    </div>
  )
}

export default App
