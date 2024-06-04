import React from 'react'
import '../Chat.css' ;  
import {io} from 'socket.io-client'
const socket = io('http://localhost:5000', {withCredentials: true})
export default function Chat() {

  socket.on('hello',(arg : string)=>{
    console.log(arg)
  })

  socket.emit('howdy','stranger')

  return (
    <div>
      
      <div className="container bootstrap snippets bootdeys">
        <div className="col-md-7 col-xs-12 col-md-offset-2">
          <div className="panel" id="chat">
            <div className="panel-heading">
              <h3 className="panel-title">
                <i className="icon wb-chat-text" aria-hidden="true"></i> Chat
              </h3>
            </div>
            <div className="panel-body">
              <div className="chats">
                <div className="chat">
                  <div className="chat-body">
                    <div className="chat-content">
                      <p>
                        Good morning, sir.
                        <br/>What can I do for you?
                      </p>
                      <time className="chat-time" dateTime="2015-07-01T11:37">11:37:08 am</time>
                    </div>
                  </div>
                </div>
                <div className="chat chat-left">
                  <div className="chat-body">
                    <div className="chat-content">
                      <p>Well, I am just looking around.</p>
                      <time className="chat-time" dateTime="2015-07-01T11:39">11:39:57 am</time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-footer">
              <form>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Say something" />
                  <span className="input-group-btn">
                    <button className="btn btn-primary" type="button">Send</button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
