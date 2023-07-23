import "./AvatarModal.css";

const AvatarModal = ({ profile, closeAvatarModal, setEdittedUserProfile }) => {
  console.log("hey");
  return (
    <>
      <div className="modal-wrapper" onClick={closeAvatarModal}></div>
      <div className="modal-container" onClick={closeAvatarModal}>
        <div className="modal">
          <button className="cancel-btn" onClick={closeAvatarModal}>
            &times;
          </button>
          <div className="avatars-container">
            <div
              className="avatar"
              onClick={() =>
                setEdittedUserProfile({
                  ...profile,
                  avatarUrl:
                    "https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80",
                })
              }
            >
              <img src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80" />
            </div>
            <div className="avatar">
              <img src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80" />
            </div>
            <div className="avatar">
              <img src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80" />
            </div>
            <div className="avatar">
              <img src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80" />
            </div>
            <div className="avatar">
              <img src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80" />
            </div>
            <div className="avatar">
              {" "}
              <img src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww&w=1000&q=80" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AvatarModal;

// [updatedAvatarImage, setUpdatedAvatarImage];
// openAvatarModal;
// closeAvatarModal;
