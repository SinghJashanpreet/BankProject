const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "https://loanapp.netlify.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

const port = process.env.PORT || 5000;


const username = encodeURIComponent('officialkhalsajs');
const password = encodeURIComponent('J@sh@njo0');
const dbName = 'Borrows'; // Replace 'your-database-name' with your actual database name

const uri = `mongodb+srv://${username}:${password}@cluster0.cutxstq.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Your further code logic here
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });


const borrowSchema = new mongoose.Schema({
  userId: String,
  amountArray: [Number],
  dateArray: [String],
  transactions: [
    {
      amount: Number,
      date: String,
      num : String
    },
  ],
  mobileNumber: String,
  name: String,
});

const Borrow = mongoose.model("borrow", borrowSchema);

module.exports = Borrow;

app.use(express.json());

// Add routes for user registration and login
const authRoutes = require("../routes/auth");
app.use("/api", authRoutes);

app.post("/api/borrow/:mobileNumber", async (req, res) => {
  const { mobileNumber } = req.params;
  const { amount } = req.body;
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();

  try {
    let borrowItem = await Borrow.findOne({ mobileNumber });
    if (!borrowItem) {
      borrowItem = new Borrow({
        mobileNumber,
        amountArray: [],
        dateArray: [],
        transactions: [],
      });
    }

    borrowItem.amountArray.push(amount);
    borrowItem.dateArray.push(dateString);
    await borrowItem.save();

    res.status(200).json(borrowItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving borrow details to database" });
  }
});

app.get("/api/borrow/", async (req, res) => {
  try {
    const allBorrowItems = await Borrow.find({});
    res.status(200).json(allBorrowItems);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error fetching all borrow details from the database" });
  }
});

app.get("/api/borrow/:mobileNumber", async (req, res) => {
  const { mobileNumber } = req.params;

  try {
    const borrowItem = await Borrow.findOne({ mobileNumber });
    if (!borrowItem) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(borrowItem);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error fetching borrow details from database" });
  }
});

app.post("/api/borrow/:mobileNumber/:idx", async (req, res) => {
  const { mobileNumber, idx } = req.params;
  const deductionAmount = 100; // Assuming you want to deduct 100 Rs.

  try {
    // Find the borrow item by its _id and update the arrays
    const updatedItem = await Borrow.findOneAndUpdate(
      { mobileNumber: mobileNumber},
      {
        $inc: { [`amountArray.${idx}`]: -deductionAmount }, // Deduct the amount from the specific element in the amountArray
        $push: {
          transactions: {
            amount: -deductionAmount,
            date: new Date().toLocaleDateString(),
            num: parseInt(idx)+1,
          },
        }
      },
      { new: true}
    );

    if (!updatedItem) {
      // Borrow item with the given itemId not found
      return res.status(404).json({ error: "Borrow item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error deducting amount from the borrow item" });
  }
});

app.post("/api/login", async (req, res) => {
  const { mobileNumber } = req.body;
  try {
    // Check if the mobile number exists in the database
    const existingUser = await Borrow.findOne({ mobileNumber });
    if (existingUser) {
      // Mobile number exists in the database, send a success response
      res.json({ message: "Login successful", user: existingUser });
    } else {
      // Mobile number not found in the database, send an error response
      res
      .status(404)
      .json({ error: "Mobile number not found, please register." });
    }
  } catch (error) {
    // Handle any errors that may occur during database interaction
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/register", async (req, res) => {
  const { mobileNumber, name } = req.body;
  try {
    // Check if the mobile number already exists in the database
    const existingUser = await Borrow.findOne({ mobileNumber });
    if (existingUser) {
      // Mobile number already exists, send an error response
      res.status(409).json({ error: "Mobile number already registered." });
    } else {
      // Mobile number does not exist, create a new entry in the database
      const newUser = await Borrow.create({ mobileNumber, name });
      res.json({ message: "Registration successful", user: newUser });
    }
  } catch (error) {
    // Handle any errors that may occur during database interaction
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
