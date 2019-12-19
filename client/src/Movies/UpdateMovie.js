import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UpdateMovie = props => {
  const [data, setData] = useState({});
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (params.id) {
      axios
        .get(`http://localhost:5000/api/movies/${params.id}`)
        .then(res => setData(res.data))
        .catch(err => console.error(err));
    }
  }, []);
// PUT request
  const handleSubmit = e => {
    e.preventDefault();
    // The form should make a PUT request to the server when submitted
    if (params.id) {
      axios
        .put(`http://localhost:5000/api/movies/${params.id}`, data)
        .then(res => history.push(`/`))
        .catch(err => console.erro(err));
    } else {
      axios
        .post(`http://localhost:5000/api/movies/`, data)
        .then(res => history.push(`/`))
        .catch(err => console.erro(err));
    }
  };

  const handleChange = e => {
    e.persist();
    if (e.target.name === "stars") {
      setData(prevData => ({
        ...prevData,
        [e.target.name]: e.target.value.split(",")
      }));
    } else {
      setData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
    }
  };

  return (
    // Create a component with a form to update the chosen movie
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={data.title}
          placeholder="Title"
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="text"
          name="director"
          value={data.director}
          placeholder="Director"
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="text"
          name="metascore"
          value={data.metascore}
          placeholder="Metascore"
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="text"
          name="stars"
          value={data.stars}
          placeholder="Stars"
          onChange={e => handleChange(e)}
        />
        <br />
        {/* Add a button in the movie component that routes you to your new route with the movies's id as the URL param */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateMovie;