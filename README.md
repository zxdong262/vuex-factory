# vuex-factory
[![Build Status](https://travis-ci.org/zxdong262/vuex-factory.svg?branch=master)](https://travis-ci.org/zxdong262/vuex-factory)

factory lib to create types constants and mutations from init state.

## install
```bash
npm i --save-dev vuex-factory
```

## use

```javascript
import { constantFactory, mutationFactory } from 'vuex-factory'

let state = {
    loading: false,
    users: [],
    total: 0
}

const types = constantFactory(state)
/*
    types = {
        set_loading: 'set_loading',
        set_total: 'set_total',
        set_users: 'set_users',
        add_users: 'add_users',
        del_users: 'del_users',
        update_users: 'update_users'
    }
*/

const mutations = mutationFactory(state)

let store = new vuex.Store({
  state,
  mutations
})

/*
//all through 'data' key

//set will replace the whole value 
store.commit({
    type: types.set_loading
    ,data: true
})
store.commit({
    type: types.set_users
    ,data: [{ name: 'apple' }]
})

//add will push one item into array
store.commit({
    type: types.add_users
    ,data: { name: 'apple' }
})

//del will remove one item with same id by default
store.commit({
    type: types.del_users
    ,data: { id: 'appleid' }
    
    //optional compare fucntion
    compare: (a, b) => a.id === b.id

})

//update will update one item with same id by default
store.commit({
    type: types.update_users
    ,data: { id: 'appleid', name: 'orange' }
    //optional compare fucntion
    ,compare: (a, b) => a.id === b.id
})
*/

```

## test
```bash
git clone git@github.com:zxdong262/vuex-factory.git
cd vuex-factory
npm install

#test
npm run test
```

## License
MIT