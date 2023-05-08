<template>
  <header class="header">
    <div class="o-wrapper">
      <div class="header-layout">
        <div class="logo">
          <FiddlefigLogo class="u-my-[20px] u-w-[110px] tablet-wide:u-w-[147px]" />
        </div>
        <div class="middle" />
        <div class="end" />
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
}

.middle {
  flex-basis: 100%;
}
</style>
