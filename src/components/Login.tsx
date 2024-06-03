import React, { useState } from 'react'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router'

export default function Login() : JSX.Element  {
  const [email , setEmail] = useState<string>('')
  const [pass , setPass] = useState<string>('')
  const navigate = useNavigate();

  const handleLogin = async () : Promise<void>=>{
    try {
      const url : string = `http://localhost:5000/auth/login`
      const response = await axios.post(url,{
          email : `${email}`,
          password : `${pass}`
      })
      console.log(response) 
      if(response.status === 200)
      {
        localStorage.setItem('token',response.data.jwttoken)
        setTimeout(() => {
          navigate('/',{state : {token:response.data.jwttoken}})
        }, 500);
        
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid" alt="Phone image" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input type="email" id="form1Example13" className="form-control form-control-lg" name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                  <label className="form-label" htmlFor="form1Example13">Email address</label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input type="password" id="form1Example23" className="form-control form-control-lg" name='pass' value={pass} onChange={(e)=>{setPass(e.target.value)}} />
                  <label className="form-label" htmlFor="form1Example23">Password</label>
                </div>

                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" onClick={handleLogin}>Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
