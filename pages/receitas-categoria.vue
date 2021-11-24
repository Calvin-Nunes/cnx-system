<template>
	<div class="page-content">
		<section>
			<div class="page-header">
				<div class="header-top-holder">
					<h1 class="page-title">{{ categoria }}</h1>
					<img src="~/assets/images/icon.png" class="page-logo" />
				</div>
				<div class="input-pesquisa-box">
					<c-input
						v-model="txtPesquisaIngrediente"
						placeholder="Qual ingrediente você mais gosta?"
						icon="fas fa-search"
						height="50"
						fontSize="20"></c-input>
				</div>
			</div>
		</section>
		<section ref="section_meals">
			<h4 class="page-subtitle">Receitas</h4>
			<div class="meals-holder">
				<load-spinner v-if="loadingData" :loading="loadingData"></load-spinner>
				<div v-for="receita of receitasPaginacao" :key="receita.idMeal" class="meal-row">
					<div class="meal-image-holder">
						<img :src="receita.strMealThumb" :alt="receita.strMeal" />
					</div>
					<p class="meal-name">{{ receita.strMeal }}</p>
				</div>
			</div>
			<div class="pagination-box">
				<c-button caption="< Anterior" theme="light" :disabled="paginacaoPaginaAtual <= 1" :onTap="recuarPaginacao"> </c-button>
				<p>{{ paginacaoPaginaAtual }} / {{ paginacaoTotalPaginas }}</p>
				<c-button caption="Próximo >" theme="light" :disabled="paginacaoPaginaAtual >= paginacaoTotalPaginas" :onTap="avancarPaginacao"> </c-button>
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
			paginacaoPaginaAtual: 1,
			paginacaoTotalPaginas: 1,
			loadingData: false,
		};
	},

	created() {
		let queryParams = this.$route.query;
		if (queryParams != null) {
			this.categoria = queryParams.categoria || "";
			this.categoriaId = LibUtils.toDecimal(queryParams.id);
		}

		this.getMeals();
	},

	methods: {
		/*
		| função: getMeals
		| Utilizando a classe auxiliar ApiHelper, cria a URL, faz uma chamada GET para API buscando os dados das receitas da categoria
		| ---- */
		getMeals: function () {
			if (LibUtils.isFilled(this.categoria)) {
				const apiHelper = new ApiHelper("1");
				let mealsEndpoint = apiHelper.Endpoints.category;
				let mealsUrl = apiHelper.buildRequestUrl(mealsEndpoint, this.categoria);

				if (LibUtils.isFilled(mealsUrl)) {
					this.loadingData = true;
					axios
						.get(mealsUrl)
						.then(
							function (response) {
								this.loadingData = false;
								this.verifyData(response.data);
							}.bind(this)
						)
						.catch(
							function (error) {
								this.loadingData = false;
								let errorMsg = "Erro ao buscar dados na API: " + error;
								alert(errorMsg);
								console.error(errorMsg);
							}.bind(this)
						);
				}
			}
		},

		/*
		| função: verifyData
		| Verifica integridade dos dados recebidos e caso ok, atribui à propriedade
		| ---- */
		verifyData: function (data) {
			if (LibUtils.isFilled(data)) {
				this.meals = data.meals || [];
				this.paginarDados();
			}
		},

		/*
		| função: paginarDados
		| Corre do ponto inicial ao limite por exibição e coloca no array que será usado para exibição
		| ---- */
		paginarDados: function () {
			this.paginacaoTotalPaginas = Math.ceil(this.meals.length / this.paginacaoExibicaoLimite);

			this.receitasPaginacao = [];
			let i = (this.paginacaoPaginaAtual - 1) * this.paginacaoExibicaoLimite;

			let limite = i > 0 ? i * 2 : this.paginacaoExibicaoLimite;
			if (limite >= this.meals.length) {
				limite = this.meals.length;
			}

			for (i; i < limite; i++) {
				let receita = this.meals[i];
				if (LibUtils.isFilled(receita)) {
					this.receitasPaginacao.push(receita);
				}
			}

			let scrollTo = this.$refs.section_meals;
			if (scrollTo != null) {
				scrollTo.scrollIntoView({ behavior: "smooth" });
			}
		},

		/*		 
		| funções relativas à avançar e recuar paginação
		| ---- */
		avancarPaginacao: function () {
			this.paginacaoPaginaAtual++;
			if (this.paginacaoPaginaAtual > this.paginacaoTotalPaginas) {
				this.paginacaoPaginaAtual = this.paginacaoTotalPaginas;
			}
			this.paginarDados();
		},

		recuarPaginacao: function () {
			this.paginacaoPaginaAtual--;
			if (this.paginacaoPaginaAtual < 1) {
				this.paginacaoPaginaAtual = 1;
			}
			this.paginarDados();
		},
	},
});
</script>

<style lang="scss" scoped>
.input-pesquisa-box {
	width: 100%;
	margin: 8px auto;
}

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
