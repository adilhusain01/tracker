import React from 'react';

const Food = ({ food }) => (
  <li className='ml-10 mt-5 '>
    {food.food.foodName} - Quantity: {food.food.quantity} - Protein: {food.food.protein} - Calories: {food.food.calories} - Completed: {food.isDone ? 'Yes' : 'No'}  - Date: {new Date(food.date).getDate()} {new Date(food.date).toLocaleString('default', { month: 'short' })} {new Date(food.date).getFullYear()}
  </li>
);

export default Food;
