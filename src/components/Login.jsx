import React, { useState } from "react";
import {LOGIN}  from "../graphql/Queries";
import  {useLazyQuery}  from "@apollo/client";
import  {useNavigate}  from "react-router-dom";
import {userState}  from "../config/UserState"



const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState("");
  const setUserSession = userState((state) => state.addSession)
  const verifySession = userState((state) => state.session)
  console.log('get current session in login', verifySession)

  const [loginUser, { data, error }] = useLazyQuery( LOGIN, {
    variables : {email,password}
})

  return (
    
<div className="contenedor mt-5">
    <form className="d-flex form-login   flex-column align-content-center  justify-content-center flex-wrap" onSubmit={async (e) => {
      e.preventDefault();
      await loginUser().then(function (response) {

        var data = response.data
        console.log(data)

        if (data) {
          navigate('/home')
          //SETEAR EL ESTADO DE EL USUARIO
          setUserSession({ isValid: true })
        } else {
          setIsInvalid('Invalid Credential!!')
        }


      })
    }}>
      <h2 className="text-white">Iniciar Sesion</h2>
      <div className="mb-6 ">
       
        <input onChange={(event) => {
          setEmail(event.target.value)
        }} type="email" id="email" className="my-2 inputs-form text-white" placeholder="Email" required />
      </div>
      <div className="mb-6">
        
        <input onChange={(event) => {
          setPassword(event.target.value)
        }} type="password" id="password" className="my-2 inputs-form text-white" placeholder="Contraseña" required />
      </div>
      <div className="flex items-start mb-6">


      </div>
      <button type="submit" className="text-white btn btn-danger my-3 form-button ">Iniciar Sesión</button>

      <div className="mb-6">
            <p className="text-sm text-red-600 mt-5">
             {isInvalid}
            </p>
            </div>
      
    </form>
    </div>

  )
}

export default Login