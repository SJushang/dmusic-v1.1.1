<template>
	<view class="forget">
		
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="请输入手机号码"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="请输入新密码"
					isShowPass
				></wInput>
				
				<wInput
					v-model="verCode"
					type="number"
					maxlength="4"
					placeholder="验证码"
					
					isShowCode
					codeText="获取重置码"
					setTime="30"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>
			
			<wButton 
				text="重置密码"
				:rotate="isRotate" 
				@click.native="startRePass()"
			></wButton>

		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	export default {
		data() {
			return {
				phoneData: "", //电话
				passData: "", //密码
				verCode:"", //验证码
				isRotate: false, //是否加载旋转
			}
		},
		components:{
			wInput,
			wButton
		},
		mounted() {
			_this= this;
		},
		methods: {
			getVerCode(){
				//获取验证码
				if (_this.phoneData.length != 11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不符合要求'
				    });
				    return false;
				}
				// 发送验证码
				uni.request({
				    url: 'http://47.92.193.229:100/index.php/api/sign/send',
					 data: {
					        phone: _this.phoneData,
							mark:'changepwd'
					    },
				    success: (res) => {
					 
						if(res.data.status == 1){
							uni.showToast({
							    icon: 'none',
								position: 'bottom',
							    title: res.data.msg
							});
						}
						if(res.data.status == 0){
							uni.showToast({
							    icon: 'none',
								position: 'bottom',
							    title: res.data.msg
							});
							return false;
						}
				    }
				});
				
				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
				// uni.showToast({
				//     icon: 'none',
				// 	position: 'bottom',
				//     title: '模拟倒计时触发'
				// });
				
				setTimeout(function(){
					_this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
					// uni.showToast({
					//     icon: 'none',
					// 	position: 'bottom',
					//     title: '模拟倒计时终止'
					// });
				},30000)
			},
			startRePass() {
				// console.log(11)
				//重置密码
				// if(this.isRotate){
				// 	//判断是否加载中，避免重复点击请求
				// 	return false;
				// }
				if (this.phoneData.length != 11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不符合要求'
				    });
				    return false;
				}
			    if (this.passData.length < 6) {
			        uni.showToast({
			            icon: 'none',
						position: 'bottom',
			            title: '密码不符合要求'
			        });
			        return false;
			    }
				if (this.verCode.length != 4) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '验证码不符合要求'
				    });
				    return false;
				}
				uni.request({
					
				    url: 'http://47.92.193.229:100/index.php/api/sign/changepwd',
					 data: {
					        phone: _this.phoneData,
							pass: _this.passData,
							num: _this.verCode
					    },
				    success: (res) => {
						// console.log(res)
						if(res.data.status == 3){
							uni.showToast({
							    icon: 'none',
								position: 'bottom',
							    title: res.data.msg
							});
							return false;
						}
						if(res.data.status == 2){
							uni.showToast({
							    icon: 'none',
								position: 'bottom',
							    title: res.data.msg
							});
							return false;
						}
						if(res.data.status == 1){
							uni.showToast({
							    icon: 'none',
								position: 'bottom',
							    title: res.data.msg
							});
							//密码修改成功
							setTimeout(function(){
								 uni.reLaunch({
								     url: '/pages/login/login'
								 });
							},1500)
						}
						
				    }
				});
				// console.log("重置密码成功")
				// _this.isRotate=true
				// setTimeout(function(){
				// 	_this.isRotate=false
				// },3000)
				
				
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
	body{
		background-color: #fff;
	}
</style>

