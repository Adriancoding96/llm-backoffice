<script lang="ts">
	import '../app.postcss';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
  import { AppRail, AppRailTile, AppRailAnchor, LightSwitch } from "@skeletonlabs/skeleton"; 
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

</script>

<AppRail class="fixed top-0 left-0 h-full w-18  surface-200 z-20">
  <svelte:fragment slot="lead">
    <AppRailAnchor href="/" title="Home">
    </AppRailAnchor>
    <AppRailAnchor href="/users" title="Users">
    </AppRailAnchor>
    <AppRailAnchor href="/prompts" title="Prompts">
    </AppRailAnchor>
    <AppRailAnchor href="/responses" title="Responses">
    </AppRailAnchor>
  </svelte:fragment>

  <svelte:fragment slot="trail">
    <AppRailAnchor href="/settings" title="Settings">
    </AppRailAnchor>
    <div class="container pl-4 pb-4">
      <LightSwitch />
    </div>
  </svelte:fragment>
</AppRail>

<slot />
