import React from "react";
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";
import { useNavigate } from "react-router-dom";

const Server = () => {
  const navigate = useNavigate();
  return (
    <div id="server">
      <CardDisplay>
        <Card status={undefined} msg={[]}>
          <button
            onClick={() => {
              console.log('Get sessions')
            }}
            disabled={false}
          >
            Get Sessions
          </button>
        </Card>
        <Card status={undefined} msg={[]}>
          <button
            onClick={() => {
              console.log('Select session')
              navigate('/tagger')
            }}
            disabled={false}
          >
            Select session
          </button>
        </Card>
      </CardDisplay>
    </div>
  );
};

export default Server;
