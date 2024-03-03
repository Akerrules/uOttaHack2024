import React from 'react';

const SpotifyEmbed = () => {
    return (
        <div>
            {/* Paste the provided Spotify iframe code here */}
            <iframe style={{ borderRadius: '12px', marginLeft:'10px' }} src="https://open.spotify.com/embed/track/1qsHYUd2c1wFGcn7e63QmG?utm_source=generator" width="500" height="200" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
    );
};

export default SpotifyEmbed;
