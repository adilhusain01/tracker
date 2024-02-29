import React from 'react';

const Activity = ({ activity }) => (
  <li className='ml-10 mt-5'>
    {activity.activity.name} - Completed: {activity.isCompleted ? 'Yes' : 'No'} - Date: {new Date(activity.date).getDate()} {new Date(activity.date).toLocaleString('default', { month: 'short' })} {new Date(activity.date).getFullYear()}
  </li>
);

export default Activity;
