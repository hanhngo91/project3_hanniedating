import React, { useEffect, useState } from "react";
import "./MatchesDisplay.css";
import axios from "axios";
import { notification } from "antd";

function MatchesDisplay({ user, matches, setClickedUser }) {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const matchedUserIds = matches?.map(({ user_id }) => user_id);

  const getMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      // console.log("response.data-->>", response.data);
      setMatchedProfiles(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (matches) {
      getMatches();
    }
  }, [matches]);

  //Update the matches list of the other user after deleting a match:
  const updateOtherUserMatches = async (matchId) => {
    try {
      await axios.put("http://localhost:8000/delete-match", {
        userId: matchId,
        matchId: user?.data?.user_id,
      });
      getMatches();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteMatch = async (id) => {
    console.log("delete ID here-->>", id);
    try {
      const response = await axios.put("http://localhost:8000/delete-match", {
        userId: user?.data?.user_id,
        matchId: id,
      });
      console.log("response", response);
      const success = response.status === 200;
      if (success) {
        updateOtherUserMatches(id);
        getMatches();
        notification.success({
          message: "Deleted a match successfully!",
        });
      } else {
        notification.error({
          message: "Failed to delete a match!",
        });
      }
      const newMatchedProfiles = matchedProfiles.filter(
        (match) => match.user_id !== id
      );
      setMatchedProfiles(newMatchedProfiles);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="matches-display">
      <>
        {matchedProfiles?.map((match, index) => (
          <div key={index} className="match-card">
            <div className="a" onClick={() => setClickedUser(match)}>
              <div className="img-container">
                <img src={match?.url[0]} alt={match?.first_name} />
              </div>
              <div>
                <p className="matchedName">{match?.first_name}</p>
              </div>
            </div>
            <button
              className="btn-delete"
              onClick={() => handleDeleteMatch(match?.user_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </>
    </div>
  );
}

export default MatchesDisplay;
