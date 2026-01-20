export const initialLayout = `
<div class="-Gdl120d,$core750,$core650,$core600 Fnf-mUss H100vh P15u;0">
  <div class="wrapper">
    <img class="D Mxw380 W60p M0;a;15u" alt="mlut logo" src="/img/mlut.png">
    <div class="Ps W12p Apcr1 Tf -Rt45d M0;a;10u -RedA-red -RedB#b10">
      <div class="-Sz100p -Gdl-45d,$redB,$redA;30p,$redA;80p,$redB"></div>
      <div class="-Sz100p Ps-a T-50p Bdrd100p -Gdl-90d,$redA,$redA;80p,$redB"></div>
      <div class="-Sz100p Ps-a L-50p T0 Bdrd100p -Gdl-90d,$redA,$redA;80p,$redB">
      </div>
    </div>
    <strong class="D Txa-c C-$accent900 Fns8u M0;a;5u">
      Creative coding!
    </strong>
    <p class="Txa-c C-$accent900 Fns5u M0;0;10u">
      Yes, you can create pure CSS art using utility classes!
    </p>
    <button class="btn D M-a Mnw16gg P2u;3u Bdrd1u Bgc-$brand Bgc-$brand500_h C#fff">
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
