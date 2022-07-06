import React from 'react'
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";
import { useNavigate } from "react-router-dom";

const Start = () => {
    const navigate = useNavigate();
  return (
    
    <div id="start">
      <CardDisplay>
        <Card status={undefined} msg={[]}>
          <button onClick={() => {navigate("/server")}} disabled={false}>Edit from server</button>
        </Card>
        <Card status={undefined} msg={[]}>
          <button onClick={() => {navigate("/selector")}} disabled={false}>Edit from folder</button>
        </Card>
        </CardDisplay>
    </div>
  )
}

export default Start