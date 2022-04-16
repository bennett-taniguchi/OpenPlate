const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const axios = require("axios");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "employee",
});

const url = "https://api.yelp.com/v3/businesses/search";

// Adds entry into database
// app.post("/create", (req, res) => {
//     const name = req.body.name;
//     const age = req.body.age;
//     const country = req.body.country;
//     const position = req.body.position;
//     const wage = req.body.wage;

//     db.query(
//       "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
//       [name, age, country, position, wage],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           res.send("Values Inserted");
//         }
//       }
//     );
//   });

// app.get('/employees', (req,res) => {
//     db.query("SELECT * FROM employees", (err,result) => {
//         if(err) {
//             console.log(err)
//         } else {
//             res.send(result)
//         }
//     })
// })

// Retrieves correspondent restaurant with restaurantid from API as PK
app.post("/selectReviews", (req, res) => {
  const selected = req.body.id;
  db.query(
    "SELECT * FROM employee.reviews WHERE restaurantid = ?",
    [selected],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

// Returns reviews for restaurants, PK is restaurantid
app.get("/renderReviews", (req, res) => {
  db.query("SELECT * FROM employee.reviews", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Returns saved entries of restaurants
app.get("/renderSaved", (req, res) => {
  db.query("SELECT * FROM employee.saved", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// Request to Yelp Api, key is unfortunately hardcoded in ;(
app.post("/yelp", (req, res) => {
  const city = req.body.city;
  const term = req.body.term;
  const offset = req.body.offset;
  console.log(city, term);
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${"_MUmKqnkE0tJpkzO_Sb35qrIxJSMifjnfdtwcmYfFjXdMRf78Sgv-TxxcqEFVFCKcFJ7IT4Zf22EyRRIPux9KhNRGi9NBZnQ1Gx9uuNueqXR3beeMSCkR0p4OYcdYXYx"}`,
      },
      params: {
        location: city,
        term: term,
        offset: offset,
      },
    })
    .then((result) => {
      console.log(result);
      res.send(result.data.businesses);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Drops Table Entries, Not used
app.get("/clear", (req, res) => {
  db.query("DELETE FROM employee.employees WHERE id>'0';", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Adds a review for restaurant, restaurantid is primary key (from yelp api)
app.post("/review", (req, res) => {
  const username = req.body.username;
  const review = req.body.review;
  const restaurant = req.body.restaurant;
  const restaurantid = req.body.restaurantid;
  const date = req.body.date;

  console.log(username, review, restaurant, restaurantid, date);
  db.query(
    "INSERT INTO reviews (username, review, restaurant, restaurantid, date) VALUES (?,?,?,?,?)",
    [username, review, restaurant, restaurantid, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// Adds users saved restaurant to Table
app.post("/addSaved", (req, res) => {
  const name = req.body.name;
  const tags = req.body.tags;
  const location = req.body.location;
  const price = req.body.price;
  const rated = req.body.rated;
  console.log(name, tags, location, price, rated);
  db.query(
    "INSERT INTO employee.saved (name,tags,location,price,rated) VALUES (?,?,?,?,?)",
    [name, tags, location, price, rated],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running!, on port 3001");
});
