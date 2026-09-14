
const API_URL = "https://api.etherscan.io/v2/api";

export async function fetchTokenTransfers(address) {
  const apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY;

  const params = new URLSearchParams({
    chainid: "1",
    module: "account",
    action: "tokentx",
    address,
    page: "1",
    offset: "100",
    sort: "asc",
    apikey: apiKey,
  });

  const response = await fetch(`${API_URL}?${params}`);

  const data = await response.json();

  if (data.status !== "1") {
    return [];
  }

  return data.result;
  }
