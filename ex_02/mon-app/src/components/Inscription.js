import React, {Fragment, useState, useEffect} from 'react';
import "../index.css"
import { useForm } from 'react-hook-form';


const axios = require('axios');
// const data=axios.get(`http://localhost:4242/allUsers`)
//   .then(res => {
//     return res.data;
//   })

function Inscription() {
        const [newMember, setNewMember] = useState([]);
        const [allUsers, setallUsers] = useState([]);

        const fetchData = async () => {
          const data = await axios.get(`http://localhost:4242/allUsers`)
          .then(res => {
            console.log(res.data);
            //console.log(res.data);
            
            setallUsers(res.data)
            
          }).catch(console.error);
        } 
        useEffect(() => {
          // declare the data fetching function
          
          const fetchData = async () => {
            const data = await axios.get(`http://localhost:4242/allUsers`)
            .then(res => {
              
              //console.log(res.data);
              setallUsers(res.data)
              console.log(res.data);
            }).catch(console.error);
          }     
          fetchData()  
          // call the function
            // make sure to catch any error
            // .catch(console.error);
          
        }, [newMember])

       
        
        /*useEffect(() => {
          allUsers.forEach(obj => {
            Object.entries(obj).forEach(([key, value]) => {
              console.log(`${key} ${value}`);
            });
            console.log('-------------------');
          });
        },[allUsers])*/

        const {
            register,
            handleSubmit,
            formState: { errors },
          } = useForm();


          const onSubmit = (data) => {
            const resultat={
              login:data.login,
              email:data.email,
              password:data.password,
              passwordConfirm:data.passwordConfirm,
            };
            axios.post(`http://localhost:4242/register`,resultat)
              .then(res => {
                console.log("premiere submit register OK");
                setNewMember(res.data)
              })
            
              
              
        
          };

      
      async function rafraichir() {
        console.log("coucou")
        await axios.get(`http://localhost:4242/allUsers`)
            .then(res => {
              
              //console.log(res.data);

              console.log("RAFAIC")
            }).catch(console.error);
          
        //fetchData()
      }



      return (
        <React.Fragment>
        <form onSubmit={handleSubmit(onSubmit)}>
        login
        <input {...register('login')} /> {/* register an input */}
        email<input {...register('email', { required: true })} />
        password<input {...register('password', { required: true })} />
        passwordConfirm<input {...register('passwordConfirm', { required: true })} />
        <input type="submit" />
      </form>
      <button onClick={() => rafraichir()}>Rafraichir</button>
      {allUsers ? allUsers.map((e, k) => (<p>{e.login}</p>)) : <p>PAS de users</p>}
      <p>{newMember}</p>
      

      </React.Fragment>
      );
  }
  
  export default Inscription;