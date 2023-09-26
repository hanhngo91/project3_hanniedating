import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import TinderCard from "react-tinder-card";
import ChatContainer from "../../components/ChatContainer";
import { useCookies } from "react-cookie";
import axios from "axios";
import UserDetails from "../../components/UserDetails";
import { notification } from "antd";

function DashBoard() {
  const [user, setUser] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [genderedUsers, setGenderedUsers] = useState([]);
  const [userLoaded, setUserLoaded] = useState(false); // Flag to check if user is loaded
  const [lastDirection, setLastDirection] = useState(null);
  const [modal1Open, setModal1Open] = useState(false);
  const closeModal = () => {
    setModal1Open(false);
  };

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response);
      setUserLoaded(true); // Set flag to true
    } catch (err) {
      console.log(err);
    }
  };

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/gendered-users", {
        params: { gender: user?.data?.gender_interest },
      });

      setGenderedUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]); //Just call getUser() when userId has any changes.

  useEffect(() => {
    if (userLoaded) {
      getGenderedUsers();
    }
  }, [userLoaded]); //Just call getGenderedUsers() when userUpload has any changes and is true.

  // console.log("user login", user.data);
  // console.log("genderedUsers", genderedUsers);

  //Open details of the user:
  const handleOpenDetails = () => {
    setModal1Open(true);
  };

  // Swipe right users:
  const swipeRightUsers = async (swipeUser) => {
    console.log("quet phai---->>>");
    try {
      await axios.put("http://localhost:8000/swipe-right", {
        userId,
        swipeUser,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  //Update the login user's matches:
  const updateMatches = async (swipeUser) => {
    try {
      await axios.put("http://localhost:8000/update-matches", {
        userId,
        swipeUser,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  //Update swiped-right-user's matches array:
  const updateSwipedRightUserMatches = async (swipeUser) => {
    try {
      await axios.put("http://localhost:8000/swiped-right-user-matches", {
        userId,
        swipeUser,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  //Swipe left users:
  const swipeLeftUsers = async (swipeUser) => {
    try {
      await axios.put("http://localhost:8000/swipe-left", {
        userId,
        swipeUser,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  //Swipe direction:
  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      swipeRightUsers(swipedUserId);
    }

    if (direction === "left") {
      swipeLeftUsers(swipedUserId);
    }

    setLastDirection(direction);
  };

  useEffect(() => {
    //Get user_id of the last swiped-right-user:
    const swipedRightUserId =
      user?.data?.swiped_users[user.data.swiped_users.length - 1]?.user_id;
    if (
      user?.data?.swiped_users
        ?.map(({ user_id }) => user_id)
        .includes(swipedRightUserId)
    ) {
      // Find user that is just swiped right in genderedUsers:
      const swipedRightUser = genderedUsers?.find(
        (user) => user.user_id === swipedRightUserId
      );

      if (user?.data?.swiped_users?.length > 0) {
        // Find id of login user in swiped_users of user that is just swiped right:
        const swipedRightUserSwipedUsers = swipedRightUser?.swiped_users?.find(
          (swipedUser) => swipedUser.user_id === userId
        );

        // If login user is in swiped_users of user that is just swiped right, then add user to matches array of login user:
        if (swipedRightUserSwipedUsers) {
          setUser((prevUser) => ({
            ...prevUser,
            data: {
              ...prevUser.data,
              matches: [...prevUser.data.matches, swipedRightUser],
            },
          }));
          notification.success({
            message: `You have a new match!`,
          });
          updateMatches(swipedRightUserId);
          updateSwipedRightUserMatches(swipedRightUserId);
        }
      }
    }
  }, [user?.data?.swiped_users.length]);

  //Users that left the screen:
  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const swipedRightUsers = user?.data?.swiped_users
    .map(({ user_id }) => user_id)
    .concat(userId);

  const swipedLeftUsers = user?.data?.swiped_left_users
    .map(({ user_id }) => user_id)
    .concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    (genderedUser) =>
      !swipedRightUsers.includes(genderedUser.user_id) &&
      !swipedLeftUsers.includes(genderedUser.user_id)
  );
  // console.log("filteredGenderedUsers", filteredGenderedUsers);

  return (
    <>
      {modal1Open && (
        <UserDetails
          className="modal"
          closeModal={closeModal}
          open={true}
          filteredGenderedUsers={filteredGenderedUsers}
        />
      )}
      {user && (
        <div className="dashboard">
          <video autoPlay loop muted>
            <source src="/images/bk6.mp4" type="video/mp4" />
          </video>
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              {filteredGenderedUsers?.map((character) => (
                <TinderCard
                  className="swipe"
                  key={character.first_name}
                  onSwipe={(dir) => swiped(dir, character.user_id)}
                  onCardLeftScreen={() => outOfFrame(character.first_name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + character.url + ")" }}
                    className="card"
                    onDoubleClick={() => handleOpenDetails(character.user_id)}
                  >
                    <h3>{character.first_name}</h3>
                  </div>
                </TinderCard>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashBoard;
