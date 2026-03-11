Installation - Reown Docs
Skip to main content
Reown Docs
home page
Search...
⌘
K
Ask AI
Search...
Navigation
Fundamentals
Installation
AppKit
Advanced
Next
AppKit on NextJS
Contact Us
Report an Issue
Blog
Fundamentals
Installation
Hooks
Options
Components
Smart Accounts
Embedded Wallets Interactions (EIP-5792)
Custom connectors
Custom networks
Multichain
Theming
Resources
Authentication
Email & Socials
One-Click Auth (SIWE)
SIWX
Early Access
Chain Abstraction
Payments
Pay with Exchange
Deposit with Exchange
Transactions
On-Ramp
Swaps
Cloud
Relay
Blockchain API
Analytics
On this page
Installation
Custom Installation
Cloud Configuration
Implementation
Trigger the modal
Smart Contract Interaction
Extra configuration
Video Tutorial
Alternative Installation
Fundamentals
Installation
OpenAI
Open in ChatGPT
OpenAI
Open in ChatGPT
AppKit provides seamless integration with multiple blockchain ecosystems. It supports
Wagmi
and
Ethers v6
on Ethereum,
@solana/web3.js
on Solana, as well as Bitcoin, TON and other networks.
AppKit Core with
Universal Provider
library, enable compatibility across any blockchain protocol.
These steps are specific to
Next.js
app router. For other React frameworks
read the
React documentation
.
​
Installation
If you prefer referring to a video tutorial for this, please
click here
.
Setting up from scratch? Try out the
AppKit CLI templates
or the
AI-assisted setup
.
​
Custom Installation
Wagmi
Ethers v5
Ethers
Solana
Bitcoin
TON
Others networks (AppKit Core)
npm
Yarn
Bun
pnpm
Copy
Ask AI
npm
install
@reown/appkit
@reown/appkit-adapter-wagmi
wagmi
viem
@tanstack/react-query
npm
Yarn
Bun
pnpm
Copy
Ask AI
npm
install
@reown/appkit
@reown/appkit-adapter-ethers5
ethers@5.7.2
npm
Yarn
Bun
pnpm
Copy
Ask AI
npm
install
@reown/appkit
@reown/appkit-adapter-ethers
ethers
npm
Yarn
Bun
pnpm
Copy
Ask AI
npm
install
@reown/appkit
@reown/appkit-adapter-solana
npm
Yarn
Bun
pnpm
Copy
Ask AI
npm
install
@reown/appkit
@reown/appkit-adapter-bitcoin
npm
Yarn
Bun
pnpm
Copy
Ask AI
npm
install
@reown/appkit
@reown/appkit-adapter-ton
npm
Yarn
Bun
pnpm
Copy
Ask AI
npm
install
@reown/appkit
@reown/appkit-universal-connector
@reown/appkit-common
ethers
​
Cloud Configuration
Create a new project on
Reown Dashboard
and obtain a new project ID.
Don't have a project ID?
Head over to Reown Dashboard and create a new project.
​
Implementation
Wagmi
Ethers v5
Ethers
Solana
Bitcoin
TON
Others networks (AppKit Core)
wagmi Example
Check the Next wagmi example
For a quick integration, you can use the
createAppKit
function with a unified configuration. This automatically applies the predefined configurations for different adapters like Wagmi, Ethers, or Solana, so you no longer need to manually configure each one individually. Simply pass the common parameters such as projectId, chains, metadata, etc., and the function will handle the adapter-specific configurations under the hood.
This includes WalletConnect, Coinbase and Injected connectors, and the
Blockchain API
as a
transport
​
Wagmi config
Create a new file for your Wagmi configuration, since we are going to be calling this function on the client and the server it cannot live inside a file with the ‘use client’ directive.
For this example we will create a file called
config/index.tsx
outside our app directory and set up the following configuration
Copy
Ask AI
import
{
cookieStorage
,
createStorage
,
http
}
from
'@wagmi/core'
import
{
WagmiAdapter
}
from
'@reown/appkit-adapter-wagmi'
import
{
mainnet
,
arbitrum
}
from
'@reown/appkit/networks'
// Get projectId from https://dashboard.reown.com
export
const
projectId
=
process
.
env
.
NEXT_PUBLIC_PROJECT_ID
if
(
!
projectId
) {
throw
new
Error
(
'Project ID is not defined'
)
}
export
const
networks
=
[
mainnet
,
arbitrum
]
//Set up the Wagmi Adapter (Config)
export
const
wagmiAdapter
=
new
WagmiAdapter
({
storage:
createStorage
({
storage:
cookieStorage
}),
ssr:
true
,
projectId
,
networks
})
export
const
config
=
wagmiAdapter
.
wagmiConfig
​
Importing networks
Reown AppKit use
Viem
networks under the hood, which provide a wide variety of networks for EVM chains. You can find all the networks supported by Viem within the
@reown/appkit/networks
path.
Copy
Ask AI
import
{
createAppKit
}
from
'@reown/appkit'
import
{
mainnet
,
arbitrum
,
base
,
scroll
,
polygon
}
from
'@reown/appkit/networks'
Looking to add a custom network? Check out the
custom
networks
section.
​
SSR and Hydration
Using cookies is completely optional and by default Wagmi will use
localStorage
instead if the
storage
param is not defined.
The
ssr
flag will delay the hydration of Wagmi’s store to avoid hydration mismatch errors.
AppKit doesn’t fully support the
ssr
flag.
​
Context Provider
Let’s create now a context provider that will wrap our application and initialized AppKit (
createAppKit
needs to be called inside a Next Client Component file).
In this example we will create a file called
context/index.tsx
outside our app directory and set up the following configuration
Copy
Ask AI
'use client'
import
{
wagmiAdapter
,
projectId
}
from
'@/config'
import
{
QueryClient
,
QueryClientProvider
}
from
'@tanstack/react-query'
import
{
createAppKit
}
from
'@reown/appkit/react'
import
{
mainnet
,
arbitrum
}
from
'@reown/appkit/networks'
import
React
, {
type
ReactNode
}
from
'react'
import
{
cookieToInitialState
,
WagmiProvider
,
type
Config
}
from
'wagmi'
// Set up queryClient
const
queryClient
=
new
QueryClient
()
if
(
!
projectId
) {
throw
new
Error
(
'Project ID is not defined'
)
}
// Set up metadata
const
metadata
=
{
name:
'appkit-example'
,
description:
'AppKit Example'
,
url:
'https://appkitexampleapp.com'
,
// origin must match your domain & subdomain
icons:
[
'https://avatars.githubusercontent.com/u/179229932'
]
}
// Create the modal
const
modal
=
createAppKit
({
adapters:
[
wagmiAdapter
],
projectId
,
networks:
[
mainnet
,
arbitrum
],
defaultNetwork:
mainnet
,
metadata:
metadata
,
features:
{
analytics:
true
// Optional - defaults to your Cloud configuration
}
})
function
ContextProvider
({
children
,
cookies
}
:
{
children
:
ReactNode
;
cookies
:
string
|
null
}) {
const
initialState
=
cookieToInitialState
(
wagmiAdapter
.
wagmiConfig
as
Config
,
cookies
)
return
(
<
WagmiProvider
config
=
{
wagmiAdapter
.
wagmiConfig
as
Config
}
initialState
=
{
initialState
}
>
<
QueryClientProvider
client
=
{
queryClient
}
>
{
children
}
</
QueryClientProvider
>
</
WagmiProvider
>
)
}
export
default
ContextProvider
​
Layout
Next, in our
app/layout.tsx
file, we will import our
ContextProvider
component and call
the Wagmi’s function
cookieToInitialState
.
The
initialState
returned by
cookieToInitialState
, contains the optimistic values that will populate the Wagmi’s store both on the server and client.
Copy
Ask AI
import
type
{
Metadata
}
from
'next'
import
{
Inter
}
from
'next/font/google'
import
'./globals.css'
const
inter
=
Inter
({
subsets:
[
'latin'
] })
import
{
headers
}
from
'next/headers'
// added
import
ContextProvider
from
'@/context'
export
const
metadata
:
Metadata
=
{
title:
'AppKit Example App'
,
description:
'Powered by Reown'
}
export
default
async
function
RootLayout
({
children
}
:
Readonly
<{
children
:
React
.
ReactNode
}>)
{
const
headersObj
=
await
headers
()
const
cookies
=
headersObj
.
get
(
'cookie'
)
return
(
<
html
lang
=
"en"
>
<
body
className
=
{
inter
.
className
}
>
<
ContextProvider
cookies
=
{
cookies
}
>
{
children
}
</
ContextProvider
>
</
body
>
</
html
>
)
}
In this example we will create a new file called
context/appkit.tsx
outside our app directory and set up the following configuration
Copy
Ask AI
"use client"
;
import
{
createAppKit
}
from
"@reown/appkit/react"
;
import
{
Ethers5Adapter
}
from
"@reown/appkit-adapter-ethers5"
;
import
{
mainnet
,
arbitrum
}
from
"@reown/appkit/networks"
;
// 1. Get projectId at https://dashboard.reown.com
const
projectId
=
"YOUR_PROJECT_ID"
;
// 2. Create a metadata object
const
metadata
=
{
name:
"My Website"
,
description:
"My Website description"
,
url:
"https://mywebsite.com"
,
// origin must match your domain & subdomain
icons:
[
"https://avatars.mywebsite.com/"
],
};
// 3. Create the AppKit instance
createAppKit
({
adapters:
[
new
Ethers5Adapter
()],
metadata:
metadata
,
networks:
[
mainnet
,
arbitrum
],
projectId
,
features:
{
analytics:
true
,
// Optional - defaults to your Cloud configuration
},
});
export
function
AppKit
() {
return
(
<
YourApp
/>
//make sure you have configured the <appkit-button> inside
);
}
Next, in your
app/layout.tsx
or
app/layout.jsx
file, import the custom AppKit component.
Copy
Ask AI
import
"./globals.css"
;
import
{
AppKit
}
from
"../context/appkit"
;
export
const
metadata
=
{
title:
"AppKit"
,
description:
"AppKit Example"
,
};
export
default
function
RootLayout
({
children
})
{
return
(
<
html
lang
=
"en"
>
<
body
>
<
AppKit
>
{
children
}
</
AppKit
>
</
body
>
</
html
>
);
}
Make sure that the
url
from the
metadata
matches your domain and subdomain. This will later be used by the
Verify API
to tell wallets if your application has been verified or not.
ethers Example
Check the Next ethers example
In this example we will create a new file called
context/appkit.tsx
outside our app directory and set up the following configuration
Copy
Ask AI
"use client"
;
import
{
createAppKit
}
from
"@reown/appkit/react"
;
import
{
EthersAdapter
}
from
"@reown/appkit-adapter-ethers"
;
import
{
mainnet
,
arbitrum
}
from
"@reown/appkit/networks"
;
// 1. Get projectId at https://dashboard.reown.com
const
projectId
=
"YOUR_PROJECT_ID"
;
// 2. Create a metadata object
const
metadata
=
{
name:
"My Website"
,
description:
"My Website description"
,
url:
"https://mywebsite.com"
,
// origin must match your domain & subdomain
icons:
[
"https://avatars.mywebsite.com/"
],
};
// 3. Create the AppKit instance
createAppKit
({
adapters:
[
new
EthersAdapter
()],
metadata
,
networks:
[
mainnet
,
arbitrum
],
projectId
,
features:
{
analytics:
true
,
// Optional - defaults to your Cloud configuration
},
});
export
function
AppKit
() {
return
(
<
YourApp
/>
//make sure you have configured the <appkit-button> inside
);
}
Next, in your
app/layout.tsx
or
app/layout.jsx
file, import the custom AppKit component.
Copy
Ask AI
import
"./globals.css"
;
import
{
AppKit
}
from
"../context/appkit"
;
export
const
metadata
=
{
title:
"AppKit"
,
description:
"AppKit Example"
,
};
export
default
function
RootLayout
({
children
})
{
return
(
<
html
lang
=
"en"
>
<
body
>
<
AppKit
>
{
children
}
</
AppKit
>
</
body
>
</
html
>
);
}
Make sure that the
url
from the
metadata
matches your domain and subdomain. This will later be used by the
Verify API
to tell wallets if your application has been verified or not.
MetaMask does not currently support WalletConnect connections on Solana. The MetaMask team is working on adding this feature. In the meantime, we recommend using other wallets that support Solana. You can find the complete list of supported wallets on
WalletGuide
.
Solana Example
Check the Next Solana example
AppKit Solana provides a set of React components and hooks to easily connect Solana wallets with your application.
On top of your app set up the following configuration, making sure that all functions are called outside any React component to avoid unwanted rerenders.
Copy
Ask AI
// App.tsx
import
{
createAppKit
}
from
"@reown/appkit/react"
;
import
{
SolanaAdapter
}
from
"@reown/appkit-adapter-solana/react"
;
import
{
solana
,
solanaTestnet
,
solanaDevnet
}
from
"@reown/appkit/networks"
;
// 0. Set up Solana Adapter
const
solanaWeb3JsAdapter
=
new
SolanaAdapter
();
// 1. Get projectId from https://dashboard.reown.com
const
projectId
=
"YOUR_PROJECT_ID"
;
// 2. Create a metadata object - optional
const
metadata
=
{
name:
"AppKit"
,
description:
"AppKit Solana Example"
,
url:
"https://example.com"
,
// origin must match your domain & subdomain
icons:
[
"https://avatars.githubusercontent.com/u/179229932"
],
};
// 3. Create modal
createAppKit
({
adapters:
[
solanaWeb3JsAdapter
],
networks:
[
solana
,
solanaTestnet
,
solanaDevnet
],
metadata:
metadata
,
projectId
,
features:
{
analytics:
true
,
// Optional - defaults to your Cloud configuration
},
});
export
default
function
App
()
{
return
<
YourApp
/>
;
}
Bitcoin Example
Check the Next Bitcoin example
AppKit Bitcoin provides a set of React components and hooks to easily connect Bitcoin wallets with your application.
On top of your app set up the following configuration, making sure that all functions are called outside any React component to avoid unwanted rerenders.
Copy
Ask AI
// App.tsx
import
{
createAppKit
}
from
'@reown/appkit/react'
import
{
BitcoinAdapter
}
from
'@reown/appkit-adapter-bitcoin'
import
{
bitcoin
,
bitcoinTestnet
,
bitcoinSignet
}
from
'@reown/appkit/networks'
// 1. Get projectId from https://dashboard.reown.com
const
projectId
=
'YOUR_PROJECT_ID'
// 2. Set the networks
const
networks
=
[
bitcoin
,
bitcoinTestnet
,
bitcoinSignet
]
// 3. Set up Bitcoin Adapter
const
bitcoinAdapter
=
new
BitcoinAdapter
({
projectId
})
// 4. Create a metadata object - optional
const
metadata
=
{
name:
'AppKit'
,
description:
'AppKit Bitcoin Example'
,
url:
'https://example.com'
,
// origin must match your domain & subdomain
icons:
[
'https://avatars.githubusercontent.com/u/179229932'
]
}
// 5. Create modal
createAppKit
({
adapters:
[
bitcoinAdapter
],
networks
,
metadata
,
projectId
,
features:
{
analytics:
true
// Optional - defaults to your Cloud configuration,
email
:
false
,
socials:
[]
}
})
export
default
function
App
()
{
return
<
YourApp
/>
}
​
Bitcoin Provider Interface
Copy
Ask AI
export
interface
BitcoinConnector
extends
ChainAdapterConnector
,
Provider
{
getAccountAddresses
()
:
Promise
<
BitcoinConnector
.
AccountAddress
[]>;
signMessage
(
params
:
BitcoinConnector
.
SignMessageParams
)
:
Promise
<
string
>;
sendTransfer
(
params
:
BitcoinConnector
.
SendTransferParams
)
:
Promise
<
string
>;
signPSBT
(
params
:
BitcoinConnector
.
SignPSBTParams
)
:
Promise
<
BitcoinConnector
.
SignPSBTResponse
>;
}
​
Parameters
SignMessageParams
SendTransferParams
SignPSBTParams
Copy
Ask AI
export
type
SignMessageParams
=
{
/**
* The message to be signed
*/
message
:
string
/**
* The address to sign the message with
*/
address
:
string
}
Copy
Ask AI
export
type
SendTransferParams
=
{
/**
* The amount to be sent in satoshis
*/
amount
:
string
/**
* The address to send the transfer to
*/
recipient
:
string
}
Copy
Ask AI
export
type
SignPSBTParams
=
{
/**
* The PSBT to be signed, string base64 encoded
*/
psbt
:
string
signInputs
:
{
/**
* The address whose private key to use for signing.
*/
address
:
string
/**
* Specifies which input to sign
*/
index
:
number
/**
* Specifies which part(s) of the transaction the signature commits to
*/
sighashTypes
:
number
[]
}[]
/**
* If `true`, the PSBT will be broadcasted after signing. Default is `false`.
*/
broadcast
?:
boolean
}
​
Responses
AccountAddress
SignPSBTResponse
Copy
Ask AI
export
type
AccountAddress
=
{
/**
* Public address belonging to the account.
*/
address
:
string
/**
* Public key for the derivation path in hex, without 0x prefix
*/
publicKey
?:
string
/**
* The derivation path of the address e.g. "m/84'/0'/0'/0/0"
*/
path
?:
string
/**
* The purpose of the address
*/
purpose
:
'payment'
|
'ordinal'
|
'stx'
}
Copy
Ask AI
export
type
SignPSBTResponse
=
{
/**
* The signed PSBT, string base64 encoded
*/
psbt
:
string
/**
* The `string` transaction id of the broadcasted transaction or `undefined` if not broadcasted
*/
txid
?:
string
}
TON Example
Check the Next TON example
AppKit TON provides a set of React components and hooks to easily connect TON wallets with your application.
On top of your app set up the following configuration, making sure that all functions are called outside any React component to avoid unwanted rerenders.
Copy
Ask AI
// App.tsx
import
{
createAppKit
}
from
'@reown/appkit/react'
import
{
TonAdapter
}
from
'@reown/appkit-adapter-ton'
import
{
ton
,
tonTestnet
}
from
'@reown/appkit/networks'
// 1. Get projectId from https://dashboard.reown.com
const
projectId
=
'YOUR_PROJECT_ID'
// 2. Set the networks
const
networks
=
[
ton
,
tonTestnet
]
// 3. Set up TON Adapter
const
tonAdapter
=
new
TonAdapter
({
projectId
})
// 4. Create a metadata object - optional
const
metadata
=
{
name:
'AppKit'
,
description:
'AppKit TON Example'
,
url:
'https://example.com'
,
// origin must match your domain & subdomain
icons:
[
'https://avatars.githubusercontent.com/u/179229932'
]
}
// 5. Create modal
createAppKit
({
adapters:
[
tonAdapter
],
networks
,
metadata
,
projectId
,
features:
{
analytics:
true
// Optional - defaults to your Cloud configuration,
email
:
false
,
socials:
[]
}
})
export
default
function
App
()
{
return
<
YourApp
/>
}
For a quick integration of Appkit Core you can use the
UniversalConnector
class. Which simplifies the integration of Appkit Core by providing a single interface for all the blockchain protocols.
You can configure the Universal Connector with the networks you want to support.
For more information, please visit
RPC Reference
section from our docs.
We recommend creating a config file to establish a singleton instance for the Universal Connector:
Copy
Ask AI
import
type
{
AppKitNetwork
}
from
'@reown/appkit/networks'
import
type
{
CustomCaipNetwork
}
from
'@reown/appkit-common'
import
{
UniversalConnector
}
from
'@reown/appkit-universal-connector'
// Get projectId from https://dashboard.reown.com
export
const
projectId
=
import
.
meta
.
env
.
VITE_PROJECT_ID
||
"b56e18d47c72ab683b10814fe9495694"
// this is a public projectId only to use on localhost
if
(
!
projectId
) {
throw
new
Error
(
'Project ID is not defined'
)
}
// you can configure your own network
const
suiMainnet
:
CustomCaipNetwork
<
'sui'
>
=
{
id:
784
,
chainNamespace:
'sui'
as
const
,
caipNetworkId:
'sui:mainnet'
,
name:
'Sui'
,
nativeCurrency:
{
name:
'SUI'
,
symbol:
'SUI'
,
decimals:
9
},
rpcUrls:
{
default:
{
http:
[
'https://fullnode.mainnet.sui.io:443'
] } }
}
export
async
function
getUniversalConnector
() {
const
universalConnector
=
await
UniversalConnector
.
init
({
projectId
,
metadata:
{
name:
'Universal Connector'
,
description:
'Universal Connector'
,
url:
'https://appkit.reown.com'
,
icons:
[
'https://appkit.reown.com/icon.png'
]
},
networks:
[
{
methods:
[
'sui_signPersonalMessage'
],
chains:
[
suiMainnet
as
CustomCaipNetwork
],
events:
[],
namespace:
'sui'
}
]
})
return
universalConnector
}
In de App.tsx file you can add :
Copy
Ask AI
import
{
useState
,
useEffect
}
from
'react'
import
{
getUniversalConnector
}
from
'./config'
// previous config file
import
{
UniversalConnector
}
from
'@reown/appkit-universal-connector'
export
function
App
() {
const
[
universalConnector
,
setUniversalConnector
]
=
useState
<
UniversalConnector
>()
const
[
session
,
setSession
]
=
useState
<
any
>()
// Initialize the Universal Connector on component mount
useEffect
(()
=>
{
getUniversalConnector
().
then
(
setUniversalConnector
)
}, [])
// Set the session state in case it changes
useEffect
(()
=>
{
setSession
(
universalConnector
?.
provider
.
session
)
}, [
universalConnector
?.
provider
.
session
])
​
Trigger the modal
AppKit
AppKit Core
To open AppKit you can use our
React components
or build your own button with AppKit
hooks
.
ConnectButton.tsx
ConnectButtonWithHooks.tsx
Copy
Ask AI
import
{
AppKitButton
}
from
'@reown/appkit/react'
export
default
function
ConnectButton
()
{
return
<
AppKitButton
/>
}
To open AppKit Core you need to call the
connect
function from the Universal Connector.
Copy
Ask AI
// get the session from the universal connector
const
handleConnect
=
async
()
=>
{
if
(
!
universalConnector
) {
return
}
const
{
session
:
providerSession
}
=
await
universalConnector
.
connect
()
setSession
(
providerSession
)
}
// disconnect the universal connector
const
handleDisconnect
=
async
()
=>
{
if
(
!
universalConnector
) {
return
}
await
universalConnector
.
disconnect
()
setSession
(
null
)
}
...
return
(
<
div
>
<
button
onClick
=
{
handleConnect
}
>
Open AppKit Core
</
button
>
<
button
onClick
=
{
handleDisconnect
}
>
Disconnect
</
button
>
</
div
>
)
​
Smart Contract Interaction
Wagmi
Ethers
Solana
Wagmi hooks
can help us interact with wallets and smart contracts:
Copy
Ask AI
import
{
useReadContract
}
from
'wagmi'
import
{
USDTAbi
}
from
'../abi/USDTAbi'
const
USDTAddress
=
'0x...'
function
App
() {
const
result
=
useReadContract
({
abi:
USDTAbi
,
address:
USDTAddress
,
functionName:
'totalSupply'
})
}
Read more about Wagmi hooks for smart contract interaction
here
.
Ethers
can help us interact with wallets and smart contracts:
Copy
Ask AI
import
{
useAppKitProvider
,
useAppKitAccount
}
from
'@reown/appkit/react'
import
{
BrowserProvider
,
Contract
,
formatUnits
}
from
'ethers'
const
USDTAddress
=
'0x617f3112bf5397D0467D315cC709EF968D9ba546'
// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const
USDTAbi
=
[
'function name() view returns (string)'
,
'function symbol() view returns (string)'
,
'function balanceOf(address) view returns (uint)'
,
'function transfer(address to, uint amount)'
,
'event Transfer(address indexed from, address indexed to, uint amount)'
]
function
Components
() {
const
{
address
,
caipAddress
,
isConnected
}
=
useAppKitAccount
()
const
{
walletProvider
}
=
useAppKitProvider
(
'eip155'
)
async
function
getBalance
() {
if
(
!
isConnected
)
throw
Error
(
'User disconnected'
)
const
ethersProvider
=
new
BrowserProvider
(
walletProvider
)
const
signer
=
await
ethersProvider
.
getSigner
()
// The Contract object
const
USDTContract
=
new
Contract
(
USDTAddress
,
USDTAbi
,
signer
)
const
USDTBalance
=
await
USDTContract
.
balanceOf
(
address
)
console
.
log
(
formatUnits
(
USDTBalance
,
18
))
}
return
<
button
onClick
=
{
getBalance
}
>
Get User Balance
</
button
>
}
@Solana/web3.js
library allows for seamless interaction with wallets and smart contracts on the Solana blockchain.
For a practical example of how it works, you can refer to our
lab dApp
.
Copy
Ask AI
import
{
SystemProgram
,
PublicKey
,
Keypair
,
Transaction
,
TransactionInstruction
,
LAMPORTS_PER_SOL
}
from
'@solana/web3.js'
import
{
useAppKitAccount
,
useAppKitProvider
}
from
'@reown/appkit/react'
import
{
useAppKitConnection
,
type
Provider
}
from
'@reown/appkit-adapter-solana/react'
function
deserializeCounterAccount
(
data
?:
Buffer
)
:
{
count
:
number
} {
if
(
data
?.
byteLength
!==
8
) {
throw
Error
(
'Need exactly 8 bytes to deserialize counter'
)
}
return
{
count:
Number
(
data
[
0
])
}
}
const
{
address
}
=
useAppKitAccount
()
const
{
connection
}
=
useAppKitConnection
()
const
{
walletProvider
}
=
useAppKitProvider
<
Provider
>(
'solana'
)
async
function
onIncrementCounter
() {
const
PROGRAM_ID
=
new
PublicKey
(
'Cb5aXEgXptKqHHWLifvXu5BeAuVLjojQ5ypq6CfQj1hy'
)
const
counterKeypair
=
Keypair
.
generate
()
const
counter
=
counterKeypair
.
publicKey
const
balance
=
await
connection
.
getBalance
(
walletProvider
.
publicKey
)
if
(
balance
<
LAMPORTS_PER_SOL
/
100
) {
throw
Error
(
'Not enough SOL in wallet'
)
}
const
COUNTER_ACCOUNT_SIZE
=
8
const
allocIx
:
TransactionInstruction
=
SystemProgram
.
createAccount
({
fromPubkey:
walletProvider
.
publicKey
,
newAccountPubkey:
counter
,
lamports:
await
connection
.
getMinimumBalanceForRentExemption
(
COUNTER_ACCOUNT_SIZE
),
space:
COUNTER_ACCOUNT_SIZE
,
programId:
PROGRAM_ID
})
const
incrementIx
:
TransactionInstruction
=
new
TransactionInstruction
({
programId:
PROGRAM_ID
,
keys:
[
{
pubkey:
counter
,
isSigner:
false
,
isWritable:
true
}
],
data:
Buffer
.
from
([
0x0
])
})
const
tx
=
new
Transaction
().
add
(
allocIx
).
add
(
incrementIx
)
tx
.
feePayer
=
walletProvider
.
publicKey
tx
.
recentBlockhash
=
(
await
connection
.
getLatestBlockhash
(
'confirmed'
)).
blockhash
await
walletProvider
.
signAndSendTransaction
(
tx
, [
counterKeypair
])
const
counterAccountInfo
=
await
connection
.
getAccountInfo
(
counter
, {
commitment:
'confirmed'
})
if
(
!
counterAccountInfo
) {
throw
new
Error
(
'Expected counter account to have been created'
)
}
const
counterAccount
=
deserializeCounterAccount
(
counterAccountInfo
?.
data
)
if
(
counterAccount
.
count
!==
1
) {
throw
new
Error
(
'Expected count to have been 1'
)
}
console
.
log
(
`[alloc+increment] count is:
${
counterAccount
.
count
}
`
);
}
​
Extra configuration
Next.js relies on
SSR
. This means some specific steps are required to make AppKit work properly.
Add the following code in the
next.config.js
file
Copy
Ask AI
// Path: next.config.js
const
nextConfig
=
{
webpack
:
config
=>
{
config
.
externals
.
push
(
'pino-pretty'
,
'lokijs'
,
'encoding'
)
return
config
}
}
Learn more about SSR with Wagmi
​
Video Tutorial
​
Alternative Installation
If you are starting from scratch, you can use the following methods to set up your project with Reown AppKit.
Set up Reown AppKit using AI
If you’re using Cursor IDE (or another AI based IDE) to build a project with Reown AppKit, Reown provides a
.mdc
file that enhances your development experience. The
reown-appkit.mdc
file here
contains Cursor-specific rules and type hints for Reown AppKit.
To use it in your project:
Copy the
reown-appkit.mdc
file from this repository
Create a
.cursor/rules
folder in your project’s root directory (if it doesn’t exist)
Place the
.mdc
file in your project’s
.cursor/rules
folder
For more info, refer to
Cursor’s documentation
.
AppKit CLI
Reown offers a dedicated CLI to set up a minimal version of AppKit in the easiest and quickest way possible.
To do this, please run the command below.
Copy
Ask AI
npx
@reown/appkit-cli
After running the command, you will be prompted to confirm the installation of the CLI. Upon your confirmation, the CLI will request the following details:
Project Name
: Enter the name for your project.
Framework
: Select your preferred framework or library. Currently, you have three options: React, Next.js, and Vue.
Network-Specific libraries
: Choose whether you want to install Wagmi, Ethers, Solana, or Multichain (EVM + Solana).
After providing the project name and selecting your preferences, the CLI will install a minimal example of AppKit with your preferred blockchain library. The example will be pre-configured with a
projectId
that will only work on
localhost
.
To fully configure your project, please obtain a
projectId
from the Reown Dashboard and update your project accordingly.
Refer to
this section
for more information.
Was this page helpful?
Yes
No
Hooks
Next
⌘
I
website
x
discord
linkedin
github
youtube
Powered by
Assistant
Responses are generated using AI and may contain mistakes.
