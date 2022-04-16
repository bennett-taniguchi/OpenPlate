// For rendering yelp requested stars, as defined under usage requirements of
// yelp-fusion api
import "./Stars.css";

export default function Stars(props) {
  
  return (
    <ul  class="rate-area">
      <input type="radio" id={"5-star" + props.name} name={props.name} value="5" />
      <label for={"5-star" + props.name} title="Amazing">
        5 stars
      </label>
      <input type="radio" id={"4-star" + props.name} name={props.name} value="4" />
      <label for={"4-star" + props.name} title="Good">
        4 stars
      </label>
      <input type="radio" id={"3-star" + props.name} name={props.name} value="3" />
      <label for={"3-star" + props.name} title="Average">
        3 stars
      </label>
      <input type="radio" id={"2-star" + props.name} name={props.name} value="2" />
      <label for={"2-star" + props.name} title="Not Good">
        2 stars
      </label>
      <input
        type="radio"
        id={"1-star" + props.name}
        required=""
        name={props.name}
        value={"1-star" + props.name}
        aria-required="true"
      />
      <label for={"1-star" + props.name} title="Bad">
        1 star
      </label>
    </ul>
  );
}
