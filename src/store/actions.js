const actions = {
    async customers({commit}) {
        console.log("actions");
        commit('getDataCustomer')
    }
}

export default actions;

// const foo = 'bar'

// const callSomething = function () { console.log(foo); }

// const object = {
//     foo,

//     async callSomething () {

//     }
// }

// object.foo