import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { isTemplateElement } from '@babel/types';

const API_URL = 'http://fakerestapi.azurewebsites.net/api';

const resources = [
  'activities',
  'authors',
  'books',
  'coverPhotos',
  'users'
];

const getFullUrl = (resource, params) => `${API_URL}/${resource}${params ? '/' + params : ''}`;

async function getAll(resource) {
  const json = await axios.get(getFullUrl(resource));
  return json;
}

const remove = async (resource, id) => await axios.delete(getFullUrl(resource, id));

function TableActivities({ activities = [] }) {

  return <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>DueDate</th>
        <th>Completed</th>
        <th></th>
      </tr>
    </thead>
    <tbody>

      {activities.map((item, index) => <tr>
        <td>{item.ID}</td>
        <td>{item.Title}</td>
        <td>{item.DueDate}</td>
        <td>{item.Completed}</td>
        <td>
          <a type="button" onClick={e => {
            e.preventDefault();
            const res = remove(item.ID);
            console.log(res);

            alert(`${item.ID} Removido com sucesso`)

          }} >
            Remover
            </a>
        </td>
      </tr>)}

    </tbody>

  </table>
}

function App() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {

    const list = getAll('activities');
    console.log(list);

    //setActivities();
  }, []);

  return <div>
    <h1>Hello World</h1>

    <TableActivities activities={activities} />

  </div>
}

export default App;
