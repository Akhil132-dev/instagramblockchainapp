import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Share.css";
import axios from "axios";
import { storage } from "./firebase/firebase";
import { CircularProgress } from "@material-ui/core/";
import CancelIcon from '@material-ui/icons/Cancel';

function Share() {
  const [fech, setfech] = useState(false)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, isFecthing } = useContext(AuthContext);
  const [url, seturl] = useState();
  const [image1, setimage1] = useState(null);
  const dsec = useRef();
  const Submithandler = async (e) => {
        e.preventDefault();
    if (image1 === null || url === undefined) return;
    
    const newPost = {
      userId: user._id,
      img: url,
      desc: dsec.current.value,
    };

    try {
      const post = await axios.post("/posts", newPost);
  window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpload = () => {


    let dbname = "Post";
    if (image1?.name) {
      console.log("open");
      const uploadtask = storage.ref(`${dbname}/${image1?.name}`).put(image1);
      uploadtask.on(
        "state_changed",
        (spanshot) => {
          //Progress function
          const progress = Math.round(
            (spanshot.bytesTransferred / spanshot.totalBytes) * 100
          );
        },
        (error) => {
          //Error function
          console.log(error);
          alert.apply(error.message);
        },
        () => {
          //complete function
          storage
            .ref(`${dbname}`)
            .child(image1?.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url)
              seturl(url);
             setfech(false)
            });
        }
      );
    } else {
      alert("Please select an image to upload"); setfech(false)
    }
  };
  const handleChange = (e) => {
    if (e != undefined) {
      if (e.target.files[0]) {
        //get the first file that you selected
        setimage1(e.target.files[0]);
        console.log("file sected");
        setfech(true)
      handleUpload()
      }
    }
  };
  return (
    <div>{
      fech ?   <CircularProgress  color="white" size="20px"/>: <div className="Share">
      <div className="share__wrapper">
        <div className="share__top">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : "/assets/person/lg.jpg"
            }
            alt=""
            className="Shareprofilepicture"
          />
          <input
            placeholder={"what's in you mind  " + user.username + "?"}
            ref={dsec}
            className="Share__input"
          />
        </div>

        <hr className="share__hr" />
{image1 && (
  <div className="post__image1">
    <img src={url} alt="" className="shar_imge" />
    <CancelIcon className="cancle" onClick={e=>setimage1(null)}/>
  </div>
)}
        <form className="share__bottom">
          <div className="shareOptions">
            <label htmlFor="id" className="shareoptin">
              <PermMedia htmlColor="tomato" className="Share__icon" />

              <span className="shareoptin__text">Photo's or video's</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="id"
                accept=".png ,.jpeg,.jpg"
                onChange={handleChange}
              />
            </label>
            <div className="shareoptin">
              <Label htmlColor="blue" className="Share__icon" />
              <span className="shareoptin__text">Tag</span>
            </div>
            <div className="shareoptin">
              <Room htmlColor="green" className="Share__icon" />
              <span className="shareoptin__text">Location </span>
            </div>
            <div className="shareoptin">
              <EmojiEmotions htmlColor="goldenrod" className="Share__icon" />
              <span className="shareoptin__text">Feelings </span>
            </div>
          </div>
          <button onClick={Submithandler} className="Sharebutton">
            Share
          </button>
        </form>
      </div>
    </div>
    }
   
    </div>
    
  );
}

export default Share;
