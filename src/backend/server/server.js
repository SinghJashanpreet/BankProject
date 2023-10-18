const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cron = require("node-cron");
const { v4: uuidv4 } = require("uuid");

app.use(
  cors({
    origin: "https://loanappbyjs.netlify.app/",
    //origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

const port = process.env.PORT || 5000;

const username = encodeURIComponent("officialkhalsajs");
const password = encodeURIComponent("J@sh@njo0");
const dbName = "Borrows"; // Replace 'your-database-name' with your actual database name

 const uri = `mongodb+srv://${username}:${password}@cluster0.cutxstq.mongodb.net/${dbName}?retryWrites=true&w=majority`;
// const uri = `mongodb://127.0.0.1:27017/borrowDB`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Your further code logic here
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const borrowSchema = new mongoose.Schema({
  userId: String,
  amountArray: [
    {
      id: String,
      TotalBorrow: Number,
      Remaining: Number,
      DateBorrow: String,
      Transactions: [
        {
          amount: Number,
          date: String,
        },
      ],
      Automate: Boolean,
      emi: Number,
    },
  ],
  // dateArray: [String],
  mobileNumber: String,
  name: String,
});

const Borrow = mongoose.model("borrow", borrowSchema);

module.exports = Borrow;

app.use(express.json());

// Add routes for user registration and login
const authRoutes = require("../routes/auth");
app.use("/api", authRoutes);

app.post("/deduct-emi", async (req, res) => {
  try {
    const currentDate = new Date().toLocaleDateString(); // Format the current date
    const docs = await Borrow.find({ "amountArray.Automate": true }).exec();
    for (const doc of docs) {
      for (const item of doc.amountArray) {
        if (item.Automate) {
          // Deduct EMI from Remaining
          item.Remaining -= item.emi;

          // Push a new Transaction object
          item.Transactions.push({ amount: item.emi, date: currentDate });
        }
      }
      await doc.save();
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Schedule the EMI deduction API to run daily
cron.schedule("0 0 * * *", async () => {
  try {
    // Call the EMI deduction API
    // await fetch('http://localhost:5000/deduct-emi', {
    await fetch("https://bank-backend7.onrender.com/deduct-emi", {
      method: "POST",
    });
  } catch (error) {
    console.error("Error running EMI deduction:", error);
  }
});

// Define a route for toggling EMI deduction
app.post("/toggle-decrement", async (req, res) => {
  try {
    const { userId, date, automate } = req.body;
    // Find the user by userId
    const user = await BorrowModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the amountArray item for the specified date
    const item = user.amountArray.find((a) => a.DateBorrow === date);

    if (!item) {
      return res.status(404).json({ error: "Date not found" });
    }

    // Toggle the automate field
    item.Automate = automate;

    // Save the updated document
    await user.save();

    return res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
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
  const name = !isNaN(mobileNumber) ? undefined : mobileNumber;
  try {
    if (name !== undefined) var borrowItem = await Borrow.findOne({ name });
    else var borrowItem = await Borrow.findOne({ mobileNumber });

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

app.post("/api/borrow/:mobileNumber", async (req, res) => {
  const { mobileNumber } = req.params;
  const { amount, maturityAmount } = req.body;
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const name = !isNaN(mobileNumber) ? undefined : mobileNumber;
  try {
    if (name !== undefined) var borrowItem = await Borrow.findOne({ name });
    else var borrowItem = await Borrow.findOne({ mobileNumber });

    if (!borrowItem) {
      borrowItem = new Borrow({
        mobileNumber,
        amountArray: [],
      });
    }
    const obj = {
      id: uuidv4(),
      TotalBorrow: amount,
      Remaining: maturityAmount,
      DateBorrow: dateString,
    };
    borrowItem.amountArray.push(obj);
    //borrowItem.dateArray.push(dateString);
    await borrowItem.save();

    res.status(200).json(borrowItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving borrow details to database" });
  }
});

app.post("/api/borrow/:mobileNumber/:idx", async (req, res) => {
  const { mobileNumber, idx } = req.params;
  const { deductAm } = req.body;
  const name = !isNaN(mobileNumber) ? undefined : mobileNumber;
  const deductionAmount = deductAm; // Assuming you want to deduct 100 Rs.

  try {
    // Find the borrow item by its _id and update the arrays
    if (name !== undefined) {
      var Data = await Borrow.findOne({ name });
      const data = Data.amountArray.filter((arr) => {
        return arr.id === idx;
      });

      const obj = {
        amount: -deductionAmount,
        date: new Date().toLocaleDateString(),
      };

      // Update the specific element within amountArray that matches the id
      const updatedAmountArray = Data.amountArray.map((item) => {
        if (item.id === idx) {
          item.Remaining = item.Remaining - deductionAmount;
          item.Transactions.push(obj);
        }
        return item;
      });

      Data.amountArray = updatedAmountArray;

      console.log(data);

      var updatedItem = await Borrow.findOneAndUpdate(
        {
          name: name,
        },
        {
          $set: { amountArray: Data.amountArray },
        },
        { new: true }
      );
    } else {
      var Data = await Borrow.findOne({ mobileNumber });
      var updatedItem = await Borrow.findOneAndUpdate(
        { mobileNumber: mobileNumber, "amountArray.id": idx },
        {
          $inc: { "amountArray.$.Remaining": -deductionAmount }, // Deduct the amount from the specific element in the amountArray
          $push: {
            "amountArray.$.Transactions": {
              amount: -deductionAmount,
              date: new Date().toLocaleDateString(),
            },
          },
        },
        { new: true }
      );
    }

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

app.post("/api/namechange/:mobileNumber/:Nname", async (req, res) => {
  const { mobileNumber, Nname } = req.params;

  const name = !isNaN(mobileNumber) ? undefined : mobileNumber;

  try {
    // Find the borrow item by its _id and update the arrays
    if (name !== undefined) {
      var updatedItem = await Borrow.findOneAndUpdate(
        { name: name },
        { $set: { name: Nname } },
        { new: true }
      );
    } else {
      var updatedItem = await Borrow.findOneAndUpdate(
        { mobileNumber: mobileNumber },
        { $set: { name: Nname } },
        { new: true }
      );
    }

    if (!updatedItem) {
      // Borrow item with the given itemId not found
      return res
        .status(404)
        .json({ error: "Data item not found to Change name" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error Changing Name" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
