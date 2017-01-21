import React from 'react'
import { observer } from 'mobx-react'

import '../css/App.css'

const Item = observer(props => {
  const { store, children, child } = props

  const style = (() => {
    if ( store.activeElem && child === store.activeElem)
      return { color: 'red' }
    return {}
  })()

  const handleClick = e => {
    console.log(child)
  }

  return (
    <li
      onClick={ e => store.activeElem = e.target.innerText }
      style={ style } >
      { children }
    </li>
  )
})

const ItemList = observer(props => {
  const { store, children } = props

  return (
    <ul>
    {
      children.map((child, i) => (
        <Item
          key={ child }
          store={ store }
          child={ child } >
          { child }
        </Item>
      ))
    }
    </ul>
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

const RemoveItem = observer(props => {
  const { store } = props
  const { left, right } = store

  const handleClick = e => {
    const
      leftIncludes = left.includes(store.activeElem),
      rightIncludes = right.includes(store.activeElem)

    if ( leftIncludes )
      left.splice(left.indexOf(store.activeElem), 1)

    if ( rightIncludes )
      right.splice(right.indexOf(store.activeElem), 1)

    if ( leftIncludes || rightIncludes )
      store.activeElem = null
  }

  return (
    <button onClick={ handleClick }>
      Remove Item
    </button>
  )
})

const Page = observer(props => {
  const { store } = props

  return (
    <div>
      <AddNavbarItem store={ store } />
      <RemoveItem store={ store } />
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