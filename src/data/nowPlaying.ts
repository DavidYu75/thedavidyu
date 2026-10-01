/**
 * The song behind the headphones on the home page. To change it, paste a new Spotify
 * track link: the id is the part after /track/ and before any "?".
 */
export const NOW_PLAYING = {
  spotifyId: '19m23w2ANVhtB7rApM6pbN',
  title: 'Back To U',
  artist: 'SLANDER, William Black',
};

export const spotifyTrackUrl = (id: string) => `https://open.spotify.com/track/${id}`;
