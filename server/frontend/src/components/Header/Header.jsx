import React from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";
import "../assets/css/main.css";
import webicon from "../assets/dealericon.png"

const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });

    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out " + username + "...")
    }
    else {
      alert("The user could not be logged out.")
    }
  };

  //The default home page items are the login details panel
  let home_page_items = <div></div>

  //Gets the username in the current session
  let curr_user = sessionStorage.getItem('username')

  //If the user is logged in, show the username and logout option on home page
  if (curr_user !== null && curr_user !== "") {
    home_page_items = <div className="input_panel" style={{alignItems: 'center'}}>
      <span className='homepage_links'>{sessionStorage.getItem("username")}</span>
      <a className="homepage_links button primary solid" href="/djangoapp/logout" onClick={logout}>Logout</a>
    </div>
  }
  return (
    <div>

      <div id="main" style={{ height: '5%' }}>
        <div class="inner">
          <header id="header" style={{ paddingTop: '0%', paddingBottom: '0%' }}>

            <nav class="navbar navbar-expand-lg navbar-light" style={{ paddingTop: '0%', paddingBottom: '0%' }}>
              <div class="container-fluid">
                <img src={webicon} alt="Dealership icon"
                  style={{ paddingRight: '0%', paddingTop: '0%', width: '5%', height: '5%' }}></img>
                <h2 style={{ paddingRight: '5%', paddingTop: '2%' }}>Dealerships</h2>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                  aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="logo active" style={{ fontSize: "larger" }} aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="logo active" style={{ fontSize: "larger" }} href="/about">About Us</a>
                    </li>
                    <li class="nav-item">
                      <a class="logo active" style={{ fontSize: "larger" }} href="/contact">Contact Us</a>
                    </li>
                  </ul>
                  <span class="navbar-text">
                    <div class="loginlink" id="loginlogout">
                      {home_page_items}
                    </div>
                  </span>
                </div>
              </div>
            </nav>
          </header>
        </div>
      </div>
    </div>

  )
}

export default Header
