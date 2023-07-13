import React, { useState } from 'react'
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";

const Checkout = () => {

  const [checkoutSession, setCheckoutSession] = useState("");
  const [checkoutSessionURL, setCheckoutSessionURL] = useState("");

  return (
    <CardDisplay>
        <Card status={undefined} msg={['']}>
            <div style={{display:'flex', flexDirection:'column', justifyContent: "space-around", height:"5vh"}}>
                <input type="text" placeholder="session" value={checkoutSession} onChange={e => setCheckoutSession(e.target.value)}></input>
                <input type="text" placeholder="download url" value={checkoutSessionURL} onChange={e => setCheckoutSessionURL(e.target.value)}></input>
            </div>
          <button onClick={() => {
            console.log('fake checkout',checkoutSession,checkoutSessionURL)
            setCheckoutSession("");
            setCheckoutSessionURL("");
        }}>Checkout</button>
        </Card>
    </CardDisplay>
  )
}

export default Checkout