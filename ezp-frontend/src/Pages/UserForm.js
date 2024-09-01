import React from "react";
import { useState } from "react";

export default function UserForm() {
  const [type, setType] = useState("deposit");
  const handleSubmit = () => {};

  return (
    <>
      <div className="user-container">
        <div className="left-container">
          <img
            className="userForm_Img1"
            src="/userForm2.png"
            alt=""
            srcset=""
          />
        </div>

        <div className="middle-container">
          <div className="user-form-container">
            <p>Enter your transaction details</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  // ref={userNameRef}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="deposit"
                      name="type"
                      value="deposit"
                      checked={type === "deposit"}
                      onChange={(e) => setType(e.target.value)}
                    />
                    <label htmlFor="deposit">Deposit</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="withdraw"
                      name="type"
                      value="withdraw"
                      checked={type === "withdraw"}
                      onChange={(e) => setType(e.target.value)}
                    />
                    <label htmlFor="withdraw">Withdraw</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="Amount"
                  // ref={userNameRef}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        <div className="right-container">
          <img className="userForm_Img1"
            src="/userForm1.png"
            alt=""
            srcset=""/>
        </div>
      </div>
    </>
  );
}
