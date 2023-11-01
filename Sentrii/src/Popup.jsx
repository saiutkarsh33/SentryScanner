import { useState } from "react";
import { scanContractQuery } from "./queries/scanContract.js";

function Popup() {
  const [address, setAddress] = useState("");
  const [scanResult, setScanResult] = useState(null);

  const handleScan = () => {
    fetch("https://public-api.de.fi/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "338a769238d845ce9a421b093082dcfb",
      },
      body: JSON.stringify({
        query: scanContractQuery,
        variables: { address },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          console.error("GraphQL Error:", data.errors);
        } else {
          const result = data.data.scannerProject; // Adjusted property name
          setScanResult(result);
        }
      })
      .catch((error) => {
        console.error("Request Error:", error);
      });
  };

  return (
    <div>
      <h1>Scan Smart Contract Addresses</h1>
      <input
        type="text"
        placeholder="Enter Contract Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleScan}>Scan</button>

      {scanResult && (
        <div>
          <h2>Scan Result</h2>
          <p>Name: {scanResult.name}</p>
          <p>Address: {scanResult.address}</p>
          <p>Whitelisted: {scanResult.whitelisted ? "Yes" : "No"}</p>
          <p>Trust Score: {scanResult.stats.percentage}/100</p>
        </div>
      )}
    </div>
  );
}

export default Popup;
