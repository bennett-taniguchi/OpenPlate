// Display users top tags graph with magnitudes of reoccurence
// Part of challenge is taking a comma separted list of tags
// and parsing them and removing reoccurences to build a dictionary of terms
// to be displayed on graph. From this users can visualize their distribution of
// restaurants they frequent based on tags in common between 'saved' restaurants.
import {Button,Card} from 'react-bootstrap'

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Radar } from 'react-chartjs-2';


export default function ReviewCard(props) {
    if(!props.show) return null

    function splitter(tags) {
      for(let i=0; i <tags.length;i++) {
          tags[i] = tags[i].toLowerCase().replace("&",'');
          for(let j =0; j<tags.length;j++) {
              if(tags[i].includes(tags[j]) && tags[i] != tags[j]) {
                  tags[i] = tags[i].replace(tags[j],'')
                  tags.push(tags[j])    
              }
          }
      }
      return tags;
  }
  
  function countedDict(tags) {
      let dict = {}
      for(let i = 0;i < tags.length;i++) {
          if(dict[tags[i]]) {
              dict[tags[i]] += 1;
          } else {
              dict[tags[i]] = 1;
          }
      }
      return dict;
  }

  let dictfinal = countedDict(splitter(props.tags))
  let labelsUsed = Object.keys(dictfinal)
  let dataUsed = Object.values(dictfinal)
  let topTag = labelsUsed[0]
    const data = {
        labels: labelsUsed,
        datasets: [
          {
            label: '# of Votes',    // correspondent category
            data: dataUsed,         // votes/count per each category
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
      ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
      );
    
    return (
        
        <div style={{marginLeft:'37%'}}>
        <Card style={{width:'30rem', 'text-align' : 'center'}}>
          <div style={{height:'100%',width:"100%"}}>
          <Radar data={data} /> </div>
          <Card.Body>
              
          <Card.Title style={{'font-size' : '15px'}}>{props.name}</Card.Title>
            <Card.Text style={{'font-size' : '10px'}}>
              
              Your most prominent categories
            </Card.Text>
            <Button variant="primary" href="/App">Try Searching for: {topTag}</Button>
          </Card.Body>
        </Card></div>
        
        
          );
}