const axios = require("axios");

async function generateAccessToken() {
  const response = await axios({
    url: process.env.PAYPAL_BASE_URL + "/v1/oauth2/token",
    method: "post",
    data: "grant_type=client_credentials",
    auth: {
      username: process.env.PAYPAL_CLIENT_KEY,
      password: process.env.PAYPAL_SECRET_KEY,
    },
  });

  return response.data.access_token;
}

async function getProductId(name, desc) {
  const accessToken = await generateAccessToken();
  const response = await axios({
    url: process.env.PAYPAL_BASE_URL + "/v1/catalogs/products",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: JSON.stringify({
      name: name,
      description: desc,
      type: "SERVICE",
      category: "SOFTWARE",
    }),
  });

  return response.data.id;
}

exports.createMonthStarterOrder = async () => {
  const accessToken = await generateAccessToken();
  const product_id = await getProductId(
    "Monthly",
    "Monthly Starter plan for SEO Magic Writing"
  );
  try {
    const response = await axios({
      url: process.env.PAYPAL_BASE_URL + "/v1/billing/plans",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: JSON.stringify({
        product_id: product_id,
        name: "Monthly",
        description: "Monthly Starter plan for SEO Magic Writing",
        status: "ACTIVE",
        billing_cycles: [
          {
            frequency: { interval_unit: "MONTH", interval_count: 1 },
            tenure_type: "REGULAR",
            sequence: 1,
            pricing_scheme: {
              fixed_price: { value: "19", currency_code: "USD" },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          setup_fee_failure_action: "CANCEL",
          payment_failure_threshold: 3,
        },
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/success`,
          cancel_url: `${process.env.FRONTEND_URL}/cancel`,
          user_action: "PAY_NOW",
          shipping_preference: "NO_SHIPPING",
        },
        taxes: { percentage: "0", inclusive: false },
      }),
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

exports.createYearStarterOrder = async () => {
  const accessToken = await generateAccessToken();
  const product_id = await getProductId(
    "Yearly",
    "Yearly Starter plan for SEO Magic Writing"
  );
  try {
    const response = await axios({
      url: process.env.PAYPAL_BASE_URL + "/v1/billing/plans",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: JSON.stringify({
        product_id: product_id,
        name: "Yearly",
        description: "Yearly Starter plan for SEO Magic Writing",
        status: "ACTIVE",
        billing_cycles: [
          {
            frequency: { interval_unit: "YEAR", interval_count: 1 },
            tenure_type: "REGULAR",
            sequence: 1,
            pricing_scheme: {
              fixed_price: { value: "168", currency_code: "USD" },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          setup_fee_failure_action: "CANCEL",
          payment_failure_threshold: 3,
        },
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/success`,
          cancel_url: `${process.env.FRONTEND_URL}/cancel`,
          user_action: "PAY_NOW",
          shipping_preference: "NO_SHIPPING",
        },
        taxes: { percentage: "0", inclusive: false },
      }),
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

exports.createMonthProfessionalOrder = async () => {
  const accessToken = await generateAccessToken();
  const product_id = await getProductId(
    "Monthly",
    "Monthly Starter plan for SEO Magic Writing"
  );
  try {
    const response = await axios({
      url: process.env.PAYPAL_BASE_URL + "/v1/billing/plans",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: JSON.stringify({
        product_id: product_id,
        name: "Monthly Prof",
        description: "Monthly Professional plan for SEO Magic Writing",
        status: "ACTIVE",
        billing_cycles: [
          {
            frequency: { interval_unit: "MONTH", interval_count: 1 },
            tenure_type: "REGULAR",
            sequence: 1,
            pricing_scheme: {
              fixed_price: { value: "79", currency_code: "USD" },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          setup_fee_failure_action: "CANCEL",
          payment_failure_threshold: 3,
        },
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/success`,
          cancel_url: `${process.env.FRONTEND_URL}/cancel`,
          user_action: "PAY_NOW",
          shipping_preference: "NO_SHIPPING",
        },
        taxes: { percentage: "0", inclusive: false },
      }),
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

exports.createYearlyProfessionalOrder = async () => {
  const accessToken = await generateAccessToken();
  const product_id = await getProductId(
    "Yearly Prof",
    "Yearly Professional plan for SEO Magic Writing"
  );
  try {
    const response = await axios({
      url: process.env.PAYPAL_BASE_URL + "/v1/billing/plans",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: JSON.stringify({
        product_id: product_id,
        name: "Yearly Prof",
        description: "Yearly Professional plan for SEO Magic Writing",
        status: "ACTIVE",
        billing_cycles: [
          {
            frequency: { interval_unit: "YEAR", interval_count: 1 },
            tenure_type: "REGULAR",
            sequence: 1,
            pricing_scheme: {
              fixed_price: { value: "708", currency_code: "USD" },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          setup_fee_failure_action: "CANCEL",
          payment_failure_threshold: 3,
        },
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/success`,
          cancel_url: `${process.env.FRONTEND_URL}/cancel`,
          user_action: "PAY_NOW",
          shipping_preference: "NO_SHIPPING",
        },
        taxes: { percentage: "0", inclusive: false },
      }),
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const createSubscription = async (req, res) => {
  try {
    const accessToken = await generateAccessToken();

    const response = await axios({
      url: process.env.PAYPAL_BASE_URL + "/v1/billing/plans",
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log(response.data);

    /*await axios({
      url:
        process.env.PAYPAL_BASE_URL +
        "/v1/billing/plans/P-4XE53985VA2456844M4ENRWY",
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: JSON.stringify([
        {
          op: "replace",
          path: "/name",
          value: "NONE",
        },
      ]),
    });*/

    /*const plan = await axios({
      url:
        process.env.PAYPAL_BASE_URL +
        "/v1/billing/plans/P-27278088VF278281MM4ESFVA",
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log(plan.data);*/

    let id;
    if (req.body.name === "Starter" && req.body.billing === "monthly") {
      id = response.data.plans.find((plan) => plan.name === "Monthly").id;
    } else if (req.body.name === "Starter" && req.body.billing === "yearly") {
      id = response.data.plans.find((plan) => plan.name === "Yearly").id;
    } else if (
      req.body.name === "Professional" &&
      req.body.billing === "monthly"
    ) {
      id = response.data.plans.find((plan) => plan.name === "Monthly Prof").id;
    } else if (
      req.body.name === "Professional" &&
      req.body.billing === "yearly"
    ) {
      id = response.data.plans.find((plan) => plan.name === "Yearly Prof").id;
    } else {
      return null;
    }

    subscription = await axios({
      url: process.env.PAYPAL_BASE_URL + "/v1/billing/subscriptions",
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        plan_id: id,
        auto_renewal: true,
      }),
    });
    res.send(subscription.data);
  } catch (e) {
    console.log(e);
  }
};

const getSubscriptionApproval = async (req, res) => {
  const accessToken = await generateAccessToken();
  const response = await axios({
    url:
      process.env.PAYPAL_BASE_URL +
      `
/v1/billing/subscriptions/${req.body.subId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return res.send(response.data.status);
};

this.createMonthStarterOrder().then((res) => console.log(res));
this.createYearStarterOrder().then((res) => console.log(res));
this.createYearlyProfessionalOrder().then((res) => console.log(res));
this.createMonthProfessionalOrder().then((res) => console.log(res));

module.exports = { createSubscription, getSubscriptionApproval };
