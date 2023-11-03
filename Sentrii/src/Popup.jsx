import { useState } from "react";
import { scanContractQuery } from "./queries/scanContract.js";
import {
  Container,
  ScrollArea,
  TextInput,
  Button,
  Paper,
  Text,
} from "@mantine/core";

export default function Popup() {
  const [address, setAddress] = useState("");
  const [scanResult, setScanResult] = useState(null);

  const handleScan = () => {
    if (address != "") {
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
            console.log("GraphQL Error:", data.errors);
          } else {
            const result = data.data.scannerProject;
            setScanResult(result);
          }
        })
        .catch((error) => {
          console.log("Request Error:", error);
        });
    }
  };

  return (
    <Container size="xs">
      <Paper padding="xs" radius="md">
        <h1>Scan Smart Contract Addresses</h1>
        <TextInput
          placeholder="Enter Contract Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Paper padding="sm" radius="sm" style={{ marginTop: "1rem" }}>
          <Button variant="light" color="blue" onClick={handleScan}>
            Scan
          </Button>
        </Paper>

        {scanResult && (
          <div>
            <h2>Scan Result</h2>
            <Paper
              padding="sm"
              radius="md"
              shadow="xs"
              style={{ marginBottom: "1rem" }}
            >
              <Text style={{ fontWeight: "bold" }}>Name:</Text>
              <Text>{scanResult.name}</Text>
            </Paper>
            <Paper
              padding="sm"
              radius="md"
              shadow="xs"
              style={{
                marginBottom: "1rem",
                maxHeight: "150px", // maximum height for card
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Address:</Text>
              <ScrollArea type="never">
                <Text>{scanResult.address}</Text>
              </ScrollArea>
            </Paper>
            <Paper
              padding="sm"
              radius="md"
              shadow="xs"
              style={{ marginBottom: "1rem" }}
            >
              <Text style={{ fontWeight: "bold" }}>Whitelisted:</Text>
              <Text>{scanResult.whitelisted ? "Yes" : "No"}</Text>
            </Paper>
            <Paper padding="sm" radius="md" shadow="xs">
              <Text style={{ fontWeight: "bold" }}>Trust Score:</Text>
              <Text>{scanResult.stats.percentage}/100</Text>
            </Paper>
          </div>
        )}
      </Paper>
    </Container>
  );
}
