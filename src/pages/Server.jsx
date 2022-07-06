import React, {useContext} from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";
import { useNavigate } from "react-router-dom";

const Server = () => {
    const {handleGetSessionsFromDB,serverGetSessions,uniqueSessions} = useContext(PressUploaderContext)
  const navigate = useNavigate();
  return (
    <div id="server">
      <CardDisplay>
        <Card status={serverGetSessions.status} msg={[serverGetSessions.msg]}>
          <button
            onClick={handleGetSessionsFromDB}
            disabled={false}
          >
            Get Sessions
          </button>
        </Card>
        <Card status={undefined} msg={[]}>
            {uniqueSessions.map(session => <div key={session}>{session}</div>)}
            
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
