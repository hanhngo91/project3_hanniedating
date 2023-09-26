/**
 * Hàm kiểm tra ccas trường không được để trống
 * @param {*} field
 * @returns True: Nếu trường đó bị trống, False: Nếu trường đó không bị trống
 */
const checkIsEmpty = (field) => {
  if (field === undefined || field === null || field === "") {
    return true;
  } else {
    return false;
  }
};

// Midleware check input data:
const validateData = (req, res, next) => {
  const { email, password } = req.body;
  let emailPattern = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (checkIsEmpty(email)) {
    return res.status(404).json({
      message: "Email can't be empty!",
    });
  }

  if (!emailPattern.test(email)) {
    return res.status(404).json({
      message: "Email is invalid!",
    });
  }

  if (checkIsEmpty(password)) {
    return res.status(404).json({
      message: "Password can't be empty!",
    });
  }

  if (!passwordPattern.test(password)) {
    return res.status(404).json({
      message:
        "Password needs at least 8 characters, 1 uppercase, 1 lowercase and 1 number!",
    });
  }

  next();
};

//Verify authentication token:
const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token.includes("Bearer") && token.length > 1) {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      next();
    }
  } catch (err) {
    return res.status(401).json({
      message: "Authentication failed!",
    });
  }
};

module.exports = { validateData, isAuth };
