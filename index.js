import mongoose, { Schema } from "mongoose";
import express from "express";
import cors from "cors";
import studentDetails from "./model/studentDetails.js";

console.log("curd");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/create", async (req, res) => {
  try {
    const body = req.body;
    const { name, course, email, mobile } = body;
    const studentdata = await studentDetails.create({
      name: name,
      course: course,
      email: email,
      mobile: mobile,
    });
    res.send(studentdata);
  } catch (error) {
    console.log(error);
  }
});

app.get("/students", async (req, res) => {
  try {
    const studentsdata = await studentDetails.find();
    res.send(studentsdata);
  } catch (error) {
    console.log("server", error);
  }
});

app.delete("/students/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await studentDetails.findByIdAndDelete(id);
    const studentsdata = await studentDetails.find();
    res.send(studentsdata);
  } catch (error) {}
});

app.put("/students/edit", async (req, res) => {
  try {
    const { sid, name, course, email, mobile } = req.body;

    await studentDetails.findByIdAndUpdate(sid, {
      name,
      course,
      email,
      mobile,
    });
    const studentsdata = await studentDetails.find();
    res.send(studentsdata);
  } catch (error) {}
});

app.listen(5002, async () => {
  console.log("DB Created");
  await mongoose.connect(
    "mongodb+srv://kennedy:kenne@cluster0.saqdv.mongodb.net/CRUD"
  );
  console.log("db connected");
});
