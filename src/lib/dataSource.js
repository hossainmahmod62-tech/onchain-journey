import { buildMockProfile, CHAINS } from "./mockData.js";
import { fetchTokenTransfers } from "./etherscanClient.js";
import { analyzeStablecoinTransfers, findMilestones } from "./stablecoinAnalyzer.js";


const providers = {

  mock: {
    id: "mock",
    label: "Deterministic mock data",

    async fetchProfile(address) {
      await wait(400);
      return buildMockProfile(address);
    },
  },


  etherscan: {
    id: "etherscan",
    label: "Ethereum stablecoin data",

    async fetchProfile(address) {

      const transfers = await fetchTokenTransfers(address);

      const stablecoins = analyzeStablecoinTransfers(transfers);

      const milestones = findMilestones(stablecoins);


      const firstActivity =
        stablecoins.length > 0
          ? stablecoins[0].date
          : new Date();


      return {

        address,

        walletAgeDays:
          Math.floor(
            (Date.now() - firstActivity.getTime())
            /
            (1000 * 60 * 60 * 24)
          ),


        firstActivity,


        milestones: milestones.map((item) => ({
          label: `$${item.target}`,
          amount: item.transaction
            ? item.transaction.amount
            : 0,

          date: item.transaction
            ? item.transaction.date
            : null,

          chain: "Ethereum",

          hash: item.transaction
            ? item.transaction.hash
            : null,
        })),


        personalities: [
          "Early Builder"
        ],


        era: "Ethereum Era",


        activeChains: [
          "Ethereum"
        ],


        stats: {

          transactions:
            stablecoins.length,

          stablecoinsReceived:
            stablecoins.reduce(
              (sum, tx) => sum + tx.amount,
              0
            ),

        },

      };
    },
  },
};



function wait(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}


function isValidEvmAddress(address) {

  return (
    typeof address === "string" &&
    /^0x[a-fA-F0-9]{40}$/.test(
      address.trim()
    )
  );

}



function activeProviderId() {

  const configured =
    import.meta.env?.VITE_DATA_SOURCE;


  return configured &&
    providers[configured]
      ? configured
      : "mock";

}



export function getSupportedChains() {
  return CHAINS;
}



export function validateAddress(address) {

  if (!address || !address.trim()) {

    return {
      valid:false,
      error:"Enter a wallet address to continue."
    };

  }


  if (!isValidEvmAddress(address.trim())) {

    return {
      valid:false,
      error:"That does not look like a valid EVM address."
    };

  }


  return {
    valid:true,
    error:null
  };

}



export async function fetchWalletProfile(address) {

  const validation =
    validateAddress(address);


  if (!validation.valid) {

    throw new Error(validation.error);

  }


  const provider =
    providers[activeProviderId()];


  return provider.fetchProfile(
    address.trim()
  );

}



export function currentProviderLabel() {

  return providers[
    activeProviderId()
  ].label;

}
