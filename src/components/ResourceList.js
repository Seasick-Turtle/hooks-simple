import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResourceList = ({ resource }) => {
  const [resources, setResources] = useState([]);
  /*
   * useEffect gets called every time the
   * component is rendered
   *
   * *********************************************************
   *
   * between renders, if the element inside the
   * array is different, the component will call
   * the arrow function (which in effect re-renders
   * the component); if the state remains the same,
   * there will be no re-rendering
   *
   * *********************************************************
   *
   * Ex: initial state = posts
   * clicking on todos, changes resource in App.js
   * resource gets passed into ResourceList, etc.
   * useEffect checks the state, since state goes
   * from: posts -> todos, it re-renders
   *
   * *********************************************************
   *
   * clicking on todos multiple times does not
   * cause a rerender
   * state: todos -> todos... identical values
   */
  useEffect(
    () => {
      /*
      * *********************************************************
      * useEffect does not support promises or async functions
      * *********************************************************
      *
      * However, you can use an IIFE to get around from
      * having to declare additional functions
      *
      */
      ( async resource => {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);

          setResources(response.data);
        })(resource);

  },[resource]);

    return (
      <ul>{resources.map(record => (
        <li key={record.id}>{record.title}</li>
      ))}
      </ul>
    )
};

export default ResourceList;

/*
 * Extra information/tests about useEffect:
 *
 * *********************************************************
 * useEffect does not support promises or async functions
 * *********************************************************
 *
 * DIDN'T PASS IN THE ARRAY (CONTINUOUS CALL):
 * ex: useEffect(() => {})
 * if you don't pass in the second array to useEffect
 * the arrow function will be continually invoked when
 * the component re-renders
 *
 * *********************************************************
 *
 * PASS AN EMPTY ARRAY (ONE TIME CALL):
 * ex: useEffect(() => {}, [])
 * arrow function gets called once,
 * it is the equivalent of ComponentDidMount
 *
 * *********************************************************
 *
 * PASS AN ARRAY WITH A SINGLE VALUE (LIMIT THE CALL):
 * ex: useEffect(() => {}, [1]
 * Just like empty array, the value doesn't change
 * no re-render
 *
 * *********************************************************
 *
 * PASS AN ARRAY WHOSE VALUE CHANGES:
 * ex: useEffect(() => {}, ['h1']) -> useEffect(() => {}, [1]);
 * This will call the inner function another time
 *
 * *********************************************************
 *
 * PASS AN ARRAY WITH AN OBJECT:
 * ex: useEffect(() => {}, [{ color: 'red'}]) -> useEffect(() => {}, [{ color: 'red'}]);
 * uses the same comparison as redux, while the key/value is the same
 * each is a new object, causing a re-render
 *
 * *********************************************************
 *
 * PASS AN ARRAY WITH MULTIPLE VALUES:
 * ex: useEffect(() => {}, [10, 10]) -> useEffect(() => {}, [10, 10]);
 * remains the same, no re-rendering
 *
 * *********************************************************
 *
 * PASS AN ARRAY WITH MULTIPLE VALUES:
 * ex: useEffect(() => {}, [10, 10]) -> useEffect(() => {}, [10]);
 * values have changed, arrow function will be called
 *
 */