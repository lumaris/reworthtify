const { spotify } = require("../../services");


const getAlbumsFromArtist = async (req, res, next) => {
  try {
    const { name } = req.query;
    const artistsAlbums = await spotify.getAlbumsFromArtist(name);
    res.status(200).json({ result: artistsAlbums });
  } catch (error) {
    next(error);
  }
}

const getCurrentUserInfo = async (req, res, next) => {
  try {
    const userInfo = await spotify.getUserInfo();
    res.status(200).json({ result: userInfo });
  } catch (error) {
    next(error);
  }
} 

const getTopTracks = async (req, res, next) => {
  try {
    const { id } = req.query;
    const topTracks = await spotify.getTopTrackArtist(id);
    res.status(200).json({ result: topTracks });
  } catch (error) {
    next(error);
  }
}

const getTopFiters = async (req, res, next) => {
  try {
    const topFilters = await spotify.getTopFilters();
    res.status(200).json({ result: topFilters });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAlbumsFromArtist,
  getCurrentUserInfo,
  getTopTracks,
  getTopFiters,
};
