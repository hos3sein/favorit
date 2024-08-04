const fetch = require("node-fetch");

exports.getOrderTruck = async (orderId) => {
  const url = `${process.env.SERVICE_TRUCK}/api/v1/truck/interservice/findorder/${orderId}`;

  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    const response = await rawResponse.json();
    if (response.success) {
      return response.data;
    }
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

exports.getOrderCommerce = async (orderId) => {
  // console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
  const url = `${process.env.SERVICE_ECOMMERCE}/api/v1/commerce/interservice/findsales/${orderId}`;

  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      return response.data;
    }
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

exports.getOrderTransport = async (orderId) => {
  // console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
  const url = `${process.env.SERVICE_TRANSPORT}/api/v1/transport/interservice/findorder/${orderId}`;

  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      return response.data;
    }
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

exports.createLineMaker = async (data) => {
  console.log("data>>>>>>>>>>>>>>>>>", data);

  const url = `${process.env.SERVICE_LINEMAKER}/api/v1/linemaker/interservice/createlinemaker`;

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await rawResponse.json();
    console.log(">>>>,response", response);
    if (response.success) {
      return response;
    } else {
      return response;
    }
  } catch (err) {
    console.log("err", err);
  }
};

exports.addGroup = async (id, body) => {
  const url = `${process.env.SERVICE_AUTHENTICATION}/api/v1/auth/addgroup/${id}`;
  console.log("hiiiiii");

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await rawResponse.json();
    if (response.success) {
      console.log("its work");
      return response.success;
    }
  } catch (err) {
    console.log("err", err);
  }
};

exports.pushNotification = async (
  notificationType,
  title,
  message,
  recipient,
  sender,
  navigate,
  relationModel
) => {
  const url = `${process.env.SERVICE_NOTIFICATION}/api/v1/notification/pushnotification/createpushnotif`;
  //  const url = `http://localhost:8006/api/v1/notification/pushnotification/createpushnotif`;

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notificationType,
        title,
        message,
        recipient,
        sender,
        navigate,
        relationModel,
      }),
    });
    const response = await rawResponse.json();

    if (response.success) {
      // console.log("success");
    }
  } catch (error) {
    console.log("error", error);
  }
};

exports.refresh = async () => {
  const url = `${process.env.SERVICE_REFRESH}/api/v1/refresh/callfavorite`;
  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    const response = await rawResponse.json();
    // console.log("response refresh accept", response);
  } catch (error) {
    console.log("error", error);
  }
};
exports.addUserOrderCommerce = async (userId,orderId) => {
  console.log(userId);
  
  const url = `${process.env.SERVICE_ECOMMERCE}/api/v1/commerce/interservice/adduserfavorite/${userId}/${orderId}`;
  //  const url = `http://localhost:8010/api/v1/commerce/interservice/adduserfavorite/${userId}/${orderId}`;

  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      return response.success;
    }
  } catch (err) {
    console.log("err", err);
    return err;
  }
};
exports.removeUserOrderCommerce = async (userId,orderId) => {
  
  const url = `${process.env.SERVICE_ECOMMERCE}/api/v1/commerce/interservice/removeuserfavorite/${userId}/${orderId}`;
  // const url = `http://localhost:8010/api/v1/commerce/interservice/removeuserfavorite/${userId}/${orderId}`;

  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      return response.success
    }
  } catch (err) {
    console.log("err", err);
    return err;
  }
};
exports.addUserOrderTruck = async (userId,orderId) => {
  const url = `${process.env.SERVICE_TRUCK}/api/v1/truck/interservice/adduserfavorite/${userId}/${orderId}`;

  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      return response.success;
    }
  } catch (err) {
    console.log("err", err);
    return err;
  }
};
exports.removeUserOrderTruck = async (userId,orderId) => {
  
  const url = `${process.env.SERVICE_TRUCK}/api/v1/truck/interservice/removeuserfavorite/${userId}/${orderId}`;

  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      return response.success
    }
  } catch (err) {
    console.log("err", err);
    return err;
  }
};
exports.refreshGC = async () => {
  const url = `${process.env.SERVICE_REFRESH}/api/v1/refresh/callcommerce`;
  try {
    const rawResponse = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ provider: id }),
    });
    const response = await rawResponse.json();
  } catch (error) {
    console.log("error", error);
  }
};
exports.refreshTruck = async () => {
  const url = `${process.env.SERVICE_REFRESH}/api/v1/refresh/calltruck`;
  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    const response = await rawResponse.json();
    // console.log("response refreshTruck accept", response);
  } catch (error) {
    console.log("error", error);
  }
};