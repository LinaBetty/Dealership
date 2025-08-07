import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

import "../assets/style.css";
import "../assets/bootstrap.min.css";
import "../assets/css/main.css";

import fondo from "../assets/ChatGPT.jpg";

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState();
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("postreview"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let review_url = root_url + `djangoapp/add_review`;
  let carmodels_url = root_url + `djangoapp/get_cars`;

  const postreview = async () => {
    let name = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
    //If the first and second name are stores as null, use the username
    if (name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if (!model || review === "" || date === "" || year === "" || model === "") {
      alert("All details are mandatory")
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });

    console.log(jsoninput);
    const res = await fetch(review_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsoninput,
    });

    const json = await res.json();
    if (json.status === 200) {
      window.location.href = window.location.origin + "/dealer/" + id;
    }

  }
  const get_dealer = async () => {
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();

    if (retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer)
      if (dealerobjs.length > 0)
        setDealer(dealerobjs[0])
    }
  }

  const get_cars = async () => {
    const res = await fetch(carmodels_url, {
      method: "GET"
    });
    const retobj = await res.json();

    let carmodelsarr = Array.from(retobj.CarModels)
    setCarmodels(carmodelsarr)
  }
  useEffect(() => {
    get_dealer();
    get_cars();
  }, []);


  return (
    <div id="wrapper">
      <div id="main">
        <div style={{ margin: "0px" }}>
          <Header />
          <div style={{ marginLeft: "5%", marginRight: '5%' }}>
            <h1 style={{ color: "darkblue", marginLeft:'2%', marginTop:'1%', marginBottom:'1%' }}>{dealer.full_name}</h1>
            <div style={{marginLeft: '3%'}}>
              <div className='col-3 col-12-xsmall'>
                Purchase Date <input type="date" onChange={(e) => setDate(e.target.value)} />
              </div>
              <br />
              <div className='col-4 col-12-xsmall'>
                Car Year <input type="int" onChange={(e) => setYear(e.target.value)} max={2023} min={2015} />
              </div>
              <br />
              <div className='col-4 col-12-xsmall' style={{ alignContent: 'center' }}>
                {/* Car Make */}
                Car Make and Model
                <select name="cars" id="cars" onChange={(e) => setModel(e.target.value)}>
                  <option value="" selected disabled hidden style={{color:'#9fa3a6'}}></option>
                  {carmodels.map(carmodel => (
                    <option value={carmodel.CarMake + " " + carmodel.CarModel}>{carmodel.CarMake} {carmodel.CarModel}</option>
                  ))}
                </select>
              </div >

              <br />
              <div className='col-8'>
                <textarea id='review' rows='4' onChange={(e) => setReview(e.target.value)} placeholder='Write your review'></textarea>
              </div>
              <br />
              <div>
                <button className='homepage_links button primary solid' onClick={postreview}>Post Review</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostReview
