import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {
  console.log(props);
  const [movie, setMovie] = useState(null);

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(props.match.params.id);
  }, [props.match.params.id]);

  const handleChange = e => setMovie({...movie, [e.target.name]: e.target.value});

  const handleStar = index => e => {
    setMovie({...movie, stars: movie.stars.map((star, starIndex) => {
      return starIndex === index ? e.target.value : star;
    })});
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        props.history.push('/');
      })
      .catch(err => console.log(err.response));
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text"
             name="title"
             placeholder="title"
             value={movie.title}
             onChange={handleChange} />
      <input type="text"
             name="director"
             placeholder="director"
             value={movie.director}
             onChange={handleChange} />
      <input type="text"
             name="metascore"
             placeholder="metascore"
             value={movie.metascore}
             onChange={handleChange} />
      {movie.stars.map((starName, index) => {
        return <input type="text"
                      placeholder="star"
                      value={starName}
                      key={index}
                      onChange={handleStar(index)} />;
      })}
      <button type="submit">Update Movie</button>
    </form>
  );
};

export default UpdateMovie;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Movie from './Movie';

// const initialItem = {
//   id: '',  
//   title: '',
//   director: '',
//   metascore: '',
//   stars: [],
// };

// const UpdateMovie = props => {
//   // const [item, setItem] = useState({});
// //   const [stars, setStars]
// //    console.log(item)
//   // useEffect(() => {
//   //   const id = props.match.params.id;
//   //   const itemInArr = props.item.find(item => {
//   //       console.log(item.id, id)
//   //       return `${item.id}` === id});
//   //   if (itemInArr) setItem(itemInArr);
//   // }, [props.item, props.match.params.id]);
//   const [item, setItem] = useState({});

//   const fetchMovie = id => {
//     axios
//       .get(`http://localhost:5000/api/movies/${id}`)
//       .then(res => setItem(res.data))
//       .catch(err => console.log(err.response));
//   };

//   useEffect(() => {
//     fetchMovie(props.match.params.id);
//   }, [props.match.params.id]);
 
//   const changeHandler = e => setItem({...item, [e.target.name]: e.target.value});

//   const starsHandler = index => e => {
//     setItem({...item, stars: item.stars.map((star, starIndex) => {
//       return starIndex === index ? e.target.value : star;
//     })})
// }

//   const handleSubmit = e => {
//     e.preventDefault();
//     axios
//       .put(`http://localhost:5000/api/movies/${item.id}`, item)
//       .then(res => {
//         console.log("put request",res, item);
//         setItem(initialItem);
//         console.log("setItem", setItem)
//         setItem(res.data);
//         // props.history.push(`/api/movies/${item.id}`);
//       })
//       .catch(err => console.log(err.response));
//   };

//   return (
//     <div>
//       <h2>Update Movie</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           onChange={changeHandler}
//           placeholder="title"
//           value={item.title}
//         />

//         <input
//         type="string"
//           name="director"
//           onChange={changeHandler}
//           placeholder="director"
//           value={item.director}
//         />

//         <input
//           type="number"
//           name="metascore"
//           onChange={changeHandler}
//           placeholder="metascore"
//           value={item.metascore}
//         />

// {item.stars.map((starName, index) => {
//         return <input type="text"
//                       placeholder="star"
//                       value={starName}
//                       key={index}
//                       onChange={starsHandler(index)} />;
//       })}


//         <button className="">Update</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateMovie;







// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
// import { Form, Field, withFormik } from 'formik';
// import * as Yup from 'yup';

// const UpdateMovie = ({ errors, touched, values, handleSubmit, status, ...props }) => {
//   const [item, setItem] = useState({});
//   console.log(item);

//   useEffect(() => {
//     if (status) {
//       setItem([...item, status]);
//     }
//   }, [status]);

// //   useEffect(() => {
// //     const id = props.match.params.id;
// //     const itemInArr = props.movies.find(item => `${item.id}` === id);
// //     if (itemInArr) setItem(itemInArr);
// //   }, [props.movies, props.match.params.id]);

//   return (
//     <div className="form">
//       <h1>Update Movie</h1>
//       <Form>
//         <Field type="text" name="title" placeholder="title" />
//         {touched.title && errors.title && (
//           <p className="error">{errors.title}</p>
//         )}

//         <Field type="text" name="director" placeholder="director" />
//         {touched.director && errors.director && <p className="error">{errors.director}</p>}

//         <Field type="text" name="metascore" placeholder="metascore" />
//         {touched.metascore && errors.metascore && <p className="error">{errors.metascore}</p>}

//         <Field type="text" name="stars" placeholder="stars" />
//         {touched.stars && errors.stars && <p className="error">{errors.stars}</p>}

//         <button type="submit">Update</button>
//       </Form>

     
//     </div>
//   );
// };

// const FormikUpdateMovie = withFormik({
//   mapPropsToValues({ title, director, metascore, stars }) {
//     return {
//       title: title || '',
//       director: director || '',
//       metascore: metascore || '',
//       stars: stars || "",
//     };
//   },

//   validationSchema: Yup.object().shape({
//     title: Yup.string().required('Need A Title'),
//     director: Yup.string().required(),
//     metascore: Yup.string().required(),
//     stars: Yup.string().required(),
//   }),

//   handleSubmit(item, id, {...props}, { setStatus }) {
//     axios
//     .put(`https://localhost:3000/api/movie/0`, item)
//     .then(res => {
//       console.log(setStatus);
//       setStatus(item);
//       props.updateItems(res.data);
//       props.history.push('/movies');
//     })
//     .catch(err => console.log(err.response));
//     }
// })(UpdateMovie); 

// export default FormikUpdateMovie;



