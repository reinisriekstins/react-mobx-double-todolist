import { autorun, observable } from 'mobx'

class AppStore {
  @observable left = []
  @observable right = []

  @observable activeElem = null

  @observable list = 'left'

  @observable inputVal = ''
}

let store = window.store = new AppStore()

autorun(() => {
  console.log(store.left)
  console.log(store.right)
  console.log(store.activeElem)
  console.log(store.list)
  console.log(store.inputVal)
})

export default store
