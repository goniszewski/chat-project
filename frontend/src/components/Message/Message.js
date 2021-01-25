import "./Message.css";
// import "../../main.css";

const Message = ({ data }) => {
  return (
    <div
      className={`media media-chat ${data.sender ? "media-chat-reverse" : ""}`}
    >
      {/* <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..."></img> */}
      <div className="media-body">
        <p>{data.body}</p>
        <p className="meta" style={{ color: "#9b9b9b" }}>
          <time>
            {new Date(data.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </p>
      </div>
    </div>
  );
};

export default Message;
