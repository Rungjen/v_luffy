<template>
	<a-carousel autoplay arrows>
		<div
				slot="prevArrow"
				slot-scope="props"
				class="custom-slick-arrow"
				style="left: 10px;z-index: 1">
			<a-icon type="left-circle"/>
		</div>
		<div slot="nextArrow"
		     slot-scope="props"
		     class="custom-slick-arrow"
		     style="right: 10px">
			<a-icon type="right-circle"/>
		</div>
		
		<div v-for="banner in bannerList">
			<router-link :to="banner.jump_link">
				<img :src="banner.img" :alt="banner.name">
			</router-link>
		</div>
	</a-carousel>
</template>
<script>
	export default {
		name: 'Banner',
		data() {
			return {
				bannerList: []
			}
		},
		methods: {
			getBannerAPI() {
				this.$http.getBanner().then(res => {
					this.bannerList = res.data
				})
			}
		},
		created() {
			this.getBannerAPI()
		}
	};
</script>
<style scoped>
	/* For demo */
	.ant-carousel >>> .slick-slide {
		text-align: center;
		height: 400px;
		line-height: 400px;
		background: #364d79;
		overflow: hidden;
	}
	
	.ant-carousel >>> .slick-slide img {
		margin-left: calc(50% - 1920px / 2);
		height: 400px;
	}
	
	.ant-carousel >>> .custom-slick-arrow {
		width: 35px;
		height: 35px;
		font-size: 35px;
		color: #fff;
		background-color: rgba(31, 45, 61, 0.11);
		opacity: 0.3;
	}
	
	.ant-carousel >>> .custom-slick-arrow:before {
		display: none;
	}
	
	.ant-carousel >>> .custom-slick-arrow:hover {
		opacity: 0.5;
	}
</style>

