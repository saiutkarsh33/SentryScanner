export const scanContractLiquidityQuery = `
  query($address: String!, $id: Int!) {
    scannerProject(
      where: {
        address: $address,
        chainId: $id 
      }
    ) {
      totalLiquidity
			isEnoughLiquidityLocked
			isAdequateLiquidityPresent
    }
  }
`;
