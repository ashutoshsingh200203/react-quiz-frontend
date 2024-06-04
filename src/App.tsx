import React, { useEffect, useState } from 'react';
import Questions from './components/Questions';
import './App.css';
import axios, { AxiosResponse } from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Chat from './components/Chat';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='auth/login' element={<Login/>}></Route>
      <Route path='auth/register' element={<Register/>}></Route>
      <Route path='/chat' element={<Chat/>} />
      <Route path='/' element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
