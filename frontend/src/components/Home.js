import Axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [userData, setUserData] = useState({});

  const loadData = async (e) => {
    Axios.get(`${process.env.REACT_APP_API_URL}/home`)
      .then((d) => setUserData(d.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div className="welcome">
        <div className="main">Welcome to the Online Voting System</div>
        <div className="down">
          <div className="one">scroll down</div>
          <div className="two">v</div>
        </div>
      </div>
      <div>
        <div className="head">
          <h1>Live Stats</h1>
        </div>
        <div>
          <div className="total">
            <h1>The total votes are : </h1>
            <h1 className="votes">{userData.total}</h1>
          </div>
          <div className="partyVote">
            <h1 className="partyWise">PartyWise vote are : </h1>
            <div className="grid">
              <div className="party">
                <h1>BJP</h1>
                <img className="partyImage" src="bjp.png" alt="BJP" />
                <h2>{userData.bjp}</h2>
              </div>
              <div className="party">
                <h1>AAP</h1>
                <img className="partyImage" src="aap.png" alt="" />
                <h2>{userData.aap}</h2>
              </div>
              <div className="party">
                <h1>Congress</h1>
                <img className="partyImage" src="congress.png" alt="" />
                <h2>{userData.congress}</h2>
              </div>
              <div className="party">
                <h1>National Congress Party</h1>
                <img className="partyImage" src="inc.png" alt="" />
                <h2>{userData.ncp}</h2>
              </div>
              <div className="party">
                <h1>Indian National Lok Dal</h1>
                <img className="partyImage" src="inld.png" alt="" />
                <h2>{userData.inld}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
