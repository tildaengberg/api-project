import React, { useState, useEffect } from 'react'
import '../index.css';

function WheaterAPI(props) {

  const [Items, fetchItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  console.log(props.inputYear)
  console.log(props.inputMonth)
  console.log(props.inputLat)
  console.log(props.inputLng)


  

  useEffect(() => {
    const getData = () => {
      fetch(`https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=T2M&community=RE&longitude=${props.inputLng}&latitude=${props.inputLat}&start=${props.inputYear}&end=${props.inputYear}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          fetchItems(res)
        })
        .then((res) => setLoaded(true))
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  console.log(Items)

  if (!isLoaded) {
    return <div>Loading...</div>
  }
  else {
    const data = Items.properties.parameter.T2M;
    const temp = Object.values(data)[(props.inputMonth)-1];
    return (
      <div className='output-banner'>
      <p>Under året {props.inputYear} och månad {props.inputMonth} var det i genomsnitt:</p>
      <p><b>{temp} grader</b></p>
      </div>
    )

  }
}

export default WheaterAPI