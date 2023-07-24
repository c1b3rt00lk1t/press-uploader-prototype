import React, { useContext, useEffect } from "react";
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";
import PressUploaderContext from "../contexts/PressUploaderContext";

const Checkout = () => {
  const {
    checkoutSession,
    checkoutSessionURL,
    handleChangeCheckoutSession,
    handleChangeCheckoutSessionURL,
    getDataFromDBSessionList,
    handleGetSessionList,
    handleClickCheckout,
    checkoutCard,
   } = useContext(PressUploaderContext);

   useEffect(() => {
    getDataFromDBSessionList(handleGetSessionList);
   },[]);

  return (
    <CardDisplay>
      <Card status={checkoutCard.status} msg={[checkoutCard.msg]}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "5vh",
          }}
        >
          <input
            type="text"
            placeholder="session"
            value={checkoutSession}
            onChange={handleChangeCheckoutSession}
          ></input>
          <input
            type="text"
            placeholder="download url"
            value={checkoutSessionURL}
            onChange={handleChangeCheckoutSessionURL}
          ></input>
        </div>
        <button
          onClick={handleClickCheckout}
        >
          Checkout
        </button>
      </Card>
    </CardDisplay>
  );
};

export default Checkout;
