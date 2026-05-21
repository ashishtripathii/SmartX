import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../components/Common/Loader";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "../../components/Common/ProfileAvatar";
import { getSocketInstance } from "../../utils/socketClient";

const ChatUsers = () => {
  const { token } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const { allOnlineUsers } = useSelector((state) => state.socketIo);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const getAllConversationUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/chatUsers`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (!response?.data?.success) {
        throw new Error("Error occur during fetching conversation users");
      }

      setAllUsers(response?.data?.conversations || []);
      console.log("response?.data", response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllConversationUsers();
  }, []);

  useEffect(() => {
    const socket = getSocketInstance();

    const handleNewMessage = () => {
      getAllConversationUsers();
    };

    if (socket) {
      socket.on("new-message", handleNewMessage);
    }

    return () => {
      socket?.off("new-message", handleNewMessage);
    };
  }, [token]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-[90vh]">
          <Loader />
        </div>
      ) : (
        <div>
          {allUsers?.length < 1 ? (
            <div className=" text-xl font-semibold flex items-center justify-center h-[90vh]">
              No messages, yet?
            </div>
          ) : (
            <div className="flex  gap-4 w-[91vw] min-h-[86vh] mx-auto  my-4 py-4 px-4 flex-col bg-slate-900 rounded-md">
              {allUsers.map((user) => {
                return (
                  <div key={user._id}>
                    {user?.members?.map(
                      (u) =>
                        u?._id !== userData?._id && (
                          <div
                            key={u._id}
                            onClick={() => {
                              navigate("/user-conversation", { state: u });
                            }}
                            className="bg-slate-950 p-4 rounded-md
                                       flex gap-2 items-center cursor-pointer"
                          >
                            <ProfileAvatar
                              user={u}
                              sizeClass="h-14 w-14"
                              imageClassName="object-cover"
                              fallbackClassName="bg-gradient-to-br from-[#0f4da8] to-[#0f86d9] flex items-center justify-center font-bold text-white"
                              showStatus
                              isOnline={allOnlineUsers.includes(u?._id)}
                            />
                            <div>
                              <p className="font-semibold">
                                <span> {u?.firstName}</span>{" "}
                                <span>{u?.lastName}</span>
                              </p>
                              {allOnlineUsers.includes(u?._id) ? (
                                <p className="text-green-600">Online</p>
                              ) : (
                                <p className="text-red-600">Offine</p>
                              )}
                            </div>
                            {user?.unreadCount > 0 && (
                              <span className="ml-auto min-w-[24px] h-[24px] px-1 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
                                {user.unreadCount > 9 ? "9+" : user.unreadCount}
                              </span>
                            )}
                          </div>
                        ),
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatUsers;
