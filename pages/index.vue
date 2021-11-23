<template>
	<div class="page-content">
		<section>
			<div class="banner-box">
				<img src="~/assets/images/icon.png" alt="banner" height="380px" />
			</div>
			<div class="description-card">
				<h1>MealDB</h1>
				<div class="input-pesquisa-box">
					<cnx-input v-model="txtPesquisaIngrediente" placeholder="Qual ingrediente você mais gosta?" icon="fas fa-search" height="50"></cnx-input>
				</div>
				<p>Olá, selecione uma categoria de refeição que mais lhe agrade</p>
			</div>
		</section>
		<section>
			<div class="categories-holder">
				<div v-for="category of categories" :key="category.idCategory" class="category-card">
					<div class="category-image-holder">
						<img :src="category.strCategoryThumb" :alt="category.strCategory" />
					</div>
					<h4 class="category-name">{{ category.strCategory }}</h4>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import ApiHelper from "static/libraries/ApiHelper";
import LibUtils from "static/libraries/libUtils";
import axios from "axios";

export default Vue.extend({
	data: () => {
		return {
			txtPesquisaIngrediente: "",
			categories: [],
		};
	},

	created() {
		this.$store.dispatch("tooglePageFooter", true);

		this.getCategories();
	},

	methods: {
		getCategories: function () {
			const apiHelper = new ApiHelper("1");
			let categoriesEndpoint = apiHelper.Endpoints.categories;
			let categoriesUrl = apiHelper.buildRequestUrl(categoriesEndpoint);

			if (LibUtils.isFilled(categoriesUrl)) {
				axios
					.get(categoriesUrl)
					.then(
						function (response) {
							this.verifyCategoriesData(response.data);
						}.bind(this)
					)
					.catch(function (error) {
						let errorMsg = "Erro ao buscar dados na API: " + error;
						alert(errorMsg);
						console.error(errorMsg);
					});
			}
		},

		verifyCategoriesData: function (data) {
			if (LibUtils.isFilled(data)) {
				this.categories = data.categories || [];
				console.log(this.categories);
			}
		},
	},
});
</script>

<style lang="scss" scoped>
.description-card {
	margin: 5px auto;
	text-align: center;
}

.description-card h1 {
	color: var(--system-primary-color);
}

.input-pesquisa-box {
	width: 480px;
	margin: 8px auto;
}

.categories-holder {
	display: flex;
	gap: 5px;
	flex-wrap: wrap;
}

.category-card {
	width: calc(20% - 10px);
	display: inline-flex;
	flex-direction: column;
	border-radius: 4px;
	border: 1px solid rgb(210, 210, 210);
	box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.15);
	transition: 0.3s all ease-in;
	align-items: center;
}

.category-card:hover {
	border-color: rgb(175, 175, 175);
	background: rgba(40, 170, 60, 0.4);
	cursor: pointer;
}

.category-card:hover .category-name{
	color: #000000;
}

.category-image-holder {
	width: 100%;
	padding: 10px 5px;
	height: 86px;
}

.category-image-holder img {
	display: block;
	max-width: 86px;
	height: auto;
	max-height: 86px;
	object-fit: contain;
	margin: 0 auto;
	text-align: center;
}

.category-name {
	text-align: center;
	margin: 5px 0;
	padding: 0 5px;
	color: #222222;
}

@media (max-width: 767px) {
	.input-pesquisa-box {
		width: 90%;
		margin: 8px auto;
	}
}
</style>
