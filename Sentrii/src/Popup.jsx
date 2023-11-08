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
  Select,
} from "@mantine/core";

export default function Popup() {
  const [address, setAddress] = useState("");
  const [id, setId] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [totalLiquidity, setTotalLiquidity] = useState(null);
  const [isell, setIell] = useState(null);
  const [isalp, setIsalp] = useState(null);



  const handleNetworkChange = (value) => {
    // This will set the id based on the selection
    const networkIdMap = {
      eth: 1,
      bnb: 2,
    };
    setId(networkIdMap[value]);
  };


  const handleScan = () => {
    setScanResult(null);
    setIsScanning(true);

    if (address != "") {
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
          variables: { address, id },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errors) {
            console.log("GraphQL Error:", data.errors);
          } else {
            const result = data.data.scannerProject;
            setScanResult(result);
            console.log(result);
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
    <Container
      size="xs"
      style={{
        backgroundColor: "#f5f5dc",
        padding: "10px",
        borderRadius: "0px",
      }}
    >
      <Overlay
        gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 100%)"
        opacity={0.3}
        zIndex={0}
      />

      <Paper
        padding="xs"
        radius="md"
        style={{
          backgroundColor: "#f5f5dc",
        }}
      >
        <img
          src="../128x128.png"
          alt="Sentrii Logo"
          style={{
            width: "50px",
            height: "auto",
            marginTop: "10px",
          }}
        />
        <h1
          style={{
            fontFamily: "'Open Sans', sans-serif",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Sentrii Smart Contract Scanner
        </h1>

        <Select
        label="Pick a network"
        placeholder="Pick a network"
        data={['eth', 'bnb']}
        onChange={handleNetworkChange}
        style={{ marginTop: "20px" }}
        required 
      />
        <TextInput
          placeholder="Enter Contract Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginTop: "20px" }}
        />
        <Paper
          padding="sm"
          radius="sm"
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="light"
            color="blue"
            style={{ backgroundColor: "#0056b3", color: "white" }}
            onClick={handleScan}
            disabled={isScanning}
          >
            {isScanning ? "Scanning..." : "Scan"}
          </Button>
        </Paper>
        <p
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "14px",
            fontWeight: "normal",
            textAlign: "center",
          }}
        >
          We also automatically scan the websites you visit to ensure safety
        </p>

        {scanResult && (
          <div>
            <h2
              style={{
                fontFamily: "'Open Sans', sans-serif",
                marginTop: "20px",
                marginBottom: "20px",
                textAlign: "center",
                fontWeight: 'bold', // This makes the text bold
                textDecoration: 'underline' 
              }}
            >
              Results
            </h2>
            <Paper
              padding="sm"
              radius={0}
              shadow="xs"
              style={{
                marginBottom: "1rem",
                backgroundColor: "#fff",
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Open Sans', sans-serif",
                  paddingTop: "10px"
                }}
              >
                Name:
              </Text>
              <Text style={{ fontFamily: "'Open Sans', sans-serif", paddingBottom: "10px" }}>
                {scanResult.name}
              </Text>
            </Paper>
            <Paper
              padding="sm"
              radius="0"
              shadow="xs"
              style={{
                marginBottom: "1rem",
                maxHeight: "150px",
                backgroundColor: "#fff",
                textAlign: "center", // Centers the text
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Open Sans', sans-serif",
                  paddingTop: "10px"
                }}
              >
                Address:
              </Text>
              <ScrollArea type="never">
                <Text
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "14px",
                    paddingBottom: "10px"
                  }}
                >
                  {scanResult.address}
                </Text>
              </ScrollArea>
            </Paper>
            <Paper
              padding="sm"
              radius="0"
              shadow="xs"
              style={{
                marginBottom: "1rem",
                backgroundColor: "#fff",
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Open Sans', sans-serif",
                  paddingTop: "10px",
                }}
              >
                Whitelisted:
              </Text>
              <Text style={{ fontFamily: "'Open Sans', sans-serif" , paddingBottom: "6px"}}>
                {scanResult.whitelisted ? "Yes" : "No"}
              </Text>
            </Paper>
            <Paper
              padding="sm"
              radius="0"
              shadow="xs"
              style={{
                marginBottom: "1rem",
                textAlign: "center",
                backgroundColor:
                  scanResult.stats.percentage < 50
                    ?  "#cc0000"
                    : scanResult.stats.percentage >= 50 &&
                      scanResult.stats.percentage <= 75
                    ? "yellow"
                    : "green",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Open Sans', sans-serif",
                  paddingTop: "10px"
                }}
              >
                Trust Score:
              </Text>
              <Text style={{ fontFamily: "'Open Sans', sans-serif" }}>
                {scanResult.stats.percentage}/100
              </Text>
              {scanResult.stats.percentage < 50 && (
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: "large",
                    color: "#fff",
                    paddingBottom: "10px",
                  }}
                >
                  Warning! Could be malicious
                </Text>
              )}
              {scanResult.stats.percentage >= 50 &&
                scanResult.stats.percentage <= 75 && (
                  <Text style={{ fontSize: "small", color: "#000" ,paddingBottom: "10px" }}>
                    Tread with caution
                  </Text>
                )}
              {scanResult.stats.percentage > 75 && (
                <Text style={{ color: "#fff" , paddingBottom: "10px"}}>All Good</Text>
              )}
            </Paper>
            <div>
  {/* Single Paper component to contain "Core issues:" and all descriptions */}
  <Paper
    padding="sm"
    radius="0"
    shadow="xs"
    style={{
      marginBottom: "1rem",
      textAlign: "center",
      backgroundColor: 'white',
    }}
  >
    {/* Heading "Core issues:" */}
    <div
      style={{
        fontWeight: "bold",
        fontFamily: "'Open Sans', sans-serif",
        paddingTop: "10px",
        paddingBottom: "5px"
      }}
    >
      Core issues:
    </div>

    {/* Check if there are any issues at all */}
    {scanResult.coreIssues.some(issueItem => issueItem.issues && issueItem.issues.length > 0) ? (
      // If there are issues, map over them and display
      scanResult.coreIssues.map((issueItem, index) => (
        issueItem.issues && issueItem.issues.length > 0 && (
          <div key={index} style={{ fontFamily: "'Open Sans', sans-serif", paddingBottom: "10px", fontSize: "13px" }}>
            - {issueItem.scwDescription}
          </div>
        )
      ))
    ) : (
      // If there are no issues at all, display "Nil"
      <div style={{ fontFamily: "'Open Sans', sans-serif", paddingBottom: "10px", fontSize: "13px" }}>Nil</div>
    )}
  </Paper>
</div>



          </div>
        )}
      </Paper>
    </Container>
  );
}
