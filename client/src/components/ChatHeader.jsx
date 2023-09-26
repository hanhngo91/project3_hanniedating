import React from "react";
import "./ChatHeader.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;

function ChatHeader({ user }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  let navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);
    removeCookie("Email", cookies.Email);
    navigate("/");
    notification.success({
      message: "You logged out! See you soon!",
    });
  };
  // console.log("user---->", user.data);

  //Delete user account:
  const handleDeleteAccount = async (id) => {
    console.log("delete ID here-->>", id);
    confirm({
      title: "Account Deletion Confirmation",
      icon: <ExclamationCircleOutlined />,
      content: "Do you really want to delete your account?",
      okText: "Agree",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const response = await axios.delete(`http://localhost:8000/user`, {
            params: { userId: id },
          });
          const success = response.status === 200;
          console.log("response", response);
          if (success) {
            navigate("/");
            removeCookie("UserId", cookies.UserId);
            removeCookie("AuthToken", cookies.AuthToken);
            removeCookie("Email", cookies.Email);
            notification.success({
              message: "Account deleted successfully!",
            });
          } else {
            notification.error({
              message: "Failed to delete your account!",
            });
          }
        } catch (err) {
          console.log(err);
        }
      },
      onCancel() {
        console.log("Hủy xóa tài khoản");
      },
    });
  };

  return (
    <>
      {user && (
        <div className="chat-container-header">
          <div className="profile">
            <div className="img-container">
              <img
                src={user?.data?.url[0]}
                alt={`photo of + ${user?.data?.first_name}`}
              />
            </div>
            <h3>{user?.data?.first_name}</h3>
            <Tippy content="Delete Account">
              <span
                onClick={() => handleDeleteAccount(user?.data?.user_id)}
                className="edit-profile"
              >
                <i className="fa-solid fa-trash-can"></i>
              </span>
            </Tippy>
          </div>
          <button onClick={handleLogout} className="Btn">
            <div className="sign">
              <svg viewBox="0 0 512 512">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>

            <div className="text">Logout</div>
          </button>
        </div>
      )}
    </>
  );
}

export default ChatHeader;
