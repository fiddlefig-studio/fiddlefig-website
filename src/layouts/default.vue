<template>
  <div class="u-sticky-footer u-overflow-hidden">
    <div>
      <SiteHeader />
      <main>
        <slot />
      </main>
    </div>
    <Footer class="u-relative" />
  </div>
</template>
