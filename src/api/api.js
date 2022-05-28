import { $get, $post } from 'utils/request';

// 获取轮播
export const getBanner = (type) => $get('/banner', { type })
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
// 获取热搜榜
export const getSearchHot = () => $get('/search/hot')
// 获取搜索关键词
export const getSearchKey = (keywords) => $get('/cloudsearch', { keywords })
// 获取推荐视频
export const getVideoRecom = () => $get('/video/timeline/recommend?offset=10')
// 发送验证码
export const sentCaptcha = (phone) => $get('/captcha/sent', { phone })
// 验证验证码
export const verifyCaptcha = (data) => $get('/captcha/verify', { phone: data.phone, captcha: data.captcha })
// 手机登录
export const loginCellphone = (data) => $get('/login/cellphone', { phone: data.phone, md5_password: data.md5_password, captcha: data.captcha })
// 获取用户歌单
export const userPlaylist = (uid) => $get('/user/playlist', { uid })
