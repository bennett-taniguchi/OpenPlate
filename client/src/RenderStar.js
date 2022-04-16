
import small0 from './small/small_0.png';
import small1 from './small/small_1.png';
import small2 from './small/small_1_half.png';
import small3 from './small/small_2.png';
import small4 from './small/small_2_half.png';
import small5 from './small/small_3.png';
import small6 from './small/small_3_half.png';
import small7 from './small/small_4.png';
import small8 from './small/small_4_half.png';
import small9 from './small/small_5.png';
// star values 0-5 .5 increments after 1
export default function RenderStar(props) {

    var each = {
        0 :small0,
        1: small1,
        1.5: small2,
        2: small3,
        2.5: small4,
        3: small5,
        3.5: small6,
        4: small7,
        4.5: small8,
        5: small9 }

    return(

        <img   style={{height:'14px',width:'82px'}} src= {each[props.rating]}/> 

    )
}