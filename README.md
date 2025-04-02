# Muzer

Muzer is a collaborative music streaming platform that allows users to add songs from YouTube and Spotify to a shared queue and control the playback order. Built using Next.js, Muzer provides an interactive and seamless music experience.

## Features

- 🎵 **Add Songs from YouTube & Spotify**: Users can search and add songs from YouTube and Spotify to a shared queue.
- ⏭️ **Queue Management**: Control the order of playback, remove songs, and reorder tracks.
- 🏎️ **Real-time Updates**: Syncs playback across multiple users in real-time.
- 🎨 **Modern UI**: Built with Next.js and Tailwind CSS for a smooth and responsive interface.
- 🔊 **Seamless Playback**: Ensures smooth transitions and uninterrupted music playback.

## Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS
- **Backend**: Node.js, Express
- **Streaming APIs**: YouTube API, Spotify API
- **Database**: Firebase / Supabase (TBD)
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js (>= 16)
- npm or yarn
- YouTube API Key
- Spotify Developer Credentials

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/muzer.git
   cd muzer
   ```

2. Install dependencies:
   ```sh
   npm install  
   # or
   yarn install
   ```

3. Create a `.env.local` file and add the required API keys:
   ```env
   NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
   NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

4. Start the development server:
   ```sh
   npm run dev  
   # or
   yarn dev
   ```

5. Open `http://localhost:3000` in your browser.

## Deployment

Muzer is deployed on **Vercel**. To deploy your own version:

1. Push your code to GitHub.
2. Connect the repository to Vercel.
3. Set environment variables in Vercel settings.
4. Deploy and enjoy!

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit.
4. Push to your branch and submit a PR.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries or suggestions, reach out to me:
- **Twitter**: [@whatever_ankit](https://x.com/whatever_ankit)
- **LinkedIn**: [Ankit Dhadiwal](https://www.linkedin.com/in/ankit-dhadiwal-8352a1229/)
- **GitHub**: [ankitdhadiwal](https://github.com/ankitdhadiwal)

Happy Streaming! 🎶

