import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../components/Common/Loader";
import moment from "moment";

const UserConversation = () => {
  const { token } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const { allOnlineUsers } = useSelector((state) => state.socketIo);
  const { socket } = useSelector((state) => state.socketIo);
  const location = useLocation();
  const receiverInformation = location.state;
  const [loading, setLoading] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [msgLoading, setMsgLoading] = useState(false);
  const messageRef = useRef();

  const getConversation = async () => {
    if (!receiverInformation) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/findConversation/${receiverInformation?._id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (!response?.data?.success) {
        throw new Error("Error occur during fetching conversation");
      }

      setAllMessages(response?.data?.messages || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.length < 1) {
      return;
    }

    const data = {
      receiverId: receiverInformation?._id,
      message: message,
    };

    try {
      setMsgLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/sendMessage`,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (!response?.data?.success) {
        throw new Error("Error occur during sending message");
      }

      console.log("response", response);
      setMessage("");
      setAllMessages([...allMessages, response?.data?.newMessage]);
      setMsgLoading(false);
    } catch (error) {
      setMessage("");
      console.log(error);
      setMsgLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  console.log("allMessages", allMessages);
  console.log("userData", userData);

  const scrollHandler = () => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getConversation();
  }, [receiverInformation]);

  useEffect(() => {
    scrollHandler();
  }, [allMessages]);

  useEffect(() => {
    const handleMessage = (data) => {
      if (data?.senderId === receiverInformation?._id) {
        setAllMessages((prev) => {
          return [...prev, data];
        });
      }
    };

    if (socket) {
      socket.on("new-message", handleMessage);
    }

    return () => {
      socket.off("new-message");
    };
  }, [socket]);

  return (
    <div className="w-[91vw] h-[86vh]  mx-auto  my-4  bg-slate-900 rounded-md">
      {/* receiver information */}
      <div className="h-[12%] px-2 flex items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <div className="relative">
            <img
              src={receiverInformation?.profilePicture}
              alt={`${receiverInformation?.firstName} ${receiverInformation?.lastName}Image`}
              className="h-14 w-14 rounded-full object-cover"
            />
            {allOnlineUsers.includes(receiverInformation?._id) && (
              <div className="h-4 w-4 bg-green-600 rounded-full absolute right-0 top-9"></div>
            )}
          </div>

          <div>
            <p>
              <span>{receiverInformation?.firstName}</span>{" "}
              <span>{receiverInformation?.lastName}</span>
            </p>
            <p>
              {allOnlineUsers.includes(receiverInformation?._id) ? (
                <p className="text-green-600">Online</p>
              ) : (
                <p className="text-red-600">Offine</p>
              )}
            </p>
          </div>
        </div>

        <MdOutlineKeyboardBackspace
          size={30}
          className="cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>

      <hr />

      {/* messages */}
      <div className="h-[78%] overflow-y-auto w-full">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div>
            {allMessages.length < 1 ? (
              <div
                className="
                           h-full w-full flex items-center justify-center"
              >
                No Conversation
              </div>
            ) : (
              <div className="flex flex-col gap-3 p-2 w-full">
                {allMessages.map((msg) => {
                  return (
                    <div
                      key={msg._id}
                      className={`${
                        userData?._id === msg?.senderId
                          ? "self-end "
                          : "self-start "
                      } flex gap-1 max-w-[50%]`}
                    >
                      <p
                        className={`${userData?._id === msg?.senderId ? "bg-slate-950 " : "bg-slate-600 "} px-2 py-1 rounded-md
                            w-fit`}
                      >
                        {msg?.message}
                      </p>
                      <p className="text-xs text-slate-600 mt-3">
                        {moment(msg?.createdAt).format("LT")}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        <div ref={messageRef}></div>
      </div>

      <hr />

      {/* input field */}
      <div className="h-[10%] flex items-center w-full px-2">
        <form className="w-full flex items-center " onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="w-full p-2 rounded-full  outline-none bg-slate-800"
            placeholder="Type a message"
          />

          <button
            className={`-ml-8 ${msgLoading ? "animate-spin" : ""}`}
            type="submit"
            disabled={msgLoading}
          >
            <BiSolidSend size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserConversation;
