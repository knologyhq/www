<template>
	<Layout>
		<v-container class="fill-height d-flex flex-column align-center justify-center">
			<v-icon large color="primary">mdi-alert-circle-outline</v-icon>
			<h1 class="text-h4 mt-3">Oops! Page Not Found</h1>
			<p class="text-subtitle-1 mb-8">
				We're sorry, but the page you were looking for doesn't exist or may have been moved.
			</p>
			<v-btn color="primary" large @click="goHome">
				Back to Homepage
			</v-btn>
		</v-container>
	</Layout>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
	metaInfo() {
		return {
			title: "404 - Page Not Found",
		};
	},
	methods: {
		goHome() {
			this.$router.push("/");
		},
	},
	components: {
		Logo,
	},
};
</script>

<style scoped>
.fill-height {
	min-height: 40vh;
	text-align: center;
}
</style>
