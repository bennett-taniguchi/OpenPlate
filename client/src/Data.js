import Navigation from "./Navigation";
import Axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ReviewCard from './ReviewCard'
import './Data.css'

export default function Data() {
  const [show,setShow] = useState(false)
  const [tagged,setTagged] = useState([])
  const [savedList,setSavedList] = useState([])
  const renderSaved = () => {
    Axios.get("http://localhost:3001/renderSaved").then((res) => {
      setSavedList(res.data);
      

      
      let tags = []
      for(let i =0;i <res.data.length;i++) {
        let tag = ''
        tag = res.data[i].tags
        tag = tag.replace(/\s/g, "")
        tag = tag.split(',')
        tags += (tag)
      }
      
      tags = Array.from(new Set(tags.split(','))).toString();
      tags = tags.split(',')
      

      // comma separated array of tags with duplicates usually with ands in between
      setTagged(tags) // Passed to ReviewCard in order to display top tags graphed
      setShow(true)
    });
  };

  // How we clear our database, not currently utilized
  // const clearDB = () => {
  //   Axios.get("http://localhost:3001/clear")
  //     .then((res) => {
  //       console.log("Cleared DB");
  //     })
  //     .then(() => {
  //       setReviewList([]);
  //       setSavedList([]);
  //     });
  // };

  return (
    <div >
      <Navigation />
      <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}> 

      <Button style={{float:'center'}}onClick={renderSaved} variant="outline-info">
        Show Analytics
      </Button>

      </div>
      <ReviewCard show = {show} tags={tagged}/>
      
    </div>
  );
}
