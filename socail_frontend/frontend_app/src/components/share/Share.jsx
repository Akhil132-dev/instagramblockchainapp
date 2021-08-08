import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Share.css";
import axios from "axios";
function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [url, seturl] = useState();
  const [image1, setimage1] = useState(null)
  const dsec = useRef();
  const Submithandler = async (e) => {
    if(image1===null || image1=== undefined)return;
    e.perventDefault();
    const newPost = {
      userId: user._id,
      img:url,
      desc: dsec.current.value,
    };

    try {
      await axios.post("/posts", newPost);
    } catch (error) {

      console.log(error)
    }
  };
  const handleUpload = () => {
    
        // if (image1.name) {
        //     console.log("open");
        //     const uploadtask = storage.ref(`Images/${image1.name}`).put(image1);
        //     uploadtask.on(
        //         "state_changed",
        //         (spanshot) => {
                  
        //         },
        //         (error) => {
        //             //Error function
        //             console.log(error);
        //             alert.apply(error.message);
        //         },
        //         () => {
        //             //complete function
        //             storage
        //                 .ref(`Images`)
        //                 .child(image1.name)
        //                 .getDownloadURL()
        //                 .then((url) => {
        //                   console.log(url),
        //                    seturl(url)
                            
        //                 });
        //         }
        //     );
        // } else {
        //     alert("Please select an image to upload");
        // }
    };
 const handleChange = (e) => {
        if (e != undefined) {
          
            if (e.target.files[0]) {
                //get the first file that you selected
                setimage1(e.target.files[0]);
                console.log("file sected")
                handleUpload();
            }
        }
    };
  return (
    <div className="Share">
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

        <form className="share__bottom" onSubmit={Submithandler}>
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
          <button className="Sharebutton">Share</button>
        </form>
      </div>
    </div>
  );
}

export default Share;
