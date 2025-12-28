const initialLayout =  `
<div id="hero-page" class="-Gdl120d,$core750,$core650,$core600 H100vh P-$heroPadding;0;5u D-f Jc-c Ai-c">

	<div class="D-f Jc-c Ai-c Fld-c  wrapper">

		<img class="D Mxw480 M0;a;5u W80p md_W100p"
		 alt="mlut logo" src="https://150.lv/t/acss/pictures/mlut-logo.png">


		<h1 class="Txa-c C-$accent900 Fns8u Lnh1.1 M0;0;5u P0;1u md_Fns10u">
			Make CSS exciting again!
		</h1>

		<p class="C-$accent850 M0;0;5u P0;2u Mxw750 Txa-c Fns4.4u
			md_Fns5.2u ">
			Atomic CSS toolkit with Sass and ergonomics for creating styles of any complexity
		</p>

		<div class="D-f Fld-r W100p Flw-w Jc-c Gap3u M0;0;5u P0;5u">
		</div>
	</div>
</div>
`
const initialConfig = `
@use "@mlut/core/tools";
@use "@mlut/core/dist/sass/css/styles";

@media (prefers-color-scheme: dark){
  html{
    --ml-accent900:#fff;
    --ml-accent850:rgb(209,213,219,1);
    --ml-core750:#121828;
    --ml-core650:#251942;
    --ml-core600:#321933;
	}
}

@media (prefers-color-scheme: light){
  html{
    --ml-accent900:rgb(17,24,39);
    --ml-accent850:rgb(41,42,51,1);
    --ml-core750:rgb(236,240,246,0.5);
    --ml-core650:rgba(218,178,255,0.1);
    --ml-core600:rgba(142,197,255,0.4);
  }
}
`
const loaderStyles = `

`

export {initialLayout, initialConfig}