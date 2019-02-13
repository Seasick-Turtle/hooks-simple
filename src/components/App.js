import React, { useState } from 'react';
import ResourceList from './ResourceList';

const App = () => {
  /*
  * left hand side:
  *
  * 'resource' --- contains present value of that state,
  * same as this.state.resource
  *
  * 'setResource' --- setter function
  * same as this.setState({ resource: 'posts' )};
  *
  * *********************************************************
  * right hand side:
  *
  * useState --- function from React
  *
  * useState('posts') --- sets initial value of state
  * similar to initialized state in a class
  * ex: this.state({ resource: 'posts' )};
  *
  */
  const [resource, setResource] = useState('posts');

  return (
    <div>
      <div>
        <button onClick={() => setResource('posts')}>
          Posts
        </button>
        <button onClick={() => setResource('todos')}>
          Todos
        </button>
      </div>
      <ResourceList resource={resource}/>
    </div>
  )
};


export default App;