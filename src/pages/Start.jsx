import React, { useContext } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const {
    setOrigin,
  } = useContext(PressUploaderContext);


  const navigate = useNavigate();
  return (
    <div id="start">
      <CardDisplay>
        
        <Card status={undefined} msg={[]}>
          <button
            onClick={() => {
              setOrigin("folder");
              navigate("/selector");
            }}
            disabled={false}
          >
            Edit from folder
          </button>
        </Card>
        <Card status={undefined} msg={[]}>
          <button
            onClick={() => {
              setOrigin("server");
              navigate("/server");
            }}
            disabled={false}
          >
            Edit from server
          </button>
        </Card>
      </CardDisplay>
    </div>
  );
};

export default Start;
