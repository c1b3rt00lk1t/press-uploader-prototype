import React from 'react'
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";

const Checkout = () => {
  return (
    <CardDisplay>
        <Card status={true} msg={['Hello']}>
          <button onClick={() => {console.log('bye')}}>Checkout</button>
        </Card>
    </CardDisplay>
  )
}

export default Checkout