import expect from 'expect';
import React from 'react';
import deepFreeze from 'deep-freeze';

const toggleTodo = (todo) => {
    return {
        ...todo,
        completed: !todo.completed
    };
};

const testToggleTodo = () => {
     const todoBefore = {
         id: 0,
         text: 'Learn Redux',
         completed: false
     };
    const todoAfter = {
        id: 0,
        text: 'Learn Redux',
        completed: true
    };
    deepFreeze(todoBefore);
    expect(
        toggleTodo(todoBefore)
    ).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests passed');