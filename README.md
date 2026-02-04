# Times of World

[https://timesofworld.vercel.app/](https://timesofworld.vercel.app/)

Times of World is an AI-powered news aggregator that cuts through the noise to deliver fast, fair, and focused news briefings. By leveraging OpenAI for intelligent curation and summarization, it provides users with personalized daily digests directly to their inbox, ensuring they stay informed on what matters most without the clutter.

## Features

- **AI-Curated Content**: Advanced algorithms select and summarize the most relevant stories from trusted global sources.
- **Personalized Feed**: Content tailored to user-selected topics and reading preferences.
- **Daily Briefings**: Automated, concise news digests delivered via email.
- **Real-Time Updates**: Integration with NewsAPI ensures access to the latest breaking news.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion
- **Services**: Supabase (Auth & Database), Inngest (Background Jobs), EmailJS
- **AI & Data**: OpenAI API, NewsAPI
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/times-of-world.git
   cd times-of-world
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following keys:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key
   # OPEAI_BASE_URL= (Optional)

   # NewsAPI
   NEWS_API_KEY=your_newsapi_key

   # EmailJS
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_PUBLIC_KEY=your_public_key
   EMAILJS_PRIVATE_KEY=your_private_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
