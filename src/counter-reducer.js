import expect from 'expect';
// import {createStore} from 'redux';

const counter = (state = 0, action) => {

    switch (action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }

};

const createStore = (reducer) =>{
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) =>{
        state = reducer(state, action);
        listeners.forEach(listener => listener()); //calling every listeners to notify about changes.
    };

    const subscribe = (listener) =>{
        listeners.push(listener); //any time the subscribe is called, new listener is pushed into the array.
        return () => {
            listeners = listeners.filter(l => l !== listener) //removes listener from the array.
        }
    };
    dispatch({});

    return { getState, dispatch, subscribe};
};


const store = createStore(counter);
const render = () =>{
    document.body.innerText = store.getState();
};
// console.log(store.getState());
// store.dispatch({type: 'INCREMENT'});
// console.log(store.getState());
store.subscribe(render);
render();

document.addEventListener('click', () =>{
    store.dispatch({type: 'INCREMENT'});
});

expect (
    counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect (
    counter(1, { type: 'INCREMENT' })
).toEqual(2);

expect (
    counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect (
    counter(1, { type: 'DECREMENT' })
).toEqual(0);

expect (
    counter(1, { type: 'SOMETHING_ELSE' })
).toEqual(1);

expect (
    counter(undefined, {})
).toEqual(0);
console.log('All tests passed!');