import { useState } from "react";
import { scanContractQuery } from "./queries/scanContract.js";
import {
  Container,
  ScrollArea,
  TextInput,
  Button,
  Paper,
  Text,
  Overlay,
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
    <Container size="xs" style={{ backgroundColor: '#f5f5dc', padding: '10px', borderRadius: '25px' }}>
      <Overlay
            gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 100%)"
            opacity={0.3}
            zIndex={0}
          />
  <Paper padding="xs" radius="md" style={{ backgroundColor: '#f5f5dc' }}>
  <img src="../dist/128x128.png" alt="Sentrii Logo" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
        <h1 style={{ fontFamily: "'Open Sans', sans-serif", marginBottom: '20px', textAlign: 'center' }}>Sentrii Smart Contract Scanner</h1>
        <TextInput
          placeholder="Enter Contract Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginTop: '20px' }} 
        />
          <Paper padding="sm" radius="sm" style={{ marginTop: '20px', marginBottom: '20px' ,display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button variant="light" color="blue" style={{ backgroundColor: '#0056b3', color: 'white' }} onClick={handleScan}>
        Scan
      </Button>
    </Paper>
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', fontWeight: 'normal', textAlign: 'center'  }}>
      We also automatically scan the websites you visit to ensure safety
    </p>


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