(() => {
  // vanilla.js
  var login = (clientID, callback) => {
    var _a;
    if (typeof callback !== "function")
      return;
    let dataRecieved = false;
    const uri = `http://localhost:3000/?next=${(_a = window == null ? void 0 : window.location) == null ? void 0 : _a.origin}&clientId=${clientID}`;
    const encoded = encodeURI(uri);
    const myWindow = window.open(
      encoded,
      "_blank",
      "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=300,width=650,height=600"
    );
    window.addEventListener(
      "message",
      (e) => {
        if ((e == null ? void 0 : e.origin) === "http://localhost:3000") {
          dataRecieved = true;
          callback(e == null ? void 0 : e.data);
          myWindow == null ? void 0 : myWindow.close();
        }
      },
      false
    );
    const interval = setInterval(() => {
      if (myWindow == null ? void 0 : myWindow.closed) {
        if (!dataRecieved) {
          callback({
            success: false,
            error: true,
            message: "Window is closed"
          });
        }
        clearInterval(interval);
      }
    }, 1e3);
  };
})();
