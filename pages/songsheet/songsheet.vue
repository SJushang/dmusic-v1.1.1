<template>
    <view class="PersonalizedList">
        <!-- 推荐歌单 -->
        <view class="cell-title">
            {{ title }}
            <van-icon name="arrow" size="20px" color="#fff" />
        </view>
        <view class="cell-SongSheet">
            <SongSheet
                v-for="(item, index) in list"
                :key="index"
                :Oid="item.id"
                :name="item.name"
                :picUrl="item.picUrl + '?imageView&thumbnail=250x0'"
                :playCount="item.playCount"
            />
        </view>
		<!--播放器-->
		<view>
			<SongFooter ref="SongFooter"/>
		</view>
    </view>
</template>

<script>
import { getPersonalized, toplist } from "../../api/index";
import SongSheet from "../../components/uni-music/SongSheet";
import SongFooter from "../../components/uni-music/SongFooter"
export default {
    components: { SongSheet,SongFooter },
    data() {
        return {
            list: [],
            title: ""
        };
		console.log(list);
    },
    onLoad(params) {
		
        uni.showLoading({
            title: "loading"
        });
       
            this.getPersonalized();
        
    },
    methods: {
        /**
         * 推荐歌单
         * @method getPersonalized
         * @return {undefined}
         */
        getPersonalized() {
            getPersonalized().then(res => {
                let arr = [];
                for (let item of res.result) {
                    arr.push({
                        id: item.id,
                        name: item.name,
                        picUrl: item.picUrl,
                        playCount: item.playCount
                    });
                }
                this.list = arr;
                this.title = "歌单";
				console.log(this.list);
                uni.hideLoading();
            });
        },
        /**
         * 榜单
         * @method toplist
         * @return {undefined}
         */
        toplist() {
            toplist().then(res => {
                let arr = [];
                for (let item of res.list) {
                    arr.push({
                        id: item.id,
                        name: item.name,
                        picUrl: item.coverImgUrl,
                        playCount: item.playCount
                    });
                }
                this.list = arr;
                this.title = "排行榜";
                uni.hideLoading();
            });
        }
    }
};
</script>

<style lang='scss' scoped>
	
van-icon {
    position: relative;
    top: 5px;
}
.PersonalizedList {
	background-color: #121429;
    padding: 10px;
    .cell-SongSheet {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
		color: #ffffff;
    }
    .cell-title {
        font-size: 32rpx;
		color: #ffffff;
    }
}
</style>