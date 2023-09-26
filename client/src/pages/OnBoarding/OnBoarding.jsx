import React from "react";
import "./OnBoarding.css";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OnBoarding({ authToken, setShowModal, showModal, setIsSignUp }) {
  // -------------------------------submit form------------------------------------------
  // const [user, setUser] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const loginUser = cookies.UserId;
  // const userLoginEmail = cookies.Email;

  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: loginUser,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    residence: "",
    from: "",
    email: cookies.Email,
    url: [],
    about: "",
    matches: [],
    hobbies: [],
    swiped_users: [],
    be_swiped_by_users: [],
    swiped_left_users: [],
  });

  const [url, setUrl] = useState([]);
  const [hobbies, setHobbies] = useState([]);

  const [cooking, setCooking] = useState(false);
  const [traveling, setTraveling] = useState(false);
  const [gym, setGym] = useState(false);
  const [boxing, setBoxing] = useState(false);
  const [hiking, setHiking] = useState(false);
  const [reading, setReading] = useState(false);
  const [music, setMusic] = useState(false);
  const [movies, setMovies] = useState(false);
  const [dancing, setDancing] = useState(false);

  //------------------------------MULTER----------------------------------------
  // State dùng để upload ảnh
  // const [imageUpload, setImageUpload] = useState(null);
  // // State dùng để lấy url về
  // const [url, setUrl] = useState([]);

  // // Tạo storage dùng để lưu trữ dịch vụ firebase
  // const imagesListRef = ref(storage, "images/");

  // // Viết hàm upload
  // const uploadFile = (e) => {
  //   e.stopPropagation(); //stop the bubble up to the parent
  //   if (imageUpload == null) return;

  //   const imgRef = ref(storage, `${userLoginEmail}/images/${imageUpload.name}`);
  //   uploadBytes(imgRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       console.log("url--->>", url);
  //       setUrl((prev) => [...prev, url]);
  //       setFormData((prevState) => ({
  //         ...prevState,
  //         url: [...prevState.url, url],
  //       }));
  //     });
  //   });
  // };

  // // Lấy dữ liệu
  // useEffect(() => {
  //   listAll(imagesListRef).then((res) => {
  //     res.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setUrl((prev) => [...prev, url]);
  //       });
  //       console.log("formDât.url-->>", formData.url);
  //     });
  //   });
  // }, [url.length !== 0]);
  // -----------------------------------MULTER----------------------------------------
  const handleFileImage = (e) => {
    const file = e.target.files[0];
    setUrl(file);
  };

  const handlePostImage = async () => {
    const formData = new FormData();
    formData.append("url", handleFileImage);
    try {
      const response = await axios.post(
        "http://localhost:8000/upload-image",
        formData
      );
      const success = response.status === 201;
      if (success) {
        console.log("response.data", response.data);
        setUrl((prev) => [...prev, response.data]);
        setFormData((prevState) => ({
          ...prevState,
          url: [...prevState.url, response.data],
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  //----------------------------submit-----------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8000/user", {
        formData,
      });
      const success = response.status === 201;
      if (success) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    const valueInput =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: valueInput,
    }));
  };
  //----------------------------hobbies field----------------------------------

  const handleCooking = (e) => {
    setCooking(!cooking);
    const cookingValue = e.target.value;
    if (!cooking) {
      setHobbies((prev) => [...prev, cookingValue]);
      setFormData((prevState) => ({
        ...prevState,
        hobbies: [...prevState.hobbies, cookingValue],
      }));
    } else {
      setHobbies((prev) => prev.filter((item) => item !== e.target.value));
      setFormData((prevState) => ({
        ...prevState,
        hobbies: prevState.hobbies.filter((item) => item !== e.target.value),
      }));
    }
  };

  const handleTraveling = (e) => {
    setTraveling(!traveling);
    const travelingValue = e.target.value;
    if (!traveling) {
      setHobbies((prev) => [...prev, travelingValue]);
      setFormData((prevState) => ({
        ...prevState,
        hobbies: [...prevState.hobbies, travelingValue],
      }));
    } else {
      setHobbies((prev) => prev.filter((item) => item !== e.target.value));
      setFormData((prevState) => ({
        ...prevState,
        hobbies: prevState.hobbies.filter((item) => item !== e.target.value),
      }));
    }
  };

  const handleGym = (e) => {
    setGym(!gym);
    const gymValue = e.target.value;
    if (!gym) {
      setHobbies((prev) => [...prev, gymValue]);
      setFormData((prevState) => ({
        ...prevState,
        hobbies: [...prevState.hobbies, gymValue],
      }));
    } else {
      setHobbies((prev) => prev.filter((item) => item !== e.target.value));
      setFormData((prevState) => ({
        ...prevState,
        hobbies: prevState.hobbies.filter((item) => item !== e.target.value),
      }));
    }
  };

  const handleBoxing = (e) => {
    setBoxing(!boxing);
    const boxingValue = e.target.value;
    if (!boxing) {
      setHobbies((prev) => [...prev, boxingValue]);
      setFormData((prevState) => ({
        ...prevState,
        hobbies: [...prevState.hobbies, boxingValue],
      }));
    } else {
      setHobbies((prev) => prev.filter((item) => item !== e.target.value));
      setFormData((prevState) => ({
        ...prevState,
        hobbies: prevState.hobbies.filter((item) => item !== e.target.value),
      }));
    }
  };

  const handleHiking = (e) => {
    setHiking(!hiking);
    const hikingValue = e.target.value;
    if (!hiking) {
      setHobbies((prev) => [...prev, hikingValue]);
      setFormData((prevState) => ({
        ...prevState,
        hobbies: [...prevState.hobbies, hikingValue],
      }));
    } else {
      setHobbies((prev) => prev.filter((item) => item !== e.target.value));
      setFormData((prevState) => ({
        ...prevState,
        hobbies: prevState.hobbies.filter((item) => item !== e.target.value),
      }));
    }
  };

  const handleReading = (e) => {
    setReading(!reading);
    const readingValue = e.target.value;
    if (!reading) {
      setHobbies((prev) => [...prev, readingValue]);
      setFormData((prevState) => ({
        ...prevState,
        hobbies: [...prevState.hobbies, readingValue],
      }));
    } else {
      setHobbies((prev) => prev.filter((item) => item !== e.target.value));
      setFormData((prevState) => ({
        ...prevState,
        hobbies: prevState.hobbies.filter((item) => item !== e.target.value),
      }));
    }
  };

  const handleMusic = (e) => {
    setMusic(!music);
    const musicValue = e.target.value;
    if (!music) {
      setHobbies((prev) => [...prev, musicValue]);
      setFormData((prevState) => ({
        ...prevState,
        hobbies: [...prevState.hobbies, musicValue],
      }));
    } else {
      setHobbies((prev) => prev.filter((item) => item !== e.target.value));
      setFormData((prevState) => ({
        ...prevState,
        hobbies: prevState.hobbies.filter((item) => item !== e.target.value),
      }));
    }
  };

  const handleMovies = (e) => {
    setMovies(!movies);
    const moviesValue = e.target.value;
    if (!movies) {
      setHobbies((prev) => [...prev, moviesValue]);
      setFormData((prevState) => ({
        ...prevState,
        hobbies: [...prevState.hobbies, moviesValue],
      }));
    } else {
      setHobbies((prev) => prev.filter((item) => item !== e.target.value));
      setFormData((prevState) => ({
        ...prevState,
        hobbies: prevState.hobbies.filter((item) => item !== e.target.value),
      }));
    }
  };

  const handleDancing = (e) => {
    setDancing(!dancing);
    const dancingValue = e.target.value;
    if (!dancing) {
      setHobbies((prev) => [...prev, dancingValue]);
      setFormData((prevState) => ({
        ...prevState,
        hobbies: [...prevState.hobbies, dancingValue],
      }));
    } else {
      setHobbies((prev) => prev.filter((item) => item !== e.target.value));
      setFormData((prevState) => ({
        ...prevState,
        hobbies: prevState.hobbies.filter((item) => item !== e.target.value),
      }));
    }
  };
  console.log("formData", formData);

  return (
    <>
      <div className="onboarding">
        <video autoPlay loop muted>
          <source src="/images/bg03.mp4" type="video/mp4" />
        </video>
        <h1>Tell us more about you!</h1>
        <form onSubmit={handleSubmit}>
          <section className="left-side">
            <div className="test">
              <label className="label-title" htmlFor="first_name">
                <i className="fa-solid fa-user"></i> &nbsp; Your Name:
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="My name is..."
                maxlength="15"
                required={true}
                value={formData.first_name}
                onChange={handleChange}
              />

              {/* ---------------------------------DOB------------------------------------ */}
              <div className="multiple-input-conatainer">
                <label className="label-title" htmlFor="dob_day">
                  <i className="fa-solid fa-cake-candles"></i> &nbsp; Birthday:
                </label>
                <input
                  type="number"
                  id="dob_day"
                  name="dob_day"
                  placeholder="DD"
                  required={true}
                  value={formData.dob_day}
                  className="dob"
                  min={1}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  id="dob_month"
                  name="dob_month"
                  placeholder="MM"
                  required={true}
                  value={formData.dob_month}
                  className="dob"
                  min={1}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  id="dob_year"
                  name="dob_year"
                  placeholder="YYYY"
                  required={true}
                  value={formData.dob_year}
                  className="dob"
                  min={1900}
                  onChange={handleChange}
                />
                <br />
                {/* -----------------------------gender---------------------------------- */}
                <div className="multiple-input-conatainer">
                  <label className="label-title" htmlFor="gender">
                    <i className="fa-solid fa-venus-mars"></i> &nbsp;Gender:
                  </label>
                  <input
                    type="radio"
                    id="man-gender-identity"
                    name="gender_identity"
                    value="man"
                    onChange={handleChange}
                    checked={formData.gender_identity === "man"}
                  />
                  <label className="radio-title" htmlFor="man-gender-identity">
                    Man
                  </label>
                  <input
                    type="radio"
                    id="woman-gender-identity"
                    name="gender_identity"
                    value="woman"
                    onChange={handleChange}
                    checked={formData.gender_identity === "woman"}
                  />
                  <label
                    className="radio-title"
                    htmlFor="woman-gender-identity"
                  >
                    Woman
                  </label>
                  <input
                    type="radio"
                    id="more-gender-identity"
                    name="gender_identity"
                    value="more"
                    onChange={handleChange}
                    checked={formData.gender_identity === "more"}
                  />
                  <label className="radio-title" htmlFor="more-gender-identity">
                    More
                  </label>
                </div>
                {/* ------------------------------------show gender-------------------------------------------- */}
                <input
                  type="checkbox"
                  id="show_gender"
                  name="show_gender"
                  onChange={handleChange}
                  checked={formData.show_gender}
                />
                <label id="show-gender" htmlFor="show-gender">
                  Show gender on my profile
                </label>
                <br />
                {/* ----------------------------------multiple choices------------------------------------ */}
                <div className="multiple-input-container">
                  <label className="label-title">
                    <i className="fa-solid fa-heart"></i> &nbsp; Show me:
                  </label>
                  <input
                    type="radio"
                    id="man-gender-interest"
                    name="gender_interest"
                    value="man"
                    onChange={handleChange}
                    checked={formData.gender_interest === "man"}
                  />
                  <label className="radio-title" htmlFor="man-gender-interest">
                    Man
                  </label>
                  <input
                    type="radio"
                    id="woman-gender-interest"
                    name="gender_interest"
                    value="woman"
                    onChange={handleChange}
                    checked={formData.gender_interest === "woman"}
                  />
                  <label
                    className="radio-title"
                    htmlFor="woman-gender-interest"
                  >
                    Woman
                  </label>
                  <input
                    type="radio"
                    id="everyone-gender-interest"
                    name="gender_interest"
                    value="everyone"
                    onChange={handleChange}
                    checked={formData.gender_interest === "everyone"}
                  />
                  <label
                    className="radio-title"
                    htmlFor="everyone-gender-interest"
                  >
                    Everyone
                  </label>
                </div>
                <div className="select-field">
                  <label htmlFor="residence">
                    <i class="fa-solid fa-house"></i>&nbsp; Residence
                  </label>
                  <select
                    name="residence"
                    id="residence"
                    onChange={handleChange}
                  >
                    <option value="">---Select your residence---</option>
                    <option value="Hanoi">Hanoi</option>
                    <option value="HCM City">HCM City</option>
                    <option value="Hai Phong">Hai Phong</option>
                    <option value="Da Nang">Da Nang</option>
                    <option value="Nha Trang">Nha Trang</option>
                    <option value="Quang Ninh">Quang Ninh</option>
                    <option value="Ninh Binh">Ninh Binh</option>
                    <option value="Thanh Hoa">Thanh Hoa</option>
                    <option value="Nghe An">Nghe An</option>
                    <option value="Vinh">Vinh</option>
                    <option value="Quang Binh">Quang Binh</option>
                    <option value="Da Lat">Da Lat</option>
                    <option value="Can Tho">Can Tho</option>
                  </select>
                </div>
                <div className="select-field">
                  <label htmlFor="country">
                    {" "}
                    <i class="fa-solid fa-earth-americas"></i> &nbsp; From
                  </label>
                  <select name="from" id="country" onChange={handleChange}>
                    <option value="">---Select your country---</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Brunei">Brunei</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Canada">Canada</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Colombia">Colombia</option>
                    <option value="England">England</option>
                    <option value="India">India</option>
                    <option value="Japan">Japan</option>
                    <option value="USA">USA</option>
                    <option value="Vietnam">Vietnam</option>
                  </select>
                </div>
              </div>
            </div>
            <input type="submit" id="submit" />
          </section>

          {/* --------------------------------RIGHT SIDE------------------------------------ */}
          <section>
            {/* ----------------------------------hobbies------------------------------------ */}
            <div className="hobbies">
              <label className="label-title">
                <i className="fa-solid fa-thumbs-up"></i> &nbsp; My hobbies:
              </label>
              <br />
              {/* -------------cooking---------------- */}
              <input
                type="checkbox"
                id="cooking"
                name="cooking"
                value="cooking"
                onChange={handleCooking}
                checked={cooking}
              />
              <label className="radio-title" htmlFor="cooking">
                cooking
              </label>
              {/* ----------------traveling------------- */}
              <input
                type="checkbox"
                id="traveling"
                name="traveling"
                value="traveling"
                onChange={handleTraveling}
                checked={traveling}
              />
              <label className="radio-title" htmlFor="traveling">
                traveling
              </label>
              {/* ----------------gym------------- */}
              <input
                type="checkbox"
                id="gym"
                name="gym"
                value="gym"
                onChange={handleGym}
                checked={gym}
              />
              <label className="radio-title" htmlFor="gym">
                gym
              </label>
              <br />
              {/* ----------------boxing------------- */}
              <input
                type="checkbox"
                id="boxing"
                name="boxing"
                value="boxing"
                onChange={handleBoxing}
                checked={boxing}
              />
              <label className="radio-title" htmlFor="boxing">
                boxing
              </label>
              {/* ----------------hiking------------- */}
              <input
                type="checkbox"
                id="hiking"
                name="hiking"
                value="hiking"
                onChange={handleHiking}
                checked={hiking}
              />
              <label className="radio-title" htmlFor="hiking">
                hiking
              </label>
              {/* ----------------reading------------- */}
              <input
                type="checkbox"
                id="reading"
                name="reading"
                value="reading"
                onChange={handleReading}
                checked={reading}
              />
              <label className="radio-title" htmlFor="reading">
                reading
              </label>
              {/* ----------------music------------- */}
              <input
                type="checkbox"
                id="music"
                name="music"
                value="music"
                onChange={handleMusic}
                checked={music}
              />
              <label className="radio-title" htmlFor="music">
                music
              </label>
              <br />
              {/* ----------------movies------------- */}
              <input
                type="checkbox"
                id="movies"
                name="movies"
                value="movies"
                onChange={handleMovies}
                checked={movies}
              />
              <label className="radio-title" htmlFor="movies">
                movies
              </label>
              {/* ----------------dancing------------- */}
              <input
                type="checkbox"
                id="dancing"
                name="dancing"
                value="dancing"
                onChange={handleDancing}
                checked={dancing}
              />
              <label className="radio-title" htmlFor="dancing">
                dancing
              </label>
            </div>
            {/* --------------------------------About me------------------------------------ */}
            <textarea
              type="text"
              id="about"
              name="about"
              placeholder="I like..."
              required={true}
              value={formData.about}
              maxLength={300}
              cols={65}
              rows={5}
              onChange={handleChange}
            />
          </section>
        </form>
        <section>
          {/* ------------------------------upload photo-------------------------- */}
          <form
            id="form-upload"
            action="/upload-image"
            method="post"
            encType="multipart/form-data"
          >
            <div className="photo-upload">
              <label className="label-title" htmlFor="url">
                Choose profile photo
                <i
                  style={{ color: "white", cursor: "pointer", marginLeft: 10 }}
                  className="fa-regular fa-image"
                ></i>
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                name="url"
                id="url"
                // value={formData.url}
                multiple
                onChange={(e) => e.target.files[0]}
              />
              <button className="upload-photo">
                <p onClick={handlePostImage}>Upload</p>
                <svg
                  strokeWidth="4"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="Photo-field">
              <div className="photo-container">
                {/* {console.log("formData-->>", formData.url)} */}
                {formData?.url?.map((url) => (
                  <img className="pic" src={url} />
                ))}
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default OnBoarding;
