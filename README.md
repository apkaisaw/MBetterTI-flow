# MBetterTI

**MBetterTI** is a personalized growth platform that combines MBTI testing, AI Life Coach, and Web3 technologies. By providing customized growth paths for different MBTI personality types, it helps users achieve personal growth and self-improvement. The core goal of the platform is to support users' growth through challenges and on-chain records, while leveraging NFT and DAO technologies to stimulate community interaction and personalized development.

## Key Features

### 1. **Personalized AI Life Coach**
Based on the user's MBTI test results, the platform provides precise growth path suggestions and personalized plans. The AI Life Coach offers practical guidance and helps users adjust and improve during their growth journey.

### 2. **On-Chain Growth Records**
Users can store their growth records permanently on the blockchain after completing challenges, generating achievement badges as NFTs. These records serve as a testament to personal growth and can be showcased within the community.

### 3. **Growth Peer Review Community**
The peer review community allows users to confirm each other's challenge completion, increasing the authenticity of growth and fostering community interaction. It helps users support and encourage one another on their growth journey.

### 4. **Growth Profile Marketplace**
Advanced users can share or sell their growth profiles. New users can purchase or exchange profiles to generate an AI Life Coach, accelerating their personal growth.

## User Journey

1. **Homepage Introduction**
   - Users can learn about the platform's core features and offerings via the homepage.

2. **Immersive MBTI Test**
   - An in-depth MBTI test that helps users accurately understand their personality type.

3. **Dashboard**
   - After registering and logging in, users can access their personal dashboard, showcasing their test results, growth records, AI Life Coach, challenge section, peer review community, and profile marketplace.

## Tech Stack

### Frontend
- Next.js 14
- TailwindCSS
- TypeScript

### Backend & Database
- Firebase

### Blockchain & Web3
- Solidity
- Thirdweb
- Pinata (IPFS)

### AI Integration
- Gemini API
- Dify

## Installation & Running

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/MBetterTI.git
cd MBetterTI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env.local
```

Configure the following environment variables in `.env.local`:
- `NEXT_PUBLIC_FIREBASE_CONFIG` - Firebase configuration
- `NEXT_PUBLIC_WALLET_CONNECT` - WalletConnect configuration
- `AI_API_KEY` - AI service API key

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Deploy to Production
You can deploy the application to production using Vercel or a custom deployment method.

## Contributing

We welcome contributions to **MBetterTI**! Here's how you can get started:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## Contact

For any questions or suggestions, feel free to reach out to me:

- Email: kguodev@gmail.com

## License

MIT © [Keith Guo]
