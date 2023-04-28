<template>
  <div class="hero">
    <div class="content">
      <h1 class="heading u-mb-[36px] u-text-uppercase">
        Refuse to Blend In
      </h1>
      <p class="u-max-w-[500px]">
        We’re a creative web design and development studio specialising in <strong class="u-text-orange">
          beautiful and original websites</strong> for brands who want to stand out.
      </p>
    </div>
    <div class="blob-left">
      <svg width="456" height="704" xmlns="http://www.w3.org/2000/svg">
        <path d="M425.567 664.848C371.421 723.639 233.493 706.246 117.309 671.477C0.922913 636.089 -92.8988 583.744 -119.197 507.319C-145.495 430.893 -103.03 329.983 -26.9181 218.784C48.992 106.965 159.371 -14.7257 240.233 2.08689C320.677 19.7211 371.604 175.859 411.259 322.648C451.533 469.235 480.131 605.235 425.567 664.848Z" fill="var(--blob-color, #FFAD31)" />
      </svg>
    </div>
    <div class="blob-lower-right">
      <svg width="94" height="112" xmlns="http://www.w3.org/2000/svg">
        <path d="M90.5094 38.9004C97.3094 60.1004 92.9094 84.8004 75.9094 98.7004C58.9094 112.6 29.3094 115.7 13.8094 103.5C-1.79059 91.3004 -3.19059 63.7004 4.70941 40.9004C12.7094 18.1004 30.1094 0.100419 47.8094 0.000419311C65.6094 -0.0995807 83.7094 17.7004 90.5094 38.9004Z" fill="var(--blob-color, #5A8DCA)" />
      </svg>
    </div>
    <div class="main-shape u-relative">
      <svg class="svg-slider" viewBox="0 0 1843 1126" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M730.114 72.656C589.885 121.568 449.656 174.999 309.427 232.948C207.48 275.077 104.338 314.811 4.10833e-05 352.15L2.29699e-05 766.536C107.843 805.399 213.247 846.684 316.212 890.391C460.964 949.943 605.717 1002.72 750.469 1048.71C895.222 1099.23 1042.24 1124.9 1191.51 1125.74C1272.94 1126.2 1352.1 1113.09 1429 1086.41C1505.9 1064.26 1573.75 1028.49 1632.56 979.121C1695.88 934.295 1745.64 875.837 1781.83 803.748C1822.54 736.203 1842.9 659.508 1842.9 573.661C1842.9 388.413 1777.31 245.719 1646.13 145.58C1514.94 49.9591 1363.41 1.66545 1191.51 0.699009C1028.67 -0.216571 874.866 23.7691 730.114 72.656Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div class="blob-lower-left">
      <svg width="119" height="122" xmlns="http://www.w3.org/2000/svg">
        <path d="M115.674 39.1012C123.46 61.163 117.671 89.0618 97.3095 105.88C76.8486 122.6 41.8155 128.239 21.3545 113.498C0.793786 98.856 -5.19478 63.9331 4.58654 39.1012C14.3679 14.2693 39.9191 -0.669449 63.3743 0.0230738C86.7297 0.715597 107.989 16.9404 115.674 39.1012Z" fill="var(--blob-color, #FFAEB0)" />
      </svg>
    </div>
    <div class="blob-lower-left-2">
      <svg width="222" height="184" xmlns="http://www.w3.org/2000/svg">
        <path d="M219.493 63.9091C229.918 99.011 206.559 141.828 172.968 164.779C139.377 187.923 95.3614 191.395 58.2957 168.443C21.2299 145.492 -9.07903 96.118 2.50401 59.4732C14.0871 22.6355 67.5621 -1.47298 116.404 0.0699619C165.053 1.6129 209.261 28.8072 219.493 63.9091Z" fill="var(--blob-color, #9E93C8)" />
      </svg>
    </div>
    <div class="blob-top-right">
      <svg width="146" height="144" xmlns="http://www.w3.org/2000/svg">
        <path d="M141.844 57.92C150.906 87.3417 145.063 120.085 125.152 134.796C105.122 149.507 71.1414 146.185 43.2418 127.678C15.4615 109.171 -6.23821 75.3595 1.63091 47.5987C9.61925 19.8379 47.0572 -1.99109 77.8183 0.144352C108.579 2.2798 132.783 28.4983 141.844 57.92Z" fill="var(--blob-color, #FFAD31)" />
      </svg>
    </div>
    <div class="blob-lower-right-2">
      <svg width="73" height="75" xmlns="http://www.w3.org/2000/svg">
        <path d="M70.9599 24.0376C75.7357 37.6002 72.1845 54.7511 59.694 65.0903C47.1424 75.3687 25.6515 78.8353 13.0998 69.7733C0.486944 60.7721 -3.18671 39.3031 2.81359 24.0376C8.8139 8.77209 24.4882 -0.411547 38.8767 0.0141847C53.2039 0.439916 66.2454 10.4142 70.9599 24.0376Z" fill="#15A2B4" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
}

.content {
  align-items: center;
  color: theme('colors.white');
  display: flex;
  font-size: theme('fontSize.20');
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 36.635vw;
  position: absolute;
  text-align: center;
  top: 0;
  width: 45.313vw;
  z-index: 2;
}

.heading {
  font-size: theme('fontSize.70');
  max-width: 28.125rem;
  text-align: center;
}

.main-shape {
  color: theme('colors.purple');
  width: 95vw;
}

.blob-left {
  position: absolute;
  top: 66px;
}

.blob-lower-left {
  position: absolute;
  top: 800px;
  left: 82px;
}

.blob-lower-left-2 {
  left: 244px;
  position: absolute;
  top: 647px;
}

.blob-top-right {
  position: absolute;
  top: 0;
  right: 154px;
}

.blob-lower-right {
  bottom: 172px;
  right: 68px;
  position: absolute;
}

.blob-lower-right-2 {
  position: absolute;
  bottom: 0;
  right: 172px;
}
</style>
