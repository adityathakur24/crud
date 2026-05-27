const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/mydatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);
async function insertUser() {
  const user = new User({
    name: "Aditya",
    email: "aditya@mail.com",
    age: 25,
  });

  const result = await user.save();
  console.log("Inserted:", result);
}

async function fetchUsers() {
  const users = await User.find();
  console.log("Users:", users);
}
async function updateUser() {
  const updated = await User.findOneAndUpdate(
    { email: "aditya@mail.com" },
    { age: 20 },
    { new: true }
  );

  console.log("Updated:", updated);
}

async function deleteUser() {
  const deleted = await User.findOneAndDelete({
    email: "aditya@mail.com",
  });

  console.log("Deleted:", deleted);
}

async function run() {
  await insertUser();

  await fetchUsers();

  await updateUser();

  await fetchUsers();

  await deleteUser();

  await fetchUsers();

  mongoose.connection.close();
}

run();
