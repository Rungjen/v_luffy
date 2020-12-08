<template>
	<div class="home">
		<r-header></r-header>
		<banner></banner>
	</div>
</template>

<script>
	import RHeader from "./RHeader";
	import Banner from "../../components/Banner";
	
	export default {
		name: 'Home',
		components: {
			RHeader,
			Banner
		}
	}
</script>
