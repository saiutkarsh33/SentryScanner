import { useState, useEffect } from "react";
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
  Switch,
} from "@mantine/core";

export default function Popup() {
  const [address, setAddress] = useState("");
  const [id, setId] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const [scanLiquidResult, setScanLiquidResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [checked, setChecked] = useState(false);
  const [cannotFind, setCannotFind] = useState(false);
  const [haveCritical, setHaveCritical] = useState(false);

  useEffect(() => {
    // You want this to run only after a scan is completed, not while it is scanning
    if (!isScanning && scanResult) {
      const hasCriticalIssue = scanResult.coreIssues?.some((issueGroup) =>
        issueGroup.issues?.some(
          (issue) => issue.impact === "High" || issue.impact === "Critical"
        )
      );

      setHaveCritical(hasCriticalIssue);
    }
    // This will trigger the effect to re-run when isScanning changes to false, indicating a scan was completed
  }, [isScanning, scanResult]);

  // Sort the core issues by impact rank if they exist

  const impactRank = {
    Critical: 1,
    High: 2,
    Medium: 3,
    Low: 4,
    Informational: 5,
    Optimisation: 6,
  };

  const handleNetworkChange = (value) => {
    // This will set the id based on the selection
    const networkIdMap = {
      eth: 1,
      bnb: 2,
    };
    setId(networkIdMap[value]);
  };

  const handleScan = () => {
    setCannotFind(false);
    setScanResult(null);
    setIsScanning(true);
    setHaveCritical(false);

    if (address != "") {
      setScanResult(null);
      setIsScanning(true);
      fetch("https://public-api.de.fi/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "24ecca376cbd4d6d92224dc6c0f72bac",
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
            setCannotFind(true);
          } else {
            if (!data.data) {
              setCannotFind(true);
            }
            const result = data.data.scannerProject;
            if (checked) {
              const liquidResult = data.data.scannerLiquidityAnalysis;
              setScanLiquidResult(liquidResult);
            }
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

  const handleSwitch = () => {
    // Toggle the 'checked' state to its opposite value
    setChecked((prevChecked) => !prevChecked);
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
          src="../assets/128x128.png"
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

        <Switch
          checked={checked}
          onChange={handleSwitch}
          label="Liquidity Analysis"
          // If you want the label click to also toggle the switch, you can wrap the Switch in a Label component
          // and call the handleSwitch function when the Label is clicked
          labelProps={{ onClick: handleSwitch }}
          id="liquidity-switch"
        />

        <Select
          label="Pick a network"
          placeholder="Pick a network"
          data={["eth", "bnb"]}
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
        {cannotFind ? (
          <Text
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "small",
              fontWeight: "bold",
              color: "red",
              textAlign: "center",
            }}
          >
            Token not found in network selected
          </Text>
        ) : null}
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
                fontWeight: "bold", // This makes the text bold
                textDecoration: "underline",
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
                  paddingTop: "10px",
                }}
              >
                Name:
              </Text>
              <Text
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  paddingBottom: "10px",
                }}
              >
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
                  paddingTop: "10px",
                }}
              >
                Address:
              </Text>
              <ScrollArea type="never">
                <Text
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "14px",
                    paddingBottom: "10px",
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
              <Text
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  paddingBottom: "6px",
                }}
              >
                {scanResult.whitelisted ? "Yes" : "No"}
              </Text>
            </Paper>

            {/* Single Paper component to contain "Core issues:" and all descriptions */}
            <Paper
              padding="sm"
              radius="0"
              shadow="xs"
              style={{
                marginBottom: "1rem",
                textAlign: "center",
                backgroundColor: "white",
              }}
            >
              {/* Heading "Core issues:" */}
              <div
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Open Sans', sans-serif",
                  paddingTop: "10px",
                  paddingBottom: "5px",
                }}
              >
                Core issues:
              </div>

              {/* Check if there are any issues at all */}
              {scanResult.coreIssues
                .sort((a, b) => {
                  // Deliverable: before you get a.issues[0] and b.issues[0] you sort the relevant issues based on impact if the length is >1
                  if (a.issues.length > 1) {
                    a.issues.sort((r, v) => {
                      const rImpact = r.impact;
                      const vImpact = v.impact;
                      return impactRank[rImpact] - impactRank[vImpact];
                    });
                  }

                  if (b.issues.length > 1) {
                    b.issues.sort((s, t) => {
                      const sImpact = t.impact;
                      const tImpact = t.impact;
                      return impactRank[sImpact] - impactRank[tImpact];
                    });
                  }

                  const aImpact =
                    a.issues && a.issues.length > 0
                      ? a.issues[0].impact
                      : "Informational";
                  const bImpact =
                    b.issues && b.issues.length > 0
                      ? b.issues[0].impact
                      : "Informational";

                  return impactRank[aImpact] - impactRank[bImpact];
                })
                .some(
                  (issueItem) => issueItem.issues && issueItem.issues.length > 0
                ) ? (
                // If there are issues, map over them and display

                scanResult.coreIssues.map((issueItem, index) =>
                  issueItem.issues && issueItem.issues.length > 0 ? (
                    <div
                      key={index}
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        paddingBottom: "10px",
                        fontSize: "13px",
                        fontWeight:
                          issueItem.issues[0].impact === "High" ||
                          issueItem.issues[0].impact === "Critical"
                            ? "bold"
                            : "normal", // Check for 'High' or 'Critical' impact to set fontWeight
                      }}
                    >
                      - {issueItem.scwDescription}
                    </div>
                  ) : null
                )
              ) : (
                // If there are no issues at all, display "Nil"
                <div
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    paddingBottom: "10px",
                    fontSize: "13px",
                  }}
                >
                  Nil
                </div>
              )}
            </Paper>
            <Paper
              padding="sm"
              radius="0"
              shadow="xs"
              style={{
                textAlign: "center",
                backgroundColor:
                  scanResult.stats.percentage < 50
                    ? "#cc0000"
                    : (scanResult.stats.percentage >= 50 &&
                        scanResult.stats.percentage <= 75) ||
                      haveCritical
                    ? "yellow"
                    : "green",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Open Sans', sans-serif",
                  paddingTop: "10px",
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
              {((scanResult.stats.percentage >= 50 &&
                scanResult.stats.percentage <= 75) ||
                haveCritical) && (
                <Text
                  style={{
                    fontSize: "small",
                    color: "#000",
                    paddingBottom: "10px",
                  }}
                >
                  Tread with caution
                </Text>
              )}
              {scanResult.stats.percentage > 75 && !haveCritical && (
                <Text style={{ color: "#fff", paddingBottom: "10px" }}>
                  All Good
                </Text>
              )}
            </Paper>
            <Text
              style={{
                textAlign: "center",
                fontSize: "small",
                paddingBottom: "10px",
              }}
            >
              Trust score does not take into account liquidity analysis.
            </Text>
            <div></div>

            {checked && scanLiquidResult && (
              <div>
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
                      paddingTop: "14px",
                    }}
                  >
                    Total Liquidity:
                  </Text>
                  <Text
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      paddingBottom: "10px",
                    }}
                  >
                    ${Math.floor(Number(scanLiquidResult.totalLiquidity))}
                  </Text>
                </Paper>

                <Paper
                  padding="sm"
                  radius={0}
                  shadow="xs"
                  style={{
                    marginBottom: "1rem",
                    backgroundColor: scanLiquidResult.isEnoughLiquidityLocked
                      ? "#fff"
                      : "#cc0000",
                    textAlign: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontFamily: "'Open Sans', sans-serif",
                      paddingTop: "14px",
                      color: scanLiquidResult.isEnoughLiquidityLocked
                        ? "#000"
                        : "#fff",
                    }}
                  >
                    Is there enough liquidity locked?
                  </Text>
                  <Text
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      paddingBottom: "10px",
                      color: scanLiquidResult.isEnoughLiquidityLocked
                        ? "#000"
                        : "#fff",
                    }}
                  >
                    {scanLiquidResult.isEnoughLiquidityLocked ? "Yes" : "No"}
                  </Text>
                </Paper>
                <Paper
                  padding="sm"
                  radius={0}
                  shadow="xs"
                  style={{
                    marginBottom: "1rem",
                    backgroundColor: scanLiquidResult.isAdequateLiquidityPresent
                      ? "#fff"
                      : "#cc0000",
                    textAlign: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontFamily: "'Open Sans', sans-serif",
                      paddingTop: "14px",
                      color: scanLiquidResult.isAdequateLiquidityPresent
                        ? "#000"
                        : "#fff",
                    }}
                  >
                    Is there adequate liquidity present?
                  </Text>
                  <Text
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      paddingBottom: "10px",
                      color: scanLiquidResult.isAdequateLiquidityPresent
                        ? "#000"
                        : "#fff",
                    }}
                  >
                    {scanLiquidResult.isAdequateLiquidityPresent ? "Yes" : "No"}
                  </Text>
                </Paper>
              </div>
            )}
          </div>
        )}
      </Paper>
    </Container>
  );
}
