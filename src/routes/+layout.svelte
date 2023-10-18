<script>
  import Footer from '$lib/components/Footer.svelte';
  import CurrentMatches from '$lib/components/current-matches/CurrentMatches.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import '../app.css';
</script>

<div class="bg-neutral-600 bg-opacity-50 h-screen">
  <Header />
  <div class="container mx-auto px-4 my-4 flex gap-4">
    <main class="bg-slate-400 flex-1 p-2">
      <slot />
    </main>
    <aside><CurrentMatches /></aside>
  </div>
  <Footer />
</div>
