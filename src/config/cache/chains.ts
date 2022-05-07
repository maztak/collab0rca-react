import { ChainInfo, FEATURES, GAS_PRICE_TYPE, getChainsConfig, RPC_AUTHENTICATION } from '@gnosis.pm/safe-react-gateway-sdk'
import { setWeb3ReadOnly } from 'src/logic/wallets/getWeb3'
import { GATEWAY_URL } from 'src/utils/constants'

// Cache is required as loading Redux store directly is an anit-pattern
let chains: ChainInfo[] = []

export const getChains = (): ChainInfo[] => chains

export const loadChains = async () => {
  chains = [ astarChainInfo ]
  setWeb3ReadOnly()
}

// An empty template is required because `getChain()` uses `find()` on load
export const emptyChainInfo: ChainInfo = {
  transactionService: '',
  chainId: '592',
  chainName: 'Astar Network Mainnet',
  shortName: 'astr',
  l2: false,
  description: '',
  rpcUri: { authentication: 'API_KEY_PATH' as RPC_AUTHENTICATION, value: 'https://rpc.astar.network:8545' },
  publicRpcUri: { authentication: 'API_KEY_PATH' as RPC_AUTHENTICATION, value: 'https://rpc.astar.network:8545' },
  safeAppsRpcUri: { authentication: 'API_KEY_PATH' as RPC_AUTHENTICATION, value: 'https://rpc.astar.network:8545' },
  blockExplorerUriTemplate: {
    address: "https://astar.subscan.io/account/{{address}}",
    txHash: "https://astar.subscan.io/extrinsic/{{txHash}}",
    api: "https://blockscout.com/astar/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}"
  },
  nativeCurrency: {
    name: 'Astar',
    symbol: 'ASTR',
    decimals: 18,
    logoUri: 'https://astar.network/images/brand-logo-mark.png',
  },
  theme: { textColor: '#001428', backgroundColor: '#DDDDDD' },
  ensRegistryAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  gasPrice: [
    {
      type: GAS_PRICE_TYPE.ORACLE,
      uri: "https://blockscout.com/astar/api?module=gastracker&action=gasoracle&apikey=JNFAU892RF9TJWBU3EV7DJCPIWZY8KEMY1",
      gasParameter: "FastGasPrice",
      gweiFactor: "1000000000.000000000"
    },
    {
      type: GAS_PRICE_TYPE.ORACLE,
      uri: "",
      gasParameter: "fast",
      gweiFactor: "100000000.000000000"
    }
  ],
  disabledWallets: [
    "lattice"
  ],
  features: [
    FEATURES.CONTRACT_INTERACTION,
    FEATURES.DOMAIN_LOOKUP,
    FEATURES.EIP1559,
    FEATURES.ERC721,
    FEATURES.SAFE_APPS,
    FEATURES.SAFE_TX_GAS_OPTIONAL,
    FEATURES.SPENDING_LIMIT,
  ],
}

// Network config for Astar Network
const astarChainInfo: ChainInfo = {
  transactionService: '',
  chainId: '592',
  chainName: 'Astar Network Mainnet',
  shortName: 'astr',
  l2: false,
  description: '',
  rpcUri: { authentication: 'API_KEY_PATH' as RPC_AUTHENTICATION, value: 'https://rpc.astar.network:8545' },
  publicRpcUri: { authentication: 'API_KEY_PATH' as RPC_AUTHENTICATION, value: 'https://rpc.astar.network:8545' },
  safeAppsRpcUri: { authentication: 'API_KEY_PATH' as RPC_AUTHENTICATION, value: 'https://rpc.astar.network:8545' },
  blockExplorerUriTemplate: {
    address: "https://astar.subscan.io/account/{{address}}",
    txHash: "https://astar.subscan.io/extrinsic/{{txHash}}",
    api: "https://blockscout.com/astar/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}"
  },
  nativeCurrency: {
    name: 'Astar',
    symbol: 'ASTR',
    decimals: 18,
    logoUri: 'https://astar.network/images/brand-logo-mark.png',
  },
  theme: { textColor: '#001428', backgroundColor: '#DDDDDD' },
  ensRegistryAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  gasPrice: [
    {
      type: GAS_PRICE_TYPE.ORACLE,
      uri: "https://blockscout.com/astar/api?module=gastracker&action=gasoracle&apikey=JNFAU892RF9TJWBU3EV7DJCPIWZY8KEMY1",
      gasParameter: "FastGasPrice",
      gweiFactor: "1000000000.000000000"
    },
    {
      type: GAS_PRICE_TYPE.ORACLE,
      uri: "",
      gasParameter: "fast",
      gweiFactor: "100000000.000000000"
    }
  ],
  disabledWallets: [
    "lattice"
  ],
  features: [
    FEATURES.CONTRACT_INTERACTION,
    FEATURES.DOMAIN_LOOKUP,
    FEATURES.EIP1559,
    FEATURES.ERC721,
    FEATURES.SAFE_APPS,
    FEATURES.SAFE_TX_GAS_OPTIONAL,
    FEATURES.SPENDING_LIMIT,
  ],
}
