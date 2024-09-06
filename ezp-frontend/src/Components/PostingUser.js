import React, { useState } from "react";

const PostingUser = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isBlockListed, setIsBlockListed] = useState(false);
  const [transactionPassword, setTransactionPassword] = useState("");
  const url = "http://localhost:9090/api/user";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      name,
      password,
      email,
      currentBalance: Number(currentBalance), // Ensure it's a number
      isBlockListed,
      transactionPassword,
    };
    console.log(userData);

    try {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let json = await response.json();
      console.log(json);

      // Clear form fields after successful submission
      setUsername("");
      setName("");
      setPassword("");
      setEmail("");
      setCurrentBalance(0);
      setIsBlockListed(false);
      setTransactionPassword("");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
      </div>
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
      </div>
      <div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </div>
      <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          value={currentBalance}
          onChange={(e) => setCurrentBalance(e.target.value)}
          type="number"
          placeholder="Current Balance"
        />
      </div>
      <div>
        <select
          value={isBlockListed}
          onChange={(e) => setIsBlockListed(e.target.value === "true")}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>
      <div>
        <input
          value={transactionPassword}
          onChange={(e) => setTransactionPassword(e.target.value)}
          type="text"
          placeholder="Transaction Password"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostingUser;
