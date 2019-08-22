import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
    id: '',
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

const UpdateMovie = props => {
  const [item, setItem] = useState({});
   console.log(item)
  useEffect(() => {
    const id = props.match.params.id;
    const itemInArr = props.item.find(item => {
        console.log(item.id, id)
        return `${item.id}` === id});
    if (itemInArr) setItem(itemInArr);
  }, [props.item, props.match.params.id]);

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    // if (e.target.name === 'price') {
    //   value = parseInt(value, 10);
    // }

    setItem({
      ...item,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // axios
    //   .put(`http://localhost:5000/update-movie/${props.movie.id}`, props.movie)
    //   .then(res => {
    //     console.log(res);
    //     setItem(initialItem);
    //     props.updateItems(res.data);
    //     props.history.push('/movies');
    //   })
    //   .catch(err => console.log(err.response));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.title}
        />

        <input
        type="string"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={item.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={item.metascore}
        />

        <input
            type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={[item.stars]}
        />

        <button className="">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;







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



