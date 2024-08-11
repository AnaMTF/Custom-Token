import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import {AuthClient} from "@dfinity/auth-client";

const init = async () => { 
  ReactDOM.render(<App />, document.getElementById("root"));

  const authClient = await AuthClient.create();

  if(await authClient.isAuthenticated()) {
    handleAuth(authClient);
  }else{
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        ReactDOM.render(<App />, document.getElementById("root"));
      },
      onError: () => {
        console.log("Error logging in");
      },
    });
  }
}

async function handleAuth(authClient){
  const identity = await authClient.getIdentity();
  const userPrincipal = identity.getPrincipal().toString();
  console.log("Logged in as: ", userPrincipal);
  ReactDOM.render(<App loggedInPrincipal={userPrincipal}/>, document.getElementById("root"));
}

init();


