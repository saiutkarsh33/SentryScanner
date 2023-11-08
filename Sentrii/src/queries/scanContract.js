export const scanContractQuery = `
  query($address: String!) {
    scannerProject(
      where: {
        address: $address,
        chainId: 1
      }
    ) {
      address
      name
      contractName
      whitelisted
      stats {
        percentage
        scammed
      }
      coreIssues {
          scwId
        scwTitle
        scwDescription
        issues {
          id
          confidence
          impact
          description
          start
            end
          data
          snippet
          }
        }
    }
  }
`;
