function login(clientID, callback) {
    if (typeof callback !== "function")
        return
    let dataRecieved = false;
    const myWindow = window.open(`http://localhost:3001/?clientId=${clientID}`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=650,height=600");
  
      window.addEventListener('message', (e) => {
        if(e?.origin === 'http://localhost:3001'){ //Voltox
          dataRecieved = true;
          callback(e?.data);
          myWindow?.close();
        }
      }, false);
      
      const interval = setInterval(() => {
        if(myWindow?.closed){
          if(!dataRecieved){
            callback({
                  success: false,
                  error: true,
                  message: 'Window is closed'
              });
          }
          clearInterval(interval);
        }
      },1000);
  }

  module.exports = {
    login
  }