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


// 0x6982508145454Ce325dDbE47a25d4ec3d2311933




export default function Popup() {


  const [address, setAddress] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setScanResult(null);
    setIsScanning(true);


    if (address != "") { // Indicate loading state
      setScanResult(null);
      setIsScanning(true);
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
          setIsScanning(false);
        })
        .catch((error) => {
          console.log("Request Error:", error);
          setIsScanning(false);
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
      <Button variant="light" color="blue" style={{ backgroundColor: '#0056b3', color: 'white' }} onClick={handleScan} disabled={isScanning}>
      {isScanning ? 'Scanning...' : 'Scan'}
      </Button>
    </Paper>
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '14px', fontWeight: 'normal', textAlign: 'center'  }}>
      We also automatically scan the websites you visit to ensure safety
    </p>


    {scanResult && (
  <div>
    <h2 style={{ fontFamily: "'Open Sans', sans-serif", marginBottom: '20px', textAlign: 'center' }}>Results</h2>
    <Paper
      padding="sm"
      radius={0}
      shadow="xs"
      style={{ marginBottom: "1rem", backgroundColor: "#fff", textAlign: 'center' }}
    >
      <Text style={{ fontWeight: "bold", fontFamily: "'Open Sans', sans-serif" }}>Name:</Text>
      <Text style={{ fontFamily: "'Open Sans', sans-serif" }}>{scanResult.name}</Text>
    </Paper>
    <Paper
      padding="sm"
      radius="0"
      shadow="xs"
      style={{
        marginBottom: "1rem",
        maxHeight: "150px", 
        backgroundColor: "#fff",
        textAlign: 'center' // Centers the text
      }}
    >
      <Text style={{ fontWeight: "bold", fontFamily: "'Open Sans', sans-serif" }}>Address:</Text>
      <ScrollArea type="never">
        <Text style={{ fontFamily: "'Open Sans', sans-serif",fontSize: '14px'  }}>{scanResult.address}</Text>
      </ScrollArea>
    </Paper>
    <Paper
      padding="sm"
      radius="0"
      shadow="xs"
      style={{ marginBottom: "1rem", backgroundColor: "#fff", textAlign: 'center' }}
    >
      <Text style={{ fontWeight: "bold", fontFamily: "'Open Sans', sans-serif" }}>Whitelisted:</Text>
      <Text style={{ fontFamily: "'Open Sans', sans-serif" }}>{scanResult.whitelisted ? "Yes" : "No"}</Text>
    </Paper>
    <Paper
    padding="sm"
    radius="0"
    shadow="xs"
    style={{
      marginBottom: "1rem",
      textAlign: 'center',
      backgroundColor: scanResult.stats.percentage < 50 ? 'red' :
                      (scanResult.stats.percentage >= 50 && scanResult.stats.percentage <= 75) ? 'yellow' : 'green'
    }}
  >
    <Text style={{ fontWeight: "bold", fontFamily: "'Open Sans', sans-serif" }}>Trust Score:</Text>
    <Text style={{ fontFamily: "'Open Sans', sans-serif" }}>{scanResult.stats.percentage}/100</Text>
    {scanResult.stats.percentage < 50 && (
      <Text style={{ fontWeight: "bold", fontSize: "large", color: "#fff" }}>Warning! Could be malicious</Text>
    )}
    {scanResult.stats.percentage >= 50 && scanResult.stats.percentage <= 75 && (
      <Text style={{ fontSize: "small", color: "#000" }}>Tread with caution</Text>
    )}
    {scanResult.stats.percentage > 75 && (
      <Text style={{ color: "#fff" }}>All Good</Text>
    )}
  </Paper>
  </div>
)}

      </Paper>
    </Container>
  );
}