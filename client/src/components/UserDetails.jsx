import { Button, Modal } from "antd";
import { useState } from "react";
import "./UserDetails.css";

const UserDetails = ({ open, filteredGenderedUsers, closeModal }) => {
  console.log("filteredGenderedUsers", filteredGenderedUsers);
  const [modal1Open, setModal1Open] = useState(false);

  const closeModal1 = () => {
    closeModal();
  };
  return (
    <div className="user-details">
      <Modal
        title={
          filteredGenderedUsers[filteredGenderedUsers.length - 1].first_name +
          " _" +
          "Age" +
          " " +
          `${
            2023 -
            filteredGenderedUsers[filteredGenderedUsers.length - 1].dob_year
          }`
        }
        style={{
          top: 20,
          textAlign: "center",
        }}
        value={modal1Open}
        open={open}
        onOk={() => closeModal1()}
        onCancel={() => closeModal1()}
        footer={[]}
      >
        <div class="custom-shape-divider-top-1686070002">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="user-details">
          <img
            className="images"
            src={filteredGenderedUsers[filteredGenderedUsers.length - 1].url[0]}
            alt=""
          />
          <div className="personal">
            {filteredGenderedUsers[filteredGenderedUsers.length - 1]
              .show_gender === false ? (
              <></>
            ) : (
              <span className="span-field">
                <i className="fa-regular fa-face-smile"></i> &nbsp;
                {
                  filteredGenderedUsers[filteredGenderedUsers.length - 1]
                    .gender_identity
                }
              </span>
            )}
            <span className="span-field">
              <i className="fa-regular fa-heart"></i> &nbsp;
              {
                filteredGenderedUsers[filteredGenderedUsers.length - 1]
                  .gender_interest
              }
            </span>
          </div>
          <div className="hobbies-field">
            <span className="like-content">I like: &nbsp;</span>
            {filteredGenderedUsers[
              filteredGenderedUsers.length - 1
            ].hobbies.map((el, index) => (
              <span className="span-field" key={index}>
                {el}
              </span>
            ))}
          </div>
          <img
            className="images"
            src={filteredGenderedUsers[filteredGenderedUsers.length - 1].url[1]}
            alt=""
          />
          <div className="about-field">
            <span className="bio">About me:</span> &nbsp;
            <span className="about-content">
              {filteredGenderedUsers[filteredGenderedUsers.length - 1].about}
            </span>
          </div>
          <img
            className="images"
            id="pic3"
            src={filteredGenderedUsers[filteredGenderedUsers.length - 1].url[2]}
            alt=""
          />
          <div className="residence">
            <span className="span-field">
              <i class="fa-solid fa-house"></i> &nbsp;
              {
                filteredGenderedUsers[filteredGenderedUsers.length - 1]
                  .residence
              }
            </span>
            <span className="span-field">
              <i class="fa-solid fa-earth-americas"></i> &nbsp;
              {filteredGenderedUsers[filteredGenderedUsers.length - 1].from}
            </span>
          </div>
          <div class="custom-shape-divider-bottom-1686069905">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                class="shape-fill"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                class="shape-fill"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                class="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default UserDetails;
