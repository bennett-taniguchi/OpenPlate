// Our definition of the cards displayed or search results of query in 'Search'/App.js
// Each card corresponds to a restaurant matched by city or tag query from users search request
// Users can interact with cards and leave reviews, view other users revies, add a rating which is tied to the data
// for saving a restaurant. Cards also display basic information about restaurant from yelp.
import { Card } from "react-bootstrap";
import { Button, Row, Col, Modal, Form, ListGroup } from "react-bootstrap";
import { useState } from "react";
import moment from "moment";
import Stars from "./Stars";
import RenderStar from "./RenderStar";
import Axios from "axios";

import "./Result.css";
export default function Result(props) {
  const [reviewList, setReviewList] = useState([]);
  const each = props.props;

  var cats = "";
  for (var i = 0; i < each.categories.length; i++) {
    cats += JSON.stringify(each.categories[i]);
    cats = cats.replace("alias", "");
    cats = cats.replace("title", "");
    cats = cats.replace(/[{}:"]/g, " ");
  }
  var url_used = "";
  if (each.image_url == "") {
    url_used =
      "https://cdn.vox-cdn.com/thumbor/-B5VFIqotr4V4siyJqqxk8VXo5k=/0x0:1000x640/1400x1400/filters:focal(420x240:580x400):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/56041809/Yelp_trademark_RGB_outline.0.jpg";
  } else {
    url_used = each.image_url;
  }

  const [username, setUsername] = useState("");
  const [review, setReview] = useState("");

  const [noreviews, setNoreviews] = useState(""); //
  const renderReviews = () => {
    if (reviewList.length > 0) {
      setNoreviews("");
      setReviewList([]);
      return;
    } else {
      Axios.post("http://localhost:3001/selectReviews", {
        id: each.id,
      }).then((res) => {
        setReviewList([res.data][0]);

        setNoreviews("");
        setErrmsg("");

        console.log(reviewList);
      });
    }
  };

  // each radio button has a unique id given by name
  // to allow for buttons to be independent
  function checkClicked() {
    var radios = document.getElementsByName(each.name);
    let highest = 0;
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked && radios[i].value > highest) {
        highest = radios[i].value;
      }
    }

    return highest;
  }

  // Adds to users saved list in database
  const addSaved = () => {
    let c = "N/A";
    let length = checkClicked();
    console.log(length);
    if (length != 0) {
      c = "";
      for (let i = 0; i < length; i++) {
        c += "⭐";
      }
    }
    Axios.post("http://localhost:3001/addSaved", {
      name: each.name,
      tags: cats,
      location:
        each.location.address1 +
        each.location.address2 +
        " " +
        each.location.address3 +
        each.location.city +
        " " +
        each.location.country,
      price: each.price,
      rated: c,
    });
  };

  const [errmsg, setErrmsg] = useState([]);
  const addReview = () => {
    if (username == "") {
      setErrmsg(["Add a username"]);
      return;
    }
    if (review.length > 255) {
      setErrmsg(["Review too long"]);
      return;
    }
    if (review.length < 10) {
      setErrmsg(["Review too short"]);
      return;
    }
    setNoreviews("");
    setErrmsg("");
    console.log(
      username,
      review,
      each.name,
      each.id,
      moment().format("DD-MM-YYYY hh:mm:ss")
    );
    Axios.post("http://localhost:3001/review", {
      username: username,
      review: review,
      restaurant: each.name,
      restaurantid: each.id,
      date: moment().format("DD-MM-YYYY hh:mm:ss"),
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ display: "flex", flexDirection: "row", "margin-top": "5px" }}>
      <Card style={{ width: "30rem" }}>
        <Card.Img
          variant="top"
          src={url_used}
          style={{ width: "29.95rem", height: "18rem", "object-fit": "cover" }}
        />

        <Card.Body>
          <Card.Title style={{ fontSize: 25 }}>
            <b>{each.name} </b>
          </Card.Title>

          <p style={{ "font-size": "12px" }}>Price: {each.price}</p>
          <Card.Text style={{ fontSize: 12 }}>
            {each.location.address1} {each.location.address2}{" "}
            {each.location.address3} {each.location.city}{" "}
            {each.location.country}
            <Card.Text style={{ fontSize: 12 }}>
              <RenderStar rating={each.rating} /> {each.review_count} Ratings
              &nbsp;
              <Button
                style={{ width: "80px" }}
                size="sm"
                variant="outline-danger"
                href={each.url}
                target="_blank"
              >
                on Yelp!
              </Button>
            </Card.Text>
            <Card.Text style={{ fontSize: 12 }}>
              <b style={{ fontWeight: "900" }}>Tags:</b> <i>{cats}</i>
            </Card.Text>
          </Card.Text>
          <Row style={{ "margin-top": "20px" }}>
            <Col>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Button
                  style={{ float: "right" }}
                  className="shadow"
                  size="sm"
                  variant="outline-danger"
                  onClick={handleShow}
                >
                  Add and View Reviews
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Review for {each.name}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>What's your name?</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Name"
                          autoFocus
                          onChange={(event) => {
                            setUsername(event.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>How was it?</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Let us know!"
                          rows={3}
                          onChange={(event) => {
                            setReview(event.target.value);
                          }}
                        ></Form.Control>
                        <i style={{ color: "red", fontSize: "12px" }}>
                          {errmsg}
                          <br />
                          {noreviews}
                        </i>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={addReview}>
                      Submit Review!
                    </Button>

                    <Button onClick={renderReviews}>Show Reviews</Button>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {reviewList.map((val, key) => {
                        return (
                          <ListGroup style={{ width: "470px" }} key={val.id}>
                            <ListGroup.Item>
                              <p style={{ fontSize: "15px" }}>
                                {" "}
                                <b>Name:</b> {val.username}
                                <br />
                                <b>Review:</b> {val.review}
                                <br />
                                <p style={{ fontSize: "12px" }}>
                                  <b>Date:</b> {val.date}
                                </p>
                              </p>
                            </ListGroup.Item>
                          </ListGroup>
                        );
                      })}
                    </div>
                  </Modal.Footer>
                </Modal>

                <Button
                  onClick={addSaved}
                  className="shadow"
                  size="sm"
                  variant="outline-danger"
                >
                  Add to Saved!
                </Button>
              </div>
              <p style={{ fontWeight: "900", fontSize: "1vw" }}>Your Rating:</p>
              <div style={{ marginLeft: "25%" }}>
                <Stars name={each.name} />
              </div>
            </Col>
          </Row>

          <Card.Text style={{ fontSize: 12 }}></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
