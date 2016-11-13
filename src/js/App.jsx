import React, { Component } from 'react'
import '../css/App.css'

const MyNavItemList = props => {

  return (
    <ul>
      { 
        props.children.map(child => (
          <li onClick={ props.handleClick } key={ child } > 
            { child } 
          </li>
        ))
      }
    </ul>
  )
}

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = { activeElem: null }
  }
  handleClick(event) {
    let activeElem = event.target 

    this.setState((prevState, props) => {
      prevState.activeElem && prevState.activeElem.setAttribute('style', '')

      activeElem.setAttribute('style', 'color: red;')

      return { activeElem }
    })
  }
  render() {
    return (
      <nav className="navbar">
        <MyNavItemList handleClick={ e => this.handleClick(e) } > 
          { this.props.navItems.left }
        </MyNavItemList>
        <MyNavItemList handleClick={ e => this.handleClick(e) } > 
          { this.props.navItems.right }
        </MyNavItemList>
      </nav>
    )
  }
}

class AddNavbarItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: 1,
      value: ''
    }
  }
  handleInputChange(event) {
    this.setState({ value: event.target.value })
  }
  handleBtnClick(event) {
    const 
      value = this.state.value,
      list  = this.state.list

    if ( value !== '' ) {
      if ( list === 1 ) {
        this.props.onNewItemAdded({ value, list: 'left' })
        this.setState({ value: '' })
      }
      else {
        this.props.onNewItemAdded({ value, list: 'right' })
        this.setState({ value: '' })
      }
    }
  }
  handleKeyUp(event) {
    const keyCode = (typeof event.which === 'number' ? event.which : event.keyCode)
    keyCode === 13 && this.handleBtnClick( event )
  }
  render() {
    return (
      <div>
        <input 
          type="radio" 
          name="radio" 
          value="list1" 
          onClick={ () => this.setState({ list: 1 }) }
          selected
        />
        List 1
        <input 
          type="radio" 
          name="radio" 
          value="list2"
          onClick={ () => this.setState({ list: 2 }) }
        /> 
        List 2
        <br />
        <input 
          type="text" 
          placeholder={ 'add item to list ' + this.state.list }
          value={ this.state.value } 
          onChange={ e => this.handleInputChange(e) }
          onKeyUp={ e => this.handleKeyUp(e) }
        />
        <br />
        <button onClick={ e => this.handleBtnClick(e) } > Add item </button>
      </div>
    )
  }
}

class Page extends Component {
  constructor() {
    super()

    this.state = {
      navItems: {
        left: [],
        right: []
      }
    }
  }
  handleNavItemChange(item) {
    this.setState((prevState, props) => {

      let newState = prevState
      newState.navItems[item.list].push(item.value)

      return newState
    })
  }
  render() {
    return (
      <div>
        <AddNavbarItem onNewItemAdded={ i => this.handleNavItemChange(i) } />
        <Navbar navItems={ this.state.navItems } />
      </div>
    )
  }
}

export default Page;