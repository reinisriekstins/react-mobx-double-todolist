import React from 'react'
import { observer } from 'mobx-react'

import '../css/App.css'

const ItemList = observer(props => {
  const { store, children } = props

  const handleClick = e => {
    let activeElem = e.target

    store.activeElem && store.activeElem.setAttribute('style', '')

    store.activeElem = activeElem
    activeElem.setAttribute('style', 'color: red;')
  }

  const list = children.map(child => (
    <li onClick={ handleClick } key={ child } >
      { child }
    </li>
    )
  )

  return (
    <ul> { list } </ul>
  )
})

const AddNavbarItem = observer(props => {
  const { store } = props
  const { inputVal, list } = store

  const tryAddItem = () => {
    if ( inputVal !== '' ) {
      store[list].push(inputVal)
      store.inputVal = ''
    }
  }

  const handleInputChange = e => {
    store.inputVal = e.target.value
  }

  const handleKeyUp = e => {
    const keyCode = (typeof e.which === 'number' ? e.which : e.keyCode)
    keyCode === 13 && tryAddItem()
  }

  const handleRadioClick = e => {
    let id = e.target.id

    if ( id.endsWith('left') ) store.list = 'left'
    else if ( id.endsWith('right') ) store.list = 'right'
    else throw new Error('Incorrect radio button id')

    document.querySelector('#todo-input').focus()
  }

  return (
    <div>
      <input
        id="radio-left"
        type="radio"
        name="radio"
        onClick={ handleRadioClick }
      />
      <label htmlFor="radio-left">Left list</label>
      <input
        id="radio-right"
        type="radio"
        name="radio"
        onClick={ handleRadioClick }
      />
      <label htmlFor="radio-right">Right list</label>
      <br />
      <input
        id="todo-input"
        type="text"
        placeholder={ `add item to ${ store.list } list` }
        value={ inputVal }
        onChange={ handleInputChange }
        onKeyUp={ handleKeyUp }
      />
      <br />
      <button onClick={ tryAddItem } > Add item </button>
    </div>
  )
})

const Page = observer(props => {
  const { store } = props

  return (
    <div>
      <AddNavbarItem store={ store } />
      <nav className="navbar">
        <ItemList store={ store } >
          { store.left }
        </ItemList>
        <ItemList store={ store } >
          { store.right }
        </ItemList>
      </nav>
    </div>
  )
})

export default Page;