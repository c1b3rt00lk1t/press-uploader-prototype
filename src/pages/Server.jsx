import React, { useContext } from "react";
import PressUploaderContext from "../contexts/PressUploaderContext";
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";
import { useNavigate } from "react-router-dom";
import SelectableMessageBox from "../shared/SelectableMessageBox";

const Server = () => {
  const {
    authenticated,
    handleGetSessionsFromDB,
    serverGetSessions,
    uniqueSessions,
    handleSessionSelection,
    handleClickSelectSession,
    serverSelectSession,
    
  } = useContext(PressUploaderContext);

  const navigate = useNavigate();
  
  return (
    <div id="server">
      {authenticated && <CardDisplay>
        <Card status={serverGetSessions.status} msg={[serverGetSessions.msg]}>
          <button onClick={handleGetSessionsFromDB} disabled={false}>
            Get Sessions
          </button>
        </Card>
        <Card status={serverSelectSession.status} msg={[]}>
          <SelectableMessageBox
            msg={uniqueSessions}
            handleSelection={handleSessionSelection}
          />
          <button
            onClick={() => {
              handleClickSelectSession();
              navigate("/tagger");
            }}
            disabled={false}
          >
            Select session
          </button>
        </Card>
      </CardDisplay>}
    </div>
  );
};

export default Server;
