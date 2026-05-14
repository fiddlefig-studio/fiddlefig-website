<template>
  <header class="header">
    <div class="o-wrapper">
      <div class="header-layout">
        <div class="logo">
          <NuxtLink to="/" aria-label="Go to the homepage">
            <FiddlefigLogo class="u-my-[20px] u-w-[110px] tablet-wide:u-w-[147px]" />
          </NuxtLink>
        </div>
        <div class="middle" />
        <nav class="end" aria-label="Primary">
          <NuxtLink class="nav-link nav-link-contact" to="/contact">
            Talk to us
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.header-layout {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.middle {
  flex-basis: 100%;
}

.end {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: 0.75rem;
}

.nav-link-contact {
  background: theme('colors.purple');
  border: 2px solid theme('colors.purple');
  border-radius: 999px;
  color: theme('colors.white');
  flex-shrink: 0;
  font-family: theme('fontFamily.title');
  min-height: 44px;
  padding: 0.55rem 1rem;
  white-space: nowrap;
}

.nav-link-contact:hover,
.nav-link-contact:focus-visible {
  background: theme('colors.orange');
  border-color: theme('colors.orange');
  color: theme('colors.black');
  text-decoration: none;
}
</style>
