const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const { validateData } = require("./middlewares/checkInput");
const multer = require("multer");
require("dotenv").config();

const messageRoutes = require("./routes/messages");
app.use("/messages", messageRoutes);

const uri = process.env.URI;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const bcrypt = require("bcrypt");

//Get all users:
app.get("/database/users", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const collection = database.collection("users");
    const users = await collection.find({}).toArray();
    return res.send(users);
  } finally {
    await client.close();
  }
});

//SingUp:
app.post("/signup", validateData, async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;
  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const users = database.collection("users");
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const sanitizedEmail = email.toLowerCase();
    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };
    const insertedUser = await users.insertOne(data);
    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24, //token will expire in 24 hours
    });

    res.status(201).json({
      message: "New user created successfully",
      token,
      userId: generatedUserId,
      email: sanitizedEmail,
    });
  } catch (error) {
    console.log(error);
  }
});

//Login:
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const users = database.collection("users");
    const user = await users.findOne({ email });

    if (user) {
      const correctPassword = await bcrypt.compare(
        //Result is a boolean (true/false)
        password,
        user.hashed_password
      );
      if (correctPassword) {
        const token = jwt.sign(user, email, {
          expiresIn: "24h", //token will expire in 24 hours
        });
        res.status(201).json({
          message: "User logged in successfully!",
          token,
          userId: user.user_id,
          email: user.email,
        });
      } else {
        res.status(400).json({
          status: 400,
          message: "Password is incorrect!",
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
//Get login user:
app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;
  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const collection = database.collection("users");
    const query = { user_id: userId };
    const user = await collection.findOne(query);
    return res.send(user);
  } finally {
    await client.close();
  }
});

//Swipe right user:
app.put("/swipe-right", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, swipeUser } = req.body;
  console.log(userId, swipeUser);
  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const users = database.collection("users");

    const query = { user_id: userId };

    const updateDocument = {
      $push: {
        swiped_users: { user_id: swipeUser },
      },
    };
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
});

//Update swiped-right-user to matches login user's array:
app.put("/update-matches", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, swipeUser } = req.body;
  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = {
      $push: {
        matches: { user_id: swipeUser },
      },
    };
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
});

//Update swiped-right-user's matches array:
app.put("/swiped-right-user-matches", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, swipeUser } = req.body;
  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const users = database.collection("users");

    const query = { user_id: swipeUser };
    const updateDocument = {
      $push: {
        matches: { user_id: userId },
      },
    };
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
});

//Swipe left user:
app.put("/swipe-left", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, swipeUser } = req.body;
  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = {
      $push: {
        swiped_left_users: { user_id: swipeUser },
      },
    };
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
});

//Update an user:
app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const users = database.collection("users");
    const query = { user_id: formData.user_id };
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        residence: formData.residence,
        from: formData.from,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
        hobbies: formData.hobbies,
        swiped_users: formData.swiped_users,
        be_swiped_by_users: formData.be_swiped_by_users,
        swiped_left_users: formData.swiped_left_users,
      },
    };
    const insertedUser = await users.updateOne(query, updateDocument);
    res.status(201).json({
      message: "User updated successfully",
      user: insertedUser,
    });
  } finally {
    await client.close();
  }
});

//Get gendered users:
app.get("/gendered-users", async (req, res) => {
  const client = new MongoClient(uri);
  const gender = req.query.gender;
  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const users = database.collection("users");

    //find users by gender:
    const query = { gender_identity: { $eq: gender } };
    //find users by gender:

    if (gender === "everyone") {
      const foundAllUsers = await users.find({}).toArray();
      return res.json(foundAllUsers);
    } else if (gender) {
      const foundUsers = await users.find(query).toArray();
      return res.json(foundUsers);
    }
  } finally {
    await client.close();
  }
});

//Get users in matches:
app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const users = database.collection("users");
    const pipeline = [
      {
        $match: {
          user_id: { $in: userIds },
        },
      },
    ];
    const foundUsers = await users.aggregate(pipeline).toArray();

    res.json(foundUsers);
  } finally {
    await client.close();
  }
});

//Delete an user account:
app.delete("/user", async (req, res) => {
  const userId = req.query.userId;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const users = database.collection("users");
    const query = { user_id: userId };
    const result = await users.deleteOne(query);
    if (result.deletedCount === 1) {
      res.sendStatus(200);
      console.log("Deleted your account successfully!");
    } else {
      res.sendStatus(404);
      console.log("Can't find user to delete!");
    }
  } catch (err) {
    res.sendStatus(500);
    console.log("Something went wrong!");
  } finally {
    await client.close();
  }
});

//Delete a match from matches array:
app.put("/delete-match", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchId } = req.body;
  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const users = database.collection("users");
    const query = { user_id: userId };
    const updateDocument = {
      $pull: {
        matches: { user_id: matchId },
      },
    };
    const user = await users.updateOne(query, updateDocument);
    if (user.modifiedCount === 1) {
      return res.status(200).json({
        message: "Deleted a match successfully!",
      });
    } else {
      return res.status(404).json({
        message: "Cannot delete a match!",
      });
    }
  } catch (err) {
    console.log("Error when try to delete a match:");
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

//Update matches array of other user:
app.put("/update-match", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchId } = req.body;
  try {
    await client.connect();
    const database = client.db("Hannie-dating-app");
    const users = database.collection("users");
    const query = { user_id: matchId };
    const updateDocument = {
      $push: {
        matches: { user_id: userId },
      },
    };
    const user = await users.updateOne(query, updateDocument);
    if (user.modifiedCount === 1) {
      return res.status(200).json({
        message: "Updated matches array successfully!",
      });
    } else {
      return res.status(404).json({
        message: "Cannot update matches array!",
      });
    }
  } catch (err) {
    console.log("Error when try to update matches array:");
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

//Upload multiple images by Multer:
const storageMulti = multer.diskStorage({
  destination: function (req, file, cb) {
    //đường dẫn file mà ta muốn upload vào
    cb(null, `${__dirname}/public/images`);
    console.log("__dirname", __dirname);
  },
  filename: function (req, file, cb) {
    let extArr = file.originalname.split(".");
    let ext = extArr[extArr.length - 1];
    const uniqueSuffix =
      Date.now() + "." + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const uploadMulti = multer({ storage: storageMulti }).array("url", 3);

app.post("/upload-image", function (req, res, next) {
  uploadMulti(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      //A Multer error occurred when uploading.
      res.json({
        status: "error",
        message: "A Multer error occurred when uploading.",
      });
    } else if (err) {
      //Unknown error occurred when uploading.
      res.json({
        status: "error",
        message: "An unknown error occurred when uploading.",
      });
    }

    //Upload successfully
    res.json({
      status: "success",
      message: "Upload successfully.",
    });
  });
});

console.log("-->> Server is running without any shit happen <<--");

app.listen(8000, () => {
  console.log(`Server is running on http://localhost:8000`);
});
