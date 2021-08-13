import React, { useContext, useEffect, useRef, useState } from "react";
import Topbar from "../components/topbar/Topbar";
import { AuthContext } from "../context/AuthContext";
import "./chat.css";
import Chatonline from "./conversation/chatonline/chatonline";
import Conversataion from "./conversation/conversataion";
import Msg from "./conversation/mesg/msg";
import axios from "axios";
function Messenge() {
  const [conversataions, setconversataions] = useState([]);
const [Current, setCurrent] = useState(null)
const [messages, setmessages] = useState(null)
const [newmessage, setnewmessage] = useState("")
  const { user } = useContext(AuthContext);
const scrollRef = useRef()
const handlesubmite  =  async (e) =>{
e.preventDefault()
if(newmessage!==""){
  const message = {
  sender :user._id,
  text:newmessage,
  converstaionId:Current?._id
}
try {
  
 const res = await axios.post('/message',message);
 setmessages([...messages,res.data])

} catch (error) {
  
}
setnewmessage('')
}
else window.alert("you cannot send empty message please write somethings.")
}

  useEffect(() => {
    const getconverstation = async () => {
      try {
        const res = await axios.get("/chat/" + user._id);
        setconversataions(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getconverstation();
  }, []);

useEffect(() => {
 const getmessage = async ()=>{
   try {
     const res =await axios.get('/message/'+Current?._id)
     setmessages(res.data)
   } catch (error) {
     
   }
 }
 getmessage()
}, [Current])

useEffect(() => {
scrollRef.current?.scrollIntoView({behavior:"smooth"})
}, [messages])
  console.log(messages);
  return (
    <div className="main">
      <Topbar />
      <div className="chat">
        <div className="chatmenu">
          <div className="chatmenu__wrraper">
            <input
              type="text"
              className="menu_input"
              placeholder="serach for friends"
            />
            {
              conversataions.map((c)=>(
                <div onClick={()=>setCurrent(c)}>
                    <Conversataion conver={c} currentuser = {user}/>
                </div>
               
              )  
              )
            }
        
   
          </div>
        </div>
        <div className="chatmbox">
          <div className="chatbox_wraaper">
            { 
            Current ? 
            <>
              <div className="chat_box_top">
                {
                  messages.map( (m)=>(
               <div ref={scrollRef}>
                   <Msg messages={m} own={m.sender === user._id} />
               </div>
                    
                  ))
                }
            
           
            </div>
            <div className="chat_box_bottom">
              <textarea
                placeholder="write some.."
                className="chatmsginput"
                value={newmessage}
                onChange={e=>setnewmessage(e.target.value)}
              ></textarea>

              <button className="chat_button" onClick={handlesubmite}>send</button>
            </div>
            </>: <span className="love">Open a conversataion to start a chat</span>
            }
          
          </div>
        </div>
        <div className="chatonline">
          <div className="chatonline__wraaper">
            <Chatonline />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenge;
