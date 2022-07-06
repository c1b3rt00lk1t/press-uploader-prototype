import { createContext, useState } from "react";
import { getDataFromDB } from "../firebase";

const PressUploaderContext = createContext();

export const PressUploaderContextProvider = ({ children }) => {

  /** 
   * SERVER CONTEXT 
   * */
  
  const [data, setData] = useState();
  const [uniqueSessions, setUniqueSessions] = useState([]);

  /* States for controlling the status and messages of the cards */
  const emptyCard = { status: undefined, msg: [] };
  const [serverGetSessions, setServerGetSessions] = useState(emptyCard);

  const handleGetSessionsFromDB = () => {
    setServerGetSessions({ status: undefined, msg: ["Getting sessions..."] });
    const handleDataFromDB = (data) => {      
      console.log(data);
      console.log(Object.keys(data));
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

  return (
    <PressUploaderContext.Provider
      value={{
        handleGetSessionsFromDB,
        data,
        uniqueSessions,
        serverGetSessions,
      }}
    >
      {children}
    </PressUploaderContext.Provider>
  );
};

export default PressUploaderContext;
