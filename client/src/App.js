import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  // reset your form state and route the user to `/movies` where they will see the updated movie in the list
  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
        //Add a route at the path `/update-movie/:id`
      />
      <Route path="/update-movie/:id" component={UpdateMovie} />
      <Route path="/add-movie" component={UpdateMovie} />
    </>
  );
};

export default App;