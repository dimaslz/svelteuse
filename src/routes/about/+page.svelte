<script>
	import Header from "@/components/header/Header.svelte";
	import Link from "@/components/link/Link.svelte";

</script>

<div class="flex flex-col h-screen items-center w-full">
  <Header />

  <main class="h-full w-full px-12">
   	<div class="flex h-full flex-1 grow-0 w-full justify-center items-center flex-col">
  		<h1 class="text-6xl text-[#ff3e00]">SvelteUse</h1>

      <span class="my-12 space-y-4">
        <p>
          As always I like to say <i>"I'm not hater of nother, and I am not lover of nothing too"</i>. <span class="text-[#ff3e00]">Svelte</span> is one of my favorite frameworks, with their pros and consts. In my investment to learn <span class="text-[#ff3e00]">Svelte</span>, I discovered a niche, where does not exists reusable Hooks like in <a href="https://react.dev" class="text-[#58C4DC] underline" target="_blank">React</a> and <a href="https://vuejs.org" class="text-[#327959] underline" target="_blank">Vue</a>, nothing relevant as <a href="https://usehooks.com" target="_blank" class="text-[#ff3e00] underline">https://usehooks.com</a>, <a href="https://usehooks-ts.com" target="_blank" class="text-[#ff3e00] underline">https://usehooks-ts.com</a> and <a href="https://vueuse.org" target="_blank" class="text-[#ff3e00] underline">https://vueuse.org</a>. The I decided to port all possible hooks from both sites and create new ones as part of my learning.
        </p>

        <p>
          I hope you find useful this repository created with ♥️ and ☕️ from Barcelona. I would like to suggest to follow and give your star in the Github repository: <a href="https://github.com/dimaslz/svelteuse" class="text-[#ff3e00] underline">https://github.com/dimaslz/svelteuse</a>
        </p>

        <div>
          <p>
            Here my network:
          </p>

          <ul class="pl-2">
            <li>linkedin: <a href="https://www.linkedin.com/in/dimaslopezzurita" class="text-[#ff3e00] underline">https://www.linkedin.com/in/dimaslopezzurita</a></li>
            <li>github: <a href="https://github.com/dimaslz" target="_blank" class="text-[#ff3e00] underline">https://github.com/dimaslz</a></li>
            <li>twitter/x: <a href="https://x.com/dimaslz" target="_blank" class="text-[#ff3e00] underline">https://x.com/dimaslz</a></li>
            <li>web: <a href="https://dimaslz.com" target="_blank" class="text-[#ff3e00] underline">https://dimaslz.com</a></li>
          </ul>
        </div>
      </span>

      <div class="flex space-x-4">
				<Link href="/guide/installation" type="button">Get started</Link>
				<Link href="https://github.com/dimaslz/svelteuse" type="button" outline>Github</Link>
			</div>
  	</div>
  </main>

  <footer class="text-center px-2 py-4 text-base">
  	👨‍💻 with ♥️ and ☕️ from Barcelona - <Link href="https://github.com/dimaslz" target="_blank"
  		>gh</Link
  	> |
  	<Link href="https://www.linkedin.com/in/dimaslopezzurita" target="_blank">in</Link> | <Link
  		href="https://x.com/dimaslz"
  		target="_blank">tw</Link
  	>
  </footer>
</div>
