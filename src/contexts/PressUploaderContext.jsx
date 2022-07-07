import { createContext, useState } from "react";
import { getDataFromDB } from "../firebase";

const PressUploaderContext = createContext();

export const PressUploaderContextProvider = ({ children }) => {
  /**
   * SERVER CONTEXT
   * */

  const [data, setData] = useState();
  const [uniqueSessions, setUniqueSessions] = useState([]);
  const [session, setSession] = useState();

  /* States for controlling the status and messages of the cards */
  const emptyCard = { status: undefined, msg: [] };
  const [serverGetSessions, setServerGetSessions] = useState(emptyCard);
  const [serverSelectSession, setServerSelectSession] = useState(emptyCard);

  /* Functions */

  const handleGetSessionsFromDB = () => {
    setServerGetSessions({ status: undefined, msg: ["Getting sessions..."] });
    const handleDataFromDB = (data) => {
      // The states derived from the data are set
      const sessions = Object.keys(data);
      setData(data);
      setUniqueSessions(sessions);
      !!sessions.length
        ? setServerGetSessions({
            status: true,
            msg: ["All sessions received."],
          })
        : setServerGetSessions({
            status: false,
            msg: ["No sessions received."],
          });
    };
    getDataFromDB(handleDataFromDB);
  };

  const handleSessionSelection = (e) => {
    setSession(e.target.innerText);
    
  };

  const handleClickSelectSession = () => {

    console.log(data[session]);

    setServerSelectSession({
      status: true,
      msg: [""],
    })
  }

  return (
    <PressUploaderContext.Provider
      value={{
        handleGetSessionsFromDB,
        data,
        uniqueSessions,
        serverGetSessions,
        handleSessionSelection,
        handleClickSelectSession,
        serverSelectSession
      }}
    >
      {children}
    </PressUploaderContext.Provider>
  );
};

export default PressUploaderContext;
