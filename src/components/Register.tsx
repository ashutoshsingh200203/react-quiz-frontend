import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router'
import registerLogs from '../../types/register'

export default function Register() : JSX.Element{

  const [values , setValues] = useState<registerLogs>({
    name : '',
    email : '',
    pass : '',
    conpass : ''
  })
  const navigate = useNavigate() ;

const handleRegister = async () : Promise<void> =>{
  try {
    let url : string = `http://localhost:5000/auth/register`
    const response :AxiosResponse = await axios.post(url , values)
    if(response.data)
    {
      navigate('/auth/login')
    }
    console.log(response) ;
  } catch (error) {
    console.log(error)
  }

}

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="text" id="name" className="form-control" name='fullname' value={values.name} onChange={(e)=>{setValues({...values , name : e.target.value})}}/>
                            <label className="form-label" htmlFor="name">Your Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example3c" className="form-control" name='email'value={values.email} onChange={(e)=>{setValues({...values , email : e.target.value})}} />
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" name='pass' value={values.pass} onChange={(e)=>{setValues({...values , pass : e.target.value})}} />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4cd" className="form-control" name='conpass' value={values.conpass} onChange={(e)=>{setValues( {...values , conpass : e.target.value})}} />
                            <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" onClick={handleRegister}>Register</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="Sample image" />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
