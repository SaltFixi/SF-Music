import { $get, $post } from 'utils/request';

// 获取轮播
export const getBanner = () => $get('/banner?type=1')
// 获取推荐歌单
export const getRecomList = () => $get('/personalized?limit=10')
// 获取歌单详情
export const getPlayList = (id) => $get('/playlist/detail', { id })
// 获取歌单所有歌曲
export const getPlayListTrack = (data) => $get('/playlist/track/all?offset=1', { id: data.id, limit: data.limit })
// 获取新歌
export const getNewSong = ({ limit }) => $get('/personalized/newsong', { limit })
// 获取音乐 url
export const getSongUrl = (id) => $get('/song/url', { id })
// 获取歌词
export const getLyric = (id) => $get('/lyric', { id })
