export const initialLayout = `
<div class="-Gdl120d,$core750,$core650,$core600 Fnf-mUss H100vh P5u;0 D-f Jc-c Ai-c -RedA-red -RedB#b10">
  <div class="D-f Jc-c Ai-c Fld-c wrapper">
    <img class="D Mxw480 W60p M0;a;15u md_W100p" alt="mlut logo" src="/img/mlut.png">
    <div class="Ps W15p Apcr1 Tf -Rt45d Mb10u">
      <div class="-Sz100p -Gdl-45d,$redB,$redA;30p,$redA;80p,$redB"></div>
      <div class="-Sz100p Ps-a T-50p Bdrd100p -Gdl-90d,$redA,$redA;80p,$redB"></div>
      <div class="-Sz100p Ps-a L-50p T0 Bdrd100p -Gdl-90d,$redA,$redA;80p,$redB">
      </div>
    </div>
    <strong class="Txa-c C-$accent900 Fns8u Lnh1.1 M0;0;5u P0;1u md_Fns10u">
      Creative coding!
    </strong>
    <p class="C-$accent900 M0;0;10u Fns5u">
      Yes, you can create pure CSS art using utility classes!
    </p>
    <button class="btn Mnw18gg P2u;3u Bdrd1u Bgc-$brand Bgc-$brand500_h C#fff">
  	  Getting started
	</button>
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
    --ml-core750:#121828;
    --ml-core650:#251942;
    --ml-core600:#321933;
	}
}

@media (prefers-color-scheme: light){
  :root{
    --ml-accent900:rgb(17,24,39);
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
