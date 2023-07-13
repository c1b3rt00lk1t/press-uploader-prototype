import React, { useContext } from "react";
import Card from "../shared/Card";
import CardDisplay from "../shared/CardDisplay";
import PressUploaderContext from "../contexts/PressUploaderContext";

const Checkout = () => {
  const {
    checkoutSession,
    checkoutSessionURL,
    handleChangeCheckoutSession,
    handleChangeCheckoutSessionURL,
    resetCheckout
   } = useContext(PressUploaderContext);

  return (
    <CardDisplay>
      <Card status={undefined} msg={[""]}>
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
          onClick={() => {
            console.log("fake checkout", checkoutSession, checkoutSessionURL);
            resetCheckout();
          }}
        >
          Checkout
        </button>
      </Card>
    </CardDisplay>
  );
};

export default Checkout;
