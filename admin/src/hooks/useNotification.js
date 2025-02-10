import { addSetting, removeSetting } from "@/reduxStore/slice/settingSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import io from "socket.io-client";

const useNotification = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [updated, setUpdated] = useState(false);

  return {
    socket,
    updated,
    setUpdated,
  };
};

export default useNotification;
