import React, { Component } from 'react'
import { observer } from 'mobx-react'

import '../css/App.css'

const ItemList = props => {
  const store = props.store

  const handleClick = e => {
    let activeElem = e.target

    store.activeElem && store.activeElem.setAttribute('style', '')

    store.activeElem = activeElem
    activeElem.setAttribute('style', 'color: red;')
  }

  const list = props.children.map(child => (
    <li onClick={ handleClick } key={ child } > 
      { child } 
    </li>
    )
  )

  return (
    <ul> { list } </ul>
  )
}

@observer
class AddNavbarItem extends Component {
  render() {
    const store = this.props.store
    let { inputVal, list } = store

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

    return (
      <div>
        <input 
          type="radio" 
          name="radio"
          onClick={ () => store.list = 'left' }
          selected
        />
        Left list
        <input 
          type="radio" 
          name="radio"
          onClick={ () => store.list = 'right' }
        /> 
        Right list
        <br />
        <input 
          type="text" 
          placeholder={ `add item to ${ this.props.store.list } list` }
          value={ inputVal } 
          onChange={ handleInputChange }
          onKeyUp={ handleKeyUp }
        />
        <br />
        <button onClick={ tryAddItem } > Add item </button>
      </div>
    )
  }
}

@observer
class Page extends Component {
  render() {
    const props = this.props
    const store = props.store

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
  }
}

export default Page;