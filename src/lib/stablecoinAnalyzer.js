
import { TOKENS } from "./tokenConfig.js";

const stablecoinContracts = TOKENS.ethereum.map((token) =>
  token.contract.toLowerCase()
);

export function analyzeStablecoinTransfers(transfers) {
  const stableTransfers = transfers
    .filter((tx) =>
      stablecoinContracts.includes(tx.contractAddress.toLowerCase())
    )
    .map((tx) => {
      const amount =
        Number(tx.value) / Math.pow(10, Number(tx.tokenDecimal));

      return {
        token: tx.tokenSymbol,
        amount,
        date: new Date(Number(tx.timeStamp) * 1000),
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
      };
    })
    .filter((tx) => tx.to !== tx.from);

  return stableTransfers;
}


export function findMilestones(transfers) {
  const milestones = [2, 10, 100, 1000, 10000];

  return milestones.map((target) => {
    const match = transfers.find(
      (tx) => tx.amount >= target
    );

    return {
      target,
      transaction: match || null,
    };
  });
}
