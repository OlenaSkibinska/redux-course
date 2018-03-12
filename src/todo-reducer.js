import expect from 'expect';
import React from 'react';
import deepFreeze from 'deep-freeze';

const todos = (state = [], action) => {
   switch (action.type){
       case 'ADD_TODO':
           return [
               ...state,
               {
                   id: action.id,
                   text: action.text,
                   completed: false
               }
           ];
       default:
           return state;
   }
};

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};
testAddTodo();
console.log('All tests passed')