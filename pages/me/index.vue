<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="login ? uerInfo.avatarUrl :avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{login ? uerInfo.name : '您未登录'}}</text>
				<text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text>
				<view class="out" v-else="login" @click="goLoginOut">退出</view>
			</view>
		</view>
		<view class="menu">
			<navigator :url="one.url" class="one" v-for="(one, index) of menu">
				<!-- <image class="image" :src="one.image" mode=""></image> -->
				<view class="icon-box"><text class="iconfont " :class="[one.icon]"></text></view>
				<text class="text">{{ one.name }}</text>
			</navigator>
		</view>
		<!--播放器-->
		<view>
			<SongFooter ref="SongFooter"/>
		</view>
	</view>
</template>

<script>
	import itemContainer from '@/components/index/item-container.vue'
	import SongFooter from '../../components/uni-music/SongFooter'
	export default {
		components: {
			itemContainer,
			SongFooter
		},
		data() {
			return {
				menu: [
					{
						name: '本地',
						image: '../../../static/c1.png',
						icon: 'icon-bendiyinpin',
						url: '../musiclibrary/musiclibrary'
					},
					{
						name: '喜欢',
						image: 'http://face.amyun.cn/static/img/nav4.d261107.png',
						icon: 'icon-xihuan',
						url: '../songsheet/songsheet'
					},
					{
						name: '收藏',
						image: 'http://face.amyun.cn/static/img/nav3.fb68282.png',
						icon: 'icon-shoucang',
						url: '../singer/singer'
					},
					{
						name: '最近播放',
						image: 'http://face.amyun.cn/static/img/nav2.0ceacd3.png',
						icon: 'icon-zuijinbofang1',
						url: '../ranking/rankinglist'
					}
				],
				login: false,
				avatarUrl: "../../static/logo.png",
				uerInfo: {}
			}
		},
		 
		   onLoad: function () {  
				  const value = uni.getStorageSync('setUserData');
				     if (value) {
				         
						 this.login = true;
						 this.uerInfo.name = value.nickname;
						 this.uerInfo.avatarUrl = value.avatar;
						 
				     }
		    },
	 
		methods: {
			goLogin() {
				if (!this.login) {
					uni.navigateTo({
					    url: '/pages/login/login'
					});
				}
			},
			goLoginOut(){
				console.log('out');
				  uni.removeStorageSync('setUserData');
				uni.showToast({
				    icon: 'none',
					position: 'top',
				    title: '已退出'
				});
				setTimeout(function(){
					 uni.reLaunch({
					     url: '/pages/dmusic/index'
					 });
				},1000)
			}
		}
	}
</script>

<style lang="scss">
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	page,
	view {
		display: flex;
		background-color: #121429;
	}

	page {
		background-color: #121429;
	}

	.center {
		flex-direction: column;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: rgb(0, 228, 255);
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
		background-color: rgb(0, 228, 255);
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #4cd964;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
	
	.active {
		background: #f5f0f0;
		color: #fff;
	}
	
	.active .list-pic {
		display: block;
	}
	
	.status_bar {
	    height: var(--status-bar-height);
	    width: 100%;
	    background-color: #ff5524;
	}
	
	.top_nav_segmented {
	    background-color: #ff5524;
	    padding-top: 15upx;
	    padding-bottom: 15upx;
	}
	
	.nav_segmented {
	    flex: 1;
		font-size: 30px;
		color: #ffffff;
	}
	
	.top_view {
	    height: var(--status-bar-height);
	    width: 100%;
	    position: fixed;
	    background-color: #ff5524;
	    top: 0;
	    z-index: 999;
	}
	
	.right-plus {
	    font-family: iconfont;
	    margin-left: auto;
	    width: 40upx;
	    height: 70upx;
	    line-height: 70upx;
	    font-size: 34upx;
	    color: #ffffff;
	    text-align: center;
	    font-family: iconfont;
	    margin-right: 30upx;
		margin-top: -35px;
	}
	
	.left-nav-icon {
	    font-family: iconfont;
	    margin-left: auto;
	    width: 40upx;
	    height: 70upx;
	    line-height: 70upx;
	    font-size: 34upx;
	    text-align: center;
	    font-family: iconfont;
	    margin-right: 20upx;
	    color: #ff5524;
	}
	
	.content {
		width: 100vw;
		
		background-color: #121429;
	}
	
	.page-body{
		height: 60px;
		width: 100%;
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
	}
	
	.module-header{
		margin-left: 21px;
		font-size: 18px;
		float: left;
		margin-top: 7px;
	}
	.more{
		float: right;
		margin-right: 18px;
		margin-top: 12px;
	}
	
	.center {
		background-color: #FFF;
		.menu {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 30upx;
			background-color: #1e2035;
			
			.one {
				// 			width: 186upx;
				// 			max-width: 186upx;
				display: flex;
				flex-direction: column;
				font-size: $uni-font-size-sm;
				justify-content: center;
				align-items: center;
				margin-top: 24upx;
				margin-bottom: 12upx;
	
				&:nth-child(1) {
					.icon-box {
						background-color: #031c3e;
					}
				}
				&:nth-child(2) {
					.icon-box {
						background-color: #031c3e;
					}
				}
				&:nth-child(3) {
					.icon-box {
						background-color: #031c3e;
					}
				}
				&:nth-child(4) {
					.icon-box {
						background-color: #031c3e;
					}
				}
	
				.icon-box {
					width: 90upx;
					height: 90upx;
					border-radius: 100upx;
					margin-bottom: 16upx;
					box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
					display: flex;
					align-items: center;
					justify-content: center;
					text {
						font-size: 46upx;
						color: #fff;
					}
				}
	
				.text {
					color: #666;
				}
			}
		}
	}
	.out{
		font-size: 32upx;
		color: #FFFFFF;
	}
</style>