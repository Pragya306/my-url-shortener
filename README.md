## About This Project
This is a custom-built URL Shortener application designed for efficiency and tracking.

### Key Features
- **Dynamic Routing**: Uses Next.js dynamic segments `[shortCode]` for seamless URL redirection.
- **Data Persistence**: Integrated with Supabase to store original URLs and unique short codes.
- **Analytics**: Built-in click tracking functionality that updates the database in real-time for every successful redirect.
- **TypeScript Integration**: Strong typing implementation for better code maintainability and reliability.

### How to Run Locally
1. Clone this repository.
2. Install dependencies: `npm install`
3. Set up your Supabase project and create a table named `urls` with columns: `id`, `original_url`, `short_code`, and `clicks`.
4. Create a `.env.local` file in the root directory with your Supabase credentials:
```env
   ## Setup Instructions
1. Create a `.env.local` file in the root directory.
2. Add your Supabase credentials to the file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key