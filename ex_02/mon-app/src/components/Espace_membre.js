
import React, {Fragment, useState} from 'react';
import {useLocation} from "react-router-dom";
import { useForm } from 'react-hook-form';

const axios = require('axios');
function Espace_membre() {
  const [state, setpost] = useState();
  const location = useLocation();  
  console.log(location);
  
  
        const {
            register,
            handleSubmit,
            formState: { errors },
          } = useForm();
          const onSubmit = (data) => {
            const resultat={
              user:location.pathname.substring(1),
              titre:data.titre,
              contenu:data.contenu,
              
            };
            axios.post(`http://localhost:4242/creebillet`,resultat)
              .then(res => {
                console.log(res);
                //console.log(res.data);
                setpost(res.data)
              })
        
          };


  return (
    
      <React.Fragment>
        <div>
      <h1>Espace_membre page</h1>
      <p>{location.pathname}</p>      
      <p>{new URLSearchParams(location.search).get('name')}</p>    
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      titre
      <input {...register('titre', { required: true })} /> 
      contenu<input {...register('contenu', { required: true })} />
      <input type="submit" />
    </form>
    <p>{state}</p>
    </React.Fragment>
  );
}

export default Espace_membre;