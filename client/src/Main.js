// Default Landing Page for application
// Displays 3 cards depicting the results of the search functionality defined in App
// Cards spin on carousel and interact just as they do normally:
// Users can add restaurants to saved, add reviews, view reviews, leave ratings (to factor in saved)
import { Carousel } from "react-bootstrap";
import Navigation from "./Navigation";
import Axios from "axios";
import Result from "./Result";
import { useState } from "react";
import "./Main.css";
export default function Main() {
  const [seattle, setSeattle] = useState([]); // coffee iin seattle washington
  const [austin, setAustin] = useState([]); //tacos in austin texas
  const [NY, setNY] = useState([]);     // pizza in new york new york

  const [called,setCalled] = useState(false);
  const seattleCall = () => {
    Axios.post("http://localhost:3001/yelp", {
      city: "Seattle",
      term: "Coffee",
      offset: 0,
    }).then((res) => {
      setSeattle(res.data);
      console.log(seattle)
    });
  };
  const austinCall = () => {
    Axios.post("http://localhost:3001/yelp", {
      city: "Austin",
      term: "Tacos",
      offset: 0,
    }).then((res) => {
      setAustin(res.data);
    });
  };
  const NYCall = () => {
    Axios.post("http://localhost:3001/yelp", {
      city: "New York",
      term: "Pizza",
      offset: 0,
    }).then((res) => {
      setNY(res.data);
    });
  };

  if(called == false) {
    seattleCall();
    austinCall();
    NYCall();
    setCalled(true)
}
  
  
  return (
    <div>
      <Navigation />
      <br />

      <div className="text-box">
        <h1 style={{ textAlign: "center" }}>OpenPlate</h1>
        <h1 style={{ textAlign: "center" }}>OpenPlate</h1>
      </div>
      <p style={{fontWeight:'900'}}>
        Find what you want!<span></span>
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h2 >Search for Coffee in Seattle:</h2>
        <h2 style={{marginLeft:'250px',marginRight:'250px'}}>Search for Tacos in Austin:</h2>
        <h2>Search for Pizza in New York:</h2>
      </div>
      <div style={{display:'flex',flexDirection:'row'}}>
      <Carousel style={{margin:'auto',width: "30rem" }}>
        {seattle.map((item) => (
            <Carousel.Item>
          <Result offset={0} key={item.id} props={item} />
          </Carousel.Item>
        ))}
      </Carousel>
      <Carousel style={{margin:'auto',width: "30rem" }}>
        {austin.map((item) => (
            <Carousel.Item>
          <Result offset={0} key={item.id} props={item} />
          </Carousel.Item>
        ))}
      </Carousel>
      <Carousel style={{margin:'auto',width: "30rem" }}>
        {NY.map((item) => (
            <Carousel.Item>
          <Result offset={0} key={item.id} props={item} />
          </Carousel.Item>
        ))}
      </Carousel>
      </div>
    </div>
  );
}
