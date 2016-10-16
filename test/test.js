const chai = require('chai'),
    expect = chai.expect,
    pkg = require('../package.json'),
    resolve = require('path').resolve,
    should = chai.should(),
    factories = require('../dist/vuex-factory')

const { constantFactory, mutationFactory } = factories

let init = () => ({
    users: [],
    loading: false
})

describe(pkg.name, function() {

    it('types', function() {
        let types = constantFactory(init())
        expect(types.set_loading).to.equal('set_loading')
        expect(types.set_users).to.equal('set_users')
        expect(types.add_users).to.equal('add_users')
        expect(types.del_users).to.equal('del_users')
        expect(types.update_users).to.equal('update_users')
    })

    it('mutations set', function() {

        let mutations = mutationFactory(init())
        let state = init()
        let s1 = {
            type: 'set_loading',
            data: true
        }
        mutations.set_loading(state, s1)

        expect(state.loading).to.equal(true)

    })

    it('mutations set array', function() {

        let mutations = mutationFactory(init())
        let state = init()
        let s2 = {
            type: 'set_users',
            data: [{ x: 1 }]
        }
        mutations.set_users(state, s2)
        expect(state.users[0].x).to.equal(1)

    })

    it('mutations del array item', function() {

        let mutations = mutationFactory(init())
        let state = init()
        let s2 = {
            type: 'set_users',
            data: [{ id: 0 }]
        }
        mutations.set_users(state, s2)
        expect(state.users.length).to.equal(1)
        let s3 = {
            type: 'del_users',
            data: { id: 0 }
        }
        mutations.del_users(state, s3)
        expect(state.users.length).to.equal(0)

    })

    it('mutations del array item width custom compare', function() {

        let mutations = mutationFactory(init())
        let state = init()
        let s2 = {
            type: 'set_users',
            data: [{ xid: 0 }]
        }
        mutations.set_users(state, s2)
        expect(state.users.length).to.equal(1)
        let s3 = {
            type: 'del_users',
            data: { xid: 0 },
            compare: (a, b) => a.xid === b.xid
        }
        mutations.del_users(state, s3)
        expect(state.users.length).to.equal(0)

    })

    it('mutations update array item', function() {

        let mutations = mutationFactory(init())
        let state = init()
        let s2 = {
            type: 'set_users',
            data: [{ id: 0, x: 9 }]
        }
        mutations.set_users(state, s2)
        expect(state.users[0].x).to.equal(9)
        let s3 = {
            type: 'del_users',
            data: { id: 0, x: 19 }
        }
        mutations.update_users(state, s3)
        expect(state.users[0].x).to.equal(19)

    })


    it('mutations update array item with custom compare', function() {

        let mutations = mutationFactory(init())
        let state = init()
        let s2 = {
            type: 'set_users',
            data: [{ xid: 0, x: 9 }]
        }
        mutations.set_users(state, s2)
        expect(state.users[0].x).to.equal(9)
        let s3 = {
            type: 'del_users',
            data: { xid: 0, x: 19 },
            compare: (a, b) => a.xid === b.xid
        }
        mutations.update_users(state, s3)
        expect(state.users[0].x).to.equal(19)

    })

    it('mutations add array item', function() {

        let mutations = mutationFactory(init())
        let state = init()
        let s2 = {
            type: 'set_users',
            data: [{ id: 0, x: 9 }]
        }
        mutations.set_users(state, s2)
        expect(state.users[0].x).to.equal(9)
        let s3 = {
            type: 'del_users',
            data: { id: 0, x: 19 }
        }
        mutations.add_users(state, s3)
        expect(state.users[1].x).to.equal(19)

    })

})