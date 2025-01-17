import React, {useState} from "react";
import { token, canisterId, createActor} from "../../../declarations/token/index";
import {Principal} from "@dfinity/principal";
import {AuthClient} from "@dfinity/auth-client";

function Transfer(props) {
  
const [recipientId, setRecipientId] = useState("");
const [amount, setAmount] = useState("");
const [isDisabled, setIsDisabled] = useState(false);
const [feedback, setFeedback] = useState("");
const [isHidden, setIsHidden] = useState(true);

  async function handleClick() {
    setIsHidden(true);
    setIsDisabled(true);
    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.transfer(recipient, amountToTransfer);
    setFeedback(result);
    setIsHidden(false);
    setIsDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(event) => setRecipientId(event.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button disabled= {isDisabled} id="btn-transfer" onClick={handleClick} >
            Transfer
          </button>
        </p>
        <p hidden= {isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
