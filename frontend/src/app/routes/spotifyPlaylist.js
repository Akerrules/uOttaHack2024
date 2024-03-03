import Head from 'next/head';

const SpotifyPlaylist = () => {
  return (
    <>
      <Head>
        {/* Add any other head elements here */}
        <title>Spotify Playlist</title>
      </Head>
      <div className="spotify-playlist-container">
        <iframe
          style={{ borderRadius: '12px' , marginLeft:'0.5rem'}}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DWXT8uSSn6PRy?utm_source=generator&theme=0"
          width="380"
          height="500"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
};

export default SpotifyPlaylist;
