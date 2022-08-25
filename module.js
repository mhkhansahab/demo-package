const login = (clientID, callback) => {
  if (typeof callback !== "function") return;
  let dataRecieved = false;
  const uri = `http://localhost:3000/?next=${window?.location?.origin}&clientId=${clientID}`;
  const encoded = encodeURI(uri);
  const myWindow = window.open(
    encoded,
    "_blank",
    "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=300,width=650,height=600"
  );
  window.addEventListener(
    "message",
    (e) => {
      if (e?.origin === "http://localhost:3000") {
        //Voltox
        dataRecieved = true;
        callback(e?.data);
        myWindow?.close();
      }
    },
    false
  );

  const interval = setInterval(() => {
    if (myWindow?.closed) {
      if (!dataRecieved) {
        callback({
          success: false,
          error: true,
          message: "Window is closed",
        });
      }
      clearInterval(interval);
    }
  }, 1000);
}

module.exports = {
  login
}