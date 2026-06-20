# MovieFinder

A premium movie discovery application built with Next.js 15, Tailwind CSS, and the TMDB API.

## Features

- **Browse Popular Movies**: View exactly 12 popular movies per page in a responsive grid.
- **Debounced Search**: Instantly search for movies. Updates results smoothly while you type (300ms debounce).
- **Movie Details**: View in-depth information including a large backdrop poster, genres, runtime, language, and overview.
- **Favorites System**: Save your favorite movies. Persists across page reloads using `localStorage`.
- **Premium UI**: Dark theme, glassmorphism cards, and Framer Motion hover animations inspired by Netflix and Apple TV.
- **Manual Pagination**: Strict manual Previous/Next pagination without infinite scrolling.

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rahull2509/movie-finder-rahul.git
   cd movie-finder-rahul
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env` file in the root directory and add your TMDB API keys:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN=your_read_access_token_here
```

You can find a template in `.env.example`.

## Screenshots

*(Add screenshots of your application here)*
- Homepage Grid
- Search Results
- Movie Details Page
- Favorites Page

## Deployment Instructions (Vercel)

The easiest way to deploy this Next.js app is to use the Vercel Platform.

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New** > **Project**.
3. Import your GitHub repository.
4. Expand **Environment Variables** and add:
   - `NEXT_PUBLIC_TMDB_API_KEY`
   - `NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN`
5. Click **Deploy**. Vercel will automatically build and deploy your application.
