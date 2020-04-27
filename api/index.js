import config from '../config/index';

function Api(path, data = {}) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: config.serverUrl + path,
            data: data,
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                if (res.statusCode >= 200 && res.statusCode <= 300) {
                    resolve(res.data);
                } else {
                    if (res.errMsg) {
                        uni.showToast({
                            title: res.errMsg,
                            icon: 'none',
                            duration: 1000
                        });
                    } else {
                        uni.showToast({
                            title: '出错了',
                            icon: 'none',
                            duration: 1000
                        });
                        uni.hideLoading();
                    }
                }
            },
            fail: err => {
                uni.showToast({
                    title: err.errMsg,
                    icon: 'none',
                    duration: 1000
                });
                uni.hideLoading();
                reject(err);
            }
        });
    });
}
//推荐歌单
const getPersonalized = (data = {}) => new Api('/api/song/personalized', data);
//歌单详情
const getSongList = (data = {}) => new Api('/api/song/detail', data);
//歌曲详情
const getSong = (data = {}) => new Api('/api/song/url', data);
//获取歌词
const getLyric = (data = {}) => new Api('/api/song/lyric', data);
//所有榜单--这个用歌单详情获取数据
const toplist = (data = {}) => new Api('/api/song/toplist', data);
//搜索
const search = (data = {}) => new Api('/search', data);
//热搜
const searchHot = (data = {}) => new Api('/search/hot', data);

export {
    getPersonalized,
    getSongList,
    getSong,
    getLyric,
    toplist
};
