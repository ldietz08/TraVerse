import "./Bulletin.scss";
import Message from "../message-modal/Message";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import lottie from "lottie-web";
import { db } from "../../firebase/Firebase";
import User from "../../assets/icons/user.png";
import Envelope from "../../assets/icons/envelope.svg";
import Trash from "../../assets/icons/trash-can.svg";

const Bulletin = ({ isAuth }) => {
  const [userName, setUserName] = useState("");
  const [hikeName, setHikeName] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);
  const navigate = useNavigate();
  const container = useRef(null);
  const BACK_END = process.env.REACT_APP_BACKEND_URL;
  const form = document.querySelector(".form");

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: require("../../assets/gif/hiker.json"),
    });
    return () => instance.destroy();
  }, []);

  const addPost = (e) => {
    e.preventDefault();
    const newPost = {
      userName: userName,
      hikeName: hikeName,
      userMessage: userMessage,
    };
    axios.post(`${BACK_END}/feed/create`, newPost).then(() => {
      form.reset();
      setUsers([...users, newPost]);
    });
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${BACK_END}/feed/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    deletePost();
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get(`${BACK_END}/feed`);
        setUsers(data);
      } catch (error) {
        console.log("An error has occurred", error);
      }
    };
    getPosts();
  }, []);

  return (
    <>
      <section className="bulletin">
        <div className="bulletin__msg">
          <div className="bulletin__wrap">
            <form className="form">
              <h1>Create a new post</h1>
              <input
                className="bulletin__input"
                placeholder="Enter your name"
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <input
                className="bulletin__input"
                placeholder="Hike (optional)"
                type="text"
                onChange={(e) => {
                  setHikeName(e.target.value);
                }}
              />
              <input
                className="bulletin__input-body"
                placeholder="Have something to share with the community?"
                type="text"
                onChange={(e) => {
                  setUserMessage(e.target.value);
                }}
              />
              <div className="btn__wrapper">
                <button onClick={addPost} className="btn">
                  Post
                </button>
              </div>
            </form>
          </div>
          <div className="container" ref={container}></div>
        </div>
        <section className="bulletin__post">
          {users.map((user) => {
            return (
              <div className="bulletin__wrapper" key={user.id}>
                <div className="bulletin__user">
                  <div>
                    <img
                      className="bulletin__user-image"
                      src={User}
                      alt="TraVerse user profile pic"
                    ></img>
                  </div>
                  <div>
                    <h1>{user.userName}</h1>
                  </div>
                  <div className="bulletin__date">
                    <h1>{new Date().toLocaleDateString()}</h1>
                  </div>
                </div>
                <h3>{user.hikeName}</h3>
                <div className="bulletin__user-post">
                  <p className="bulletin__content">{user.userMessage}</p>
                </div>
                <button
                  className="btn--delete"
                  onClick={() => deletePost(user.id)}
                >
                  <img src={Trash} alt="Trash can icon"></img>
                </button>
              </div>
            );
          })}
        </section>
      </section>
    </>
  );
};

export default Bulletin;
