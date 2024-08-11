import React, {useState} from "react";
import {canisterId, createActor } from "../../../declarations/token/index";
import {AuthClient} from "@dfinity/auth-client";

function Faucet(props) {

  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Gimme gimme");

  async function handleClick(event) {
    setIsDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId,{
      agentOptions:{
        identity,
      },
      });

    const result = await authenticatedCanister.Payout();
    setButtonText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free TAna tokens here! Claim 10,000 TANA coins to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button disabled={isDisabled} id="btn-payout" onClick={handleClick}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
