# MBetterTI Flow - Growth Challenge Platform

A Web3-based platform for personal growth challenges and peer evaluations.

## Features

- Create and manage growth challenges
- Submit challenge completions with tweet proofs
- Peer rating system
- Web3 integration with Telos EVM Testnet
- Role-based access control

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Ethers.js
- ThirdWeb
- Smart Contracts (Solidity)

## Smart Contracts

The platform uses the following smart contracts:

- GrowthPlatformSimple: Main contract for challenge management and submissions
- Location: `contracts/GrowthPlatformSimple.sol`
- Deployed at: `0x0ecD0d3c30d4523EB5804C65bb774A194d909b22` (Telos Testnet)

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask or compatible Web3 wallet
- Telos Testnet TLOS tokens

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mbetteti-flow.git
cd mbetteti-flow
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add your configuration:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0ecD0d3c30d4523EB5804C65bb774A194d909b22
```

4. Run the development server:
```bash
npm run dev
```

### Network Configuration

The platform is configured to use the Telos EVM Testnet:
- Network Name: Telos EVM Testnet
- RPC URL: https://testnet.telos.net/evm
- Chain ID: 41
- Currency Symbol: TLOS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
