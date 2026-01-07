export const initialLayout = `
<div class="-Gdl120d,$core750,$core650,$core600 Fnf-mUss H100vh P-$heroPadding;0;5u D-f Jc-c Ai-c">
	<div class="D-f Jc-c Ai-c Fld-c  wrapper">
		<img class="D Mxw480 M0;a;5u W80p md_W100p"
		 alt="mlut logo" src="/img/mlut.png">
		<h1 class="Txa-c C-$accent900 Fns8u Lnh1.1 M0;0;5u P0;1u md_Fns10u">
			Make CSS exciting again!
		</h1>
		<p class="C-$accent850 M0;0;5u P0;2u Mxw750 Txa-c Fns4.4u
			md_Fns5.2u ">
			Atomic CSS toolkit with Sass and ergonomics for creating styles of any complexity
		</p>
		<div class="D-f Fld-r W100p Flw-w Jc-c Gap3u M0;0;5u P0;5u">
			<div class="W70p Mxw50u xl_Mxw55u H7u">
			<button class="btn -Sz100p D-f Jc-c Ai-c P0;3u Fns0.8r Bdrd1u Ts-$shortTs Bd1;s;$brand Bgc-$brand Bgc-$brand500_h C#fff">
				<div class=" D-f Jc-c Ai-c Fld-r Gap3u Fns1.1r ">
					<div class="D Apcr1 W0.9r">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="D W100p Mxw25u Apcr1 Stw2 Fi-$brand St#fff">
							<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
							<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
						</svg>
					</div>
					<span class="D Fns0.9r">
						Getting started
					</span>
				</div>
			</button>
			</div>
		</div>
	</div>
</div>
`;
export const initialConfig = `
@use "@mlut/core";

:root {
	--ml-brand:#f0438c;
	--ml-brand500:rgb(233,30,99);
}

@media (prefers-color-scheme: dark){
  :root{
    --ml-accent900:#fff;
    --ml-accent850:rgb(209,213,219,1);
    --ml-core750:#121828;
    --ml-core650:#251942;
    --ml-core600:#321933;
	}
}

@media (prefers-color-scheme: light){
  :root{
    --ml-accent900:rgb(17,24,39);
    --ml-accent850:rgb(41,42,51,1);
    --ml-core750:rgb(236,240,246,0.5);
    --ml-core650:rgba(218,178,255,0.1);
    --ml-core600:rgba(142,197,255,0.4);
  }
}
`;
export const errorLayout = `
	<div>
		<h1> Ooops... </h1>
		<h2>
			Something went wrong in your Sass-config!
		</h2>
		<h2>
			Check out the console
		</h2>
	</div>
`;
export const errorStyles = `
	@media (prefers-color-scheme: light){
		div {
			--ml-core800: #f0f0f1;
		}
	}
	@media (prefers-color-scheme: dark){
		div {
			--ml-core800: #111827;
		}
	}
	* {
		margin: 0;
	}
	div {
		background-color:var(--ml-core800);
		height: 100%;
		weight: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	h1, h2 {
		color: #f0438c;
		text-align: center;
		width: 100%;
		padding: 0;
		margin: 0 0 1rem
	}
`;