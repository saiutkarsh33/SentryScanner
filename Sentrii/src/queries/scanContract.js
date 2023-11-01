export const scanContractQuery = `
  query($address: String!) {
    scannerProject(
      where: {
        address: $address,
        chainId: 1
      }
    ) {
      id
      address
      name
      contractName
      whitelisted
      txCount
      stats {
        low
        medium
        high
        critical
        total
        percentage
        scammed
      }
      diffs {
        id
        address
        network
        name
        projectName
        score
        createdAt
      }
    }
  }
`;
