export function constantFactory (initState) {
  let obj = {}
  let keys = Object.keys(initState)
  keys.forEach(key => {
    let value = initState[key]
    let methods = ['set']
    if (Array.isArray(value)) {
      methods = ['set', 'add', 'del', 'update']
    }
    methods.forEach(met => {
      let name = met + '_' + key
      obj[name] = name
    })
  })
  return Object.freeze(obj)
}

export function mutationFactory(initState) {

  let types = constantFactory(initState)

  let mutations = {}

  function mutate(prop) {
    return Object.assign({}, state, prop)
  }

  //build mutation tree
  Object.keys(types).forEach(typ => {

    let arr = typ.split('_')
    let method = arr[0]
    let target = arr[1]
    let func
    if (method === 'set') {
      func = (state, payload) => {
        state[target] = payload.data
      }
    } else if (method === 'add') {
      func = (state, payload) => {
        state[target] = state[target].slice(0).concat(payload.data)
      }
    } else if (method === 'del') {
      func = (state, payload) => {
        let rt = target
        let arr0 = state[rt].slice(0)
        let data = payload.data
        let compare = payload.compare
        for (let i = 0, len = arr0.length; i < len; i++) {
          let item = arr0[i]
          let res = compare ? compare(item, data) : item.id === data.id
          if (res) {
            arr0.splice(i, 1)
            break
          }
        }
        state[rt] = arr0
      }
    } else if (method === 'update') {
      func = (state, payload) => {
        let rt = target
        let arr0 = state[rt].slice(0)
        let data = payload.data
        let compare = payload.compare
        for (let i = 0, len = arr0.length; i < len; i++) {
          let item = arr0[i]
          let res = compare ? compare(item, data) : item.id === data.id
          if (res) {
            arr0.splice(i, 1, Object.assign({}, item, data))
            break
          }
        }
        state[rt] = arr0
      }
    }
    mutations[typ] = func
  })

  return mutations

}