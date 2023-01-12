import "./Message.scss";

const Message = ({ closeMessage }) => {
  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__close-wrapper">
          <button className="modal__close" onClick={() => closeMessage(false)}>
            X
          </button>
        </div>
        <div className="title">
          <h1>Send a message</h1>
        </div>
        <form className="modal__form">
          <div className="body">
            <textarea
              className="modal__body"
              placeholder="Type your message here"
            ></textarea>
          </div>
          <div className="modal__btn-wrapper">
            <button
              className="modal__btn modal__btn--cancel"
              onClick={() => closeMessage(false)}
            >
              Cancel
            </button>
            <button className="modal__btn" onClick={() => closeMessage(false)}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Message;
