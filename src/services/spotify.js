const axios = require('axios');
const config = require('../config');
const qs = require('qs');
const _ = require('lodash');
const Filters = require('../models/filters');
const Tokens = require('../models/token');

const getAuthToken = async () => {
  //the token is saved until its expiration, then it is updated.
  const token = await Tokens.findOne({
    expire: { $gt: new Date() },
    type: 'credentials'
  }).exec();
  if (token) {
    return token.token;
  } else {
    const url = `${config.spotifyAuthUrl}/api/token`;
    const headers = {
      Authorization: 'Basic ' + (Buffer.from(config.clientId + ':' + config.clienteSecret).toString('base64')),
      grant_type: 'client_credentials',
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    const body = qs.stringify({
      'grant_type': 'client_credentials'
    });
    try {
      const token = await axios.post(url, body, { headers })
      const date = new Date();
      const update = {
        expire: new Date(date.getTime() + (token.data.expires_in * 1000)),
        token: token.data.access_token
      };
      const pepe = await Tokens.updateOne({ type: 'credentials' }, update, { upsert: true }).exec();
      return token.data.access_token;
    } catch (error) {
      throw new Error(error);
    }
  }

}

const getAlbumsFromArtist = async (name) => {
  const token = await getAuthToken();
  const url = `${config.spotifyApiUrl}/v1/search`;
  const params = {
    type: 'album',
    q: `artist:${name}`
  }
  const headers = {
    Authorization: `Bearer ${token}`
  }
  try {
    const albumsResponse = await axios.get(url, { params, headers })
    const albums = albumsResponse.data.albums.items
    const result = _.map(albums, (album) => {
      return {
        name: album.name,
        release_date: album.release_date,
        total_tracks: album.total_tracks
      };
    })
    return result;
  } catch (error) {
    throw new Error(error);
  }

}
// incomplete function
const getUserInfo = async () => {
  const token = await getAuthToken();
  try {
    const url = `${config.spotifyApiUrl}/v1/me`;
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const { data } = await axios.get(url, { headers })
    return data;
  } catch (error) {
    throw new Error(error);
  }

}

const getTopTrackArtist = async (artistId) => {
  const token = await getAuthToken();
  const id = artistId || '0TnOYISbd1XYRBk9myaseg';
  const url = `${config.spotifyApiUrl}/v1/artists/${id}/top-tracks?market=ES`;
  const headers = {
    Authorization: `Bearer ${token}`
  }
    const albumsResponse = await axios.get(url, { headers })
    const tracks = albumsResponse.data.tracks;
    const result = _.map(tracks, (track) => {
      const artistName = track.artists.find((artist) => {
        return artist.id === id
      })
      return {
        artist_name: artistName.name,
        track_name: track.name,
        release_date: track.album.release_date,
        total_tracks: track.album.total_tracks
      };
    })
    return result;

}

// Get the value of the most searched filters
const getTopFilters = async () => {
  const data = await Filters.aggregate([
    { $sort: { search_num: -1 } },
    { $limit: 5 }
  ]).exec();
  return data;
}

module.exports = {
  getAlbumsFromArtist,
  getUserInfo,
  getTopTrackArtist,
  getTopFilters,
};
