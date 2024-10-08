"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useCallback } from "react";
import {
  Box,
  Divider,
  Link,
  // FormControl,
  // FormControlLabel,
  // FormLabel,
  // Radio,
  // RadioGroup,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Typography } from "@/ui";
import { useRouter } from "next/navigation";

const Payment = () => {
  // const [planType, setPlanType] = useState("basic-plan");
  const router = useRouter();

  const PaypalComponent = useCallback(
    () => (
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
          "buyer-country": "US",
          currency: "USD",
          components: "buttons",
        }}
      >
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "black",
            label: "paypal",
          }}
          createOrder={async () => {
            try {
              const currentCart = JSON.stringify({
                // cart: [{ id: planType }],
                cart: [{ id: "basic-plan" }],
              });

              const response = await fetch("/api/order/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                // use the "body" param to optionally pass additional order information
                // like product ids and quantities
                body: currentCart,
              });

              const orderData = await response.json();

              return orderData.message.id;
            } catch (e) {
              console.error(e);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(`/api/order/capture`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderID: data.orderID,
                }),
              });

              const orderData = await response.json();
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                console.log("->", orderData);
                const transaction =
                  orderData.message.purchase_units[0].payments.captures[0];

                const updateResponse = await fetch("/api/plan/update", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  // use the "body" param to optionally pass additional order information
                  // like product ids and quantities
                  body: JSON.stringify({
                    paid: true,
                    planType: "basic-plan",
                    purchaseDate: Date.now(),
                    quizzesAmount: 50,
                  }),
                });

                // const updateData = await updateResponse.json();
                if (updateResponse.ok && updateResponse.status === 200) {
                  router.push("/thank-you");
                }

                // console.log(
                //   "Capture result",
                //   orderData,
                //   JSON.stringify(orderData, null, 2)
                // );
              }
            } catch (error) {
              console.error(error);
            }
          }}
        />
      </PayPalScriptProvider>
    ),
    // [planType]
    [router]
  );

  return (
    <Grid
      container
      direction="column"
      spacing={4}
      justifyContent="center"
      alignItems="center"
      sx={{ margin: "0 auto" }}
    >
      <Grid sx={{ mb: 6 }}>
        <Typography variant="h1" align="center" sx={{ maxWidth: "570px" }}>
          Invest in your learning, pay to start
        </Typography>
      </Grid>

      <Box sx={{ border: "1px solid gray", p: 8, borderRadius: "8px" }}>
        <Grid sx={{ mb: 4 }}>
          <Typography variant="body1">
            Only{" "}
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              $9.00
            </Typography>{" "}
            for 50 quiz generations
          </Typography>
          {/*<FormControl>*/}
          {/*  <FormLabel id="demo-radio-buttons-group-label">*/}
          {/*    Choose your plan*/}
          {/*  </FormLabel>*/}
          {/*  <RadioGroup*/}
          {/*    aria-labelledby="demo-radio-buttons-group-label"*/}
          {/*    defaultValue="basic-plan"*/}
          {/*    name="radio-buttons-group"*/}
          {/*    value={planType}*/}
          {/*    onChange={(e) => setPlanType(e.target.value)}*/}
          {/*  >*/}
          {/*    <FormControlLabel*/}
          {/*      value="basic-plan"*/}
          {/*      control={<Radio />}*/}
          {/*      label="Basic plan - $9.00"*/}
          {/*    />*/}
          {/*    <FormControlLabel*/}
          {/*      value="advanced-plan"*/}
          {/*      control={<Radio />}*/}
          {/*      label="Advanced plan - $19.00"*/}
          {/*    />*/}
          {/*  </RadioGroup>*/}
          {/*</FormControl>*/}
        </Grid>

        <Grid sx={{ width: "100%" }}>
          <PaypalComponent />
        </Grid>
      </Box>

      <Divider sx={{ width: "50%" }}>
        <Typography variant="body1" sx={{ p: 2 }}>
          OR
        </Typography>
      </Divider>
      <Link variant="body1" href="/dashboard">
        I want to try first
      </Link>
    </Grid>
  );
};

export default Payment;
