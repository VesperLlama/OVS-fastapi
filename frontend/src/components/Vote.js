import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";

const Vote = () => {
  const history = useHistory();
  const [vote, setVote] = useState("");

  const SubmitVote = async (e) => {
    e.preventDefault();
    const aadhar = localStorage.getItem("aadhar");
    const party = vote;
    const token = localStorage.getItem("token")
    const data = { aadharNo: aadhar, party: party, token: token };

    if (vote === "") {
      message.error("Please Select an option");
      history.push("/vote");
    } else {
      Axios.post(`${process.env.REACT_APP_API_URL}/recordVote`, data)
        .then((res) => {
          console.log(res);
          if (res.status === 200 && !res.data) {
            message.success("Thank you for voting", 1.5, history.push("/"));
          } else if (res.status === 200 && res.data.message) {
            message.error(
              "You have already voted. You cannot vote again.",
              2,
              reload
            );
          } else {
            message.error("Voting failed. Please try again.");
            Promise.reject();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const reload = () => {
    history.push("/");
    window.location.reload();
  };

  return (
    <div className="VoteContainer">
      <div className="VoteHead">
        <div className="VoteMain"> Vote for a party</div>
        <div>
          Note : You will only be allowed to vote once and will not be able to
          change your decision.
        </div>
      </div>
      <div className="VoteParties">
        <form method="POST">
          <table>
            <tr>
              <th></th>
              <th></th>
              <th>Party name</th>
            </tr>
            <tr>
              <td>
                <input
                  type="radio"
                  name="party"
                  id="bjp"
                  value="bjp"
                  onClick={(e) => setVote(e.target.value)}
                />
              </td>
              <label htmlFor="bjp">
                <td className="voteImage">
                  <img src="bjp.png" alt="bjp" />
                </td>
              </label>
              <td>
                <label htmlFor="bjp">BJP</label>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="radio"
                  name="party"
                  id="congress"
                  value="congress"
                  onClick={(e) => setVote(e.target.value)}
                />
              </td>
              <label htmlFor="congress">
                <td className="voteImage">
                  <img src="congress.png" alt="" />
                </td>
              </label>
              <td>
                <label htmlFor="congress">Congress</label>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="radio"
                  name="party"
                  id="aap"
                  value="aap"
                  onClick={(e) => setVote(e.target.value)}
                />
              </td>
              <label htmlFor="aap">
                <td className="voteImage">
                  <img src="aap.png" alt="" />
                </td>
              </label>
              <td>
                <label htmlFor="aap">Aam Aadmi Party</label>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="radio"
                  name="party"
                  id="ncp"
                  value="ncp"
                  onClick={(e) => setVote(e.target.value)}
                />
              </td>
              <label htmlFor="ncp">
                <td className="voteImage">
                  <img src="inc.png" alt="" />
                </td>
              </label>
              <td>
                <label htmlFor="ncp">National Congress Party</label>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="radio"
                  name="party"
                  id="inld"
                  value="inld"
                  onClick={(e) => setVote(e.target.value)}
                />
              </td>
              <label htmlFor="inld">
                <td className="voteImage">
                  <img src="inld.png" alt="" />
                </td>
              </label>
              <td>
                <label htmlFor="inld">Indian National Lok Dal</label>
              </td>
            </tr>
          </table>

          <button onClick={SubmitVote}>Vote</button>
        </form>
      </div>
    </div>
  );
};

export default Vote;
