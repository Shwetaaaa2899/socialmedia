import "./Modal.css";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { v4 as uuid } from "uuid";
import { usePostsContext } from "../../context/postcontext";
import EmojiPicker from "emoji-picker-react";
import { TbLetterX } from "react-icons/tb";
const CreatePost = ({ showOpen, showClose }) => {
  // console.log(modal)
  const {
    dispatch,
    state: { editPost },
    createPostHandler,
  } = usePostsContext();
  const inputRef = useRef();

  const [input, setInput] = useState({
    _id: uuid(),
    content: "",
    mediaURL: "",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },

    comments: [],
    createdAt: "",
  });

  ///post.likes.likedby.find(({id})=> userInfo._id ) --> "red" --> liek ka logic
  const modalHandler = (e) => {
    if (
      e.target.className === "modal-container" ||
      e.target.className === "btn-close"
    ) {
      showClose();
    }
  };
  const createPost = (e) => {
    e.preventDefault();
    createPostHandler(input);
    showClose();
  };
  const inputChangeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const ImageClickHandler = () => {
    inputRef.current.click();
  };
  const ImageInputHandler = (e) => {
    console.log("Img changes ", e.target.files[0]);
    setInput({
      ...input,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });
  };
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  return (
    <>
      <div className="modal-wrapper" onClick={modalHandler}></div>
      <div className="modal-container" onClick={modalHandler}>
        <div className="modal">
          <button className="cancel-btn" onClick={showClose}>
            &times;
          </button>

          <form>
            <h4>Add a Post</h4>

            <div className="form-group">
              <textarea
                placeholder="Write down your taughts"
                name="content"
                onChange={inputChangeHandler}
              />
            </div>

            {input.mediaURL ? (
              <div>
                <img
                  className="post-image-create-modal"
                  style={{
                    height: "100px",
                    width: "100px",
                    marginLeft: "20px",
                  }}
                  src={input.mediaURL}
                />

                {/* <span className="cancel">
                  <TbLetterX
                    onClick={() =>
                      setInput({
                        ...input,
                        mediaURL: "",
                      })
                    }
                  />
                </span> */}
              </div>
            ) : (
              <div>
                <MdOutlinePhotoCamera onClick={ImageClickHandler} />

                <input
                  type="file"
                  name="mediaURL"
                  onChange={ImageInputHandler}
                  ref={inputRef}
                  style={{
                    display: "none",
                  }}
                />
              </div>
            )}

            {/* <EmojiPicker  /> */}

            <div>
              <button onClick={createPost} className="btn">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default CreatePost;
