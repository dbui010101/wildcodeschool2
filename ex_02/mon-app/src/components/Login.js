//import React, { Component } from 'react';
import React, {Fragment, useState} from "react"
import "../index.css"
import { useForm } from 'react-hook-form';
import { BrowserRouter as Router, Switch, Route, Link,Redirect,useHistory } from 'react-router-dom';

const axios = require('axios');
function Login() {
  const [state, setpost] = useState();
  const history = useHistory();
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const onSubmit = (data) => {
      const resultat={
        login:data.login,
        password:data.password,
      };
      axios.post(`http://localhost:4242/login`,resultat)
        .then(res => {
          console.log(res);
          console.log(res.data);// resultat de node login welcome blabla
          const valeurNode=res.data
          history.push("/"+valeurNode);
          setpost(res.data)
        })
    };
return (
  <React.Fragment>
  <form onSubmit={handleSubmit(onSubmit)}>
  login
  <input {...register('login')} /> {/* register an input */}
  password<input {...register('password', { required: true })} />
  <input type="submit" />
</form>
<p>{state}</p>
</React.Fragment>
);
}
export default Login;