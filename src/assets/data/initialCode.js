const initialCode = {
html: `
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
`,
css:`
.wrapper {
  display: block;
  max-width: 1200px;
  margin: 0 auto;
}

.wrapper {
  padding-right: calc(var(--ml-gg) * 1);
  padding-left: calc(var(--ml-gg) * 1);
}

html {
	--ml-heroPadding: calc(var(--ml-headerH) + 10px);
  --ml-headerH: 6rem;
}
@media (prefers-color-scheme: dark) {
  html {
    --ml-accent900:#fff;
    --ml-accent850:rgb(209,213,219,1);
    --ml-core750:#121828;
    --ml-core650:#251942;
    --ml-core600:#321933;
  }
}
@media (prefers-color-scheme: light) {
  html {
    --ml-accent900:rgb(17,24,39);
    --ml-accent850:rgb(41,42,51,1);
    --ml-core750:rgb(236, 240, 246,0.5);
    --ml-core650:rgba(218,178,255,0.1);
    --ml-core600:rgba(142,197,255,0.4);
  }
}

.-Gdl120d\\\,\\\$core750\\\,\\\$core650\\\,\\\$core600 {
  background-image: linear-gradient(120deg, var(--ml-core750), var(--ml-core650), var(--ml-core600));
}

.H100vh {
  height: 100vh;
}

.D {
  display: block;
}

.P-\\\$heroPadding\\\;0\\\;5u {
  padding: var(--ml-heroPadding) 0px 1.25rem;
}

.Jc-c {
  justify-content: center;
}

.Mxw480 {
  max-width: 480px;
}

.W80p {
  width: 80%;
}

.Txa-c {
  text-align: center;
}

.C-\\\$accent900 {
  color: var(--ml-accent900);
}

.Fns8u {
  font-size: 2rem;
}

.Lnh1\\\.1 {
  line-height: 1.1;
}

.P0\\\;1u {
  padding: 0px 0.25rem;
}

.C-\\\$accent850 {
  color: var(--ml-accent850);
}

.P0\\\;2u {
  padding: 0px 0.5rem;
}

.Mxw750 {
  max-width: 750px;
}

.Fns4\\\.4u {
  font-size: 1.1rem;
}

.Fld-r {
  flex-direction: row;
}

.Flw-w {
  flex-wrap: wrap;
}

.Gap3u {
  gap: 0.75rem;
}

.P0\\\;5u {
  padding: 0px 1.25rem;
}

@media (min-width: 768px) {
  .md_W100p {
    width: 100%;
  }
}
@media (min-width: 768px) {
  .md_Fns10u {
    font-size: 2.5rem;
  }
}

.M0\\\;a\\\;5u {
  margin: 0px auto 1.25rem;
}
`,
sass:`
@use 'mlut' with (
  $jit:(
    "output":"style.css",
    "content":"index.html"
  )
);

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
}

export { initialCode }