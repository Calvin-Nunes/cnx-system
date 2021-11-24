<template>
	<div class="page-content">
		<section>
			<div class="page-header">
				<div class="header-top-holder">
					<h1 class="page-title">{{ receita }}</h1>
					<img src="~/assets/images/icon.png" class="page-logo" />
				</div>				
			</div>
		</section>
		<section>
			<div class="meal-holder">
				
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
			categoria: "",
			categoryId: 0,
			txtPesquisaIngrediente: "",
			meals: [],
			receitasPaginacao: [],
			paginacaoExibicaoLimite: 25,
			paginacaoPaginaAtual: 0,
			paginacaoTotalPaginas: 0,
		};
	},

	created() {
		let queryParams = this.$route.query;
		if (queryParams != null) {
			this.meal = queryParams.receita || "";
			this.mealId = LibUtils.toDecimal(queryParams.id);
		}

		this.getMeal();
	},

	methods: {
		/*
		| função: getMeal
		| Utilizando a classe auxiliar ApiHelper, cria a URL, faz uma chamada GET para API buscando os dados das receitas da categoria
		| ---- */
		getMeal: function () {
			if ((this.mealId)>0) {
				const apiHelper = new ApiHelper("1");
				let mealEndpoint = apiHelper.Endpoints.mealDetail;
				let mealUrl = apiHelper.buildRequestUrl(mealEndpoint, this.mealId);
				
				if (LibUtils.isFilled(mealUrl)) {
					axios
						.get(mealUrl)
						.then(
							function (response) {
								this.verifyData(response.data);
							}.bind(this)
						)
						.catch(function (error) {
							let errorMsg = "Erro ao buscar dados na API: " + error;
							alert(errorMsg);
							console.error(errorMsg);
						});
				}
			}
		},

		/*
		| função: verifyData
		| Verifica integridade dos dados recebidos e caso ok, atribui à propriedade
		| ---- */
		verifyData: function (data) {
			if (LibUtils.isFilled(data)) {
				debugger
				this.meal = data.meal || {};
			}
		},
	},
});
</script>

<style lang="scss" scoped>
.meals-holder {
	display: flex;
	flex-direction: column;
	gap: 5px;
	flex-wrap: nowrap;
	margin: 0 20% 10px 20%;
	padding: 10px;
	background: linear-gradient(135deg, #ecf0ee 0%, #f5f5f5 40%, #e2e7e4 90%);
	border-radius: 5px;
	box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.15);
	transition: 0.4s height ease-in;
}

.meal-row {
	width: 100%;
	display: flex;
	flex-direction: row;
	border-radius: 4px;
	border: 1px solid rgb(210, 210, 210);
	box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.15);
	transition: 0.3s all ease-in;
	align-items: center;
}

.meal-row:hover {
	border-color: rgb(175, 175, 175);
	background: rgba(40, 170, 60, 0.4);
	cursor: pointer;
}

.meal-row:hover .meal-name {
	color: #000000;
}

.meal-image-holder {
	display: inline-flex;
	width: 86px;
	height: 86px;
	padding: 0 5px;
	flex-shrink: 0;
}

.meal-image-holder img {
	display: block;
	width: 100%;
	height: auto;
	max-height: 86px;
	object-fit: contain;
	margin: 0 auto;
	text-align: center;
}

.meal-name {
	display: inline-flex;
	padding: 0 12px;
	color: #222222;
}

.pagination-box {
	padding-left: 20%;
	padding-right: 20%;
}

.pagination-box button {
	font-size: 18px;
}

@media (max-width: 991px) {
	.meals-holder {
		margin: 0 2% 10px 2%;
	}

	.pagination-box {
		padding-left: 2%;
		padding-right: 2%;
	}
}

@media (max-width: 767px) {
	.page-header {
		padding: 5px 2%;
	}
	.page-header .page-logo {
		width: 86px;
	}

	.meals-holder {
		padding: 5px;
	}

	.pagination-box {
		padding-left: 5px;
		padding-right: 5px;
	}

	.input-pesquisa-box {
		width: 90%;
		margin: 8px auto;
	}
}
</style>
