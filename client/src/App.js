import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import FormikUpdateMovie from "./Movies/UpdateMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movie, setMovie] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => {
        // console.log(res)
        setMovie(res.data)})
      .catch(error => console.log(error));
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path="/update-movie/:id" render={props => {
        return <FormikUpdateMovie {...props} movie={movie} setMovie={setMovie} />
      }} />
    
    </>
  );
};

export default App;
