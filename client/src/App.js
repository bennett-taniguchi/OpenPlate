// Main functionality known as 'Search' at top
// Users can search globally for cities and tags to display search results
// leveraged from yelp api. Users can add results to saved (with ratings they give)
// Users can add reviews and view other users reviews.
// Can navigate through results returned (20 pages max) Remember to hit refresh or search to refresh page
import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Result from "./Result";
import { Button } from "react-bootstrap";
import Refresh from "./refresh.png";

import Tooltip from "@mui/material/Tooltip";

import Navigation from "./Navigation";
export default function App() {
  const [city, setCity] = useState("Seattle"); // yelp paramter 1
  const [term, setTerm] = useState("Coffee"); // yelp paramter 2

  const [offset, setOffset] = useState(0); // yelp paramter 3
  const [num, setNum] = useState(0);

  const [post, setPost] = useState([]); // render yelp results

  //console.log(post); Uncomment to see default search results for data.businesses

  // Sets current page of results displayed
  function setPage(index) {
    console.log(index);
    if (index == 0) {
      setOffset(0);
      setNum(0);
    } else {
      setOffset((index - 1) * 20);
      setNum(index);
    }
    if (index == num) {
      return "danger";
    }
    return "outline-danger";
  }

  // Representation of number boxes utilized for page navigation
  let nums = [];
  for (let i = 1; i <= 20; i++) {
    nums[i] = String(i);
  }

  // Utilized for Reviews: Users need a username of atleast 1 character
  // Substantial review greater than 10 characters and less than 256
  const [errmsg, setErrmsg] = useState("");

  // Takes in a non empty string, required to search
  // Utilizes term passed in as search as well (can be blank)
  // Offset corresponds to page selected +20 results displayed
  const yelpCall = () => {
    if (city == "" || city.length == 1) {
      setErrmsg("Please enter a city!");
      return;
    }
    setErrmsg("");
    Axios.post("http://localhost:3001/yelp", {
      city: city,
      term: term,
      offset: offset,
    }).then((res) => {
      console.log(res.data);
      console.log(res);
      setPost(res.data);
    });
  };

  // only empties frontend view,
  // backend wont change unless instructed
  // Confusingly named clearDB, based on function in Data.js
  const clearDB = () => {
    Axios.get("http://localhost:3001/clear")
      .then((res) => {
        console.log("Cleared DB");
      })
      .then(() => {
        setPost([]);
      });
  };

  return (
    <div className="App">
      <Navigation />
      <div className="info">
        <div style={{ display: "flex", flexDirection: "row" }}></div>
        <label>
          <Tooltip title="Default city is Seattle, Required" arrow>
            <mButton>City:</mButton>
          </Tooltip>
        </label>
        <input
          type="text"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <i style={{ color: "red", fontSize: "12px" }}>{errmsg}</i>

        <label>
          <Tooltip title="Default term is Coffee" arrow>
            <mButton>Term:</mButton>
          </Tooltip>
        </label>
        <input
          type="text"
          onChange={(event) => {
            setTerm(event.target.value);
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Tooltip placement="right-start" title="Click to Refresh" arrow>
            <Button onClick={yelpCall}>
              <mButton>Search Yelp!</mButton>
            </Button>
          </Tooltip>

          <Button onClick={clearDB} variant="outline-danger">
            Clear Results
          </Button>
        </div>
        <div>
          {nums.map((item) => (
            <Button
              className="custom"
              onClick={() => setPage(item)}
              variant="outline-danger"
              key={item}
              style={{
                width: "40px",
                height: "40px",
                marginLeft: "2px",
                marginRight: "2px",
              }}
            >
              {item}
            </Button>
          ))}
        </div>
        <img
          onClick={yelpCall}
          style={{
            cursor: "pointer",
            marginTop: "10px",
            height: "40px",
            width: "auto",
          }}
          src={Refresh}
        />
        <Tooltip title="Click Search to Refresh" arrow>
          <mButton>
            <br />
            <b>Page: {offset / 20 + 1}</b>
          </mButton>
        </Tooltip>

        <h2>
          {post.map((item) => (
            <Result offset={offset} key={item.id} props={item} />
          ))}
        </h2>
      </div>
    </div>
  );
}
