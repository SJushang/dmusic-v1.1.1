<template>
    <view class="PlayList" :style="show ? 'display: block' : 'display: none'">
        <view class="mark" @click="close" />
        <view class="PlayListWarp">
            <view class="top">播放列表</view>
            <scroll-view
                class="scrollview"
                scrollY
                scrollTop="0"
                :scrollIntoView="'songid' + song.id"
            >
                <view
                    v-for="(item, index) in songList"
                    @click="play(item)"
                    :class="['item', song.id === item.id ? 'active' : '']"
                    :id="'songid' + item.id"
                    :key="index"
                >
                    {{ item.name }}
                    <text class="ellipsis">
                        {{
                            " - " +
                                item.ar
                                    .map(i => {
                                        return i.name;
                                    })
                                    .join(" / ")
                        }}
                    </text>
                </view>
            </scroll-view>
            <view class="bottom" @click="$emit('close')">
                关闭
            </view>
        </view>
    </view>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: {
        show: Boolean
    },
    data() {
        return {
            scrollTop: 0
        };
    },
    computed: {
        ...mapState(["song", "songList"])
    },
    methods: {
        /**
         * 播放当前歌曲
         * @method play
         * @return {undefined}
         */
        play(item) {
            //更新当前播放歌曲
            this.$store.dispatch("update", { item });
            //更新歌词
            this.$store.dispatch("updateLyric", { id: item.id });
        }
    }
};
</script>

<style lang='scss' scoped>
.PlayList {
    .PlayListWarp {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 1002;
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        font-size: 16px;
        .scrollview {
            height: 50vh;
            border-top: 1px solid rgba(255, 255, 255, 0.5);
            border-bottom: 1px solid rgba(255, 255, 255, 0.5);
            padding: 0 15px;
            .item {
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                font-size: 14px;
                Text {
                    font-size: 13px;
                    opacity: 0.4;
                    height: 100%;
                }
            }
            .item.active {
                color: #00BFFF;
            }
            .item:last-child {
                border-bottom: none;
            }
        }
        .top,
        .bottom {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
        }
    }
    .mark {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1001;
        background-color: rgba(0, 0, 0, 0.2);
    }
}
</style>