<template>
    <View class="page">        
		<View class="cell-title">
            排行榜
            <van-icon name="arrow" size="20px" color="#fff" />
        </View>
        <View class="cell-SongSheet">
            <SongSheet
                v-for="(item, index) in toplist"
                :key="index"
                :Oid="item.id"
                :name="item.name"
                :picUrl="item.picUrl + '?imageView&thumbnail=250x0'"
                :playCount="item.playCount"
            />
        </View>
		<!--播放器-->
		<view>
			<SongFooter ref="SongFooter"/>
		</view>
    </View>
</template>

<script>
import { getBanner, getPersonalized, toplist } from "../../api/index";
import VanIcon from "../../wxcomponents/vant-weapp/icon/index";
import SongSheet from "../../components/uni-music/Ranking";
import SongFooter from "../../components/uni-music/SongFooter"

export default {
    components: { SongSheet, VanIcon, SongFooter },
    data() {
        return {
            toplist: [], //排行榜
            current: 0,
        };
    },
    created() {
        uni.showLoading({
            title: "loading"
        });

        Promise.all([
            this.gettoplist()
        ]).then(() => {
            uni.hideLoading();
        });
    },
    methods: {
        /**
         * 获取榜单
         * @method getBanner
         * @return {Promise}
         */
        gettoplist() {
            toplist().then(res => {
				console.log(res);
                let random = Math.floor(Math.random() * (res.list.length - 3));
				console.log(random);
                // 随机取4个
                for (let item of res.list.slice(random, random + 4)) {
					console.log(item.playCount);
                    this.toplist.push({
                        id: item.id,
                        name: item.name,
                        picUrl: item.coverImgUrl,
                        playCount: item.playCount
                    });
                }
            });
        }
    }
};
</script>

<style lang='scss' scoped>
// /deep/ .van-tab--active {
//     color: #dd001b;
// }

image {
    width: 100%;
    height: 200px;
}
swiper {
    height: 200px;
}
.page{
	background-color: #121429;
}

.cell-title {
    font-size: 32rpx;
    /* margin-top: 20rpx; */
    margin-bottom: 10rpx;
    padding: 0 15px;
	color: #fff;
}
.cell-SongSheet {
	margin-left: 20rpx;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    padding: 0 8px;
	color: #fff;
}
van-icon {
    position: relative;
    top: 5px;
}
</style>
