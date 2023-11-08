export const scanContractQuery = `
  query($address: String!, $id: Int!) {
    scannerProject(
      where: {
        address: $address,
        chainId: $id
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
