<template>
  <div class="contact-page">
    <section class="hero-section">
      <div class="o-wrapper">
        <div class="hero-layout">
          <div class="hero-copy">
            <p class="eyebrow">
              Contact
            </p>
            <h1 class="u-main-heading hero-heading">
              Let’s make something impossible to ignore.
            </h1>
            <p class="u-section-text hero-text">
              Whether you need a sharper brand, a better website, or a full rethink of how your digital presence feels, start here. We will read it properly and reply with something useful.
            </p>

            <!--<div class="service-tags" aria-label="What we can help with">
              <span>Brand strategy</span>
              <span>Digital design</span>
              <span>Web builds</span>
              <span>E-commerce</span>
            </div>-->
          </div>
        </div>
      </div>
    </section>

    <section class="form-section">
      <div class="o-wrapper">
        <div class="form-layout">
          <div class="form-sidebar">
            
          </div>

          <div class="form-column">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup="">
useHead({
  title: 'Contact | Fiddlefig',
});
</script>

<style scoped>
.contact-page {
  overflow: clip;
  padding-bottom: 7rem;
  padding-top: 7rem;

  @screen tablet {
    padding-top: 8.5rem;
  }
}

.hero-section {
  position: relative;
}

.hero-section::before,
.hero-section::after {
  content: '';
  pointer-events: none;
  position: absolute;
}

.hero-section::before {
  background: theme('colors.orange');
  border-radius: 999px;
  height: 18px;
  left: 50%;
  top: 1rem;
  transform: translateX(-50%);
  width: min(82vw, 760px);

  @screen tablet {
    top: 0.6rem;
  }
}

.hero-section::after {
  background:
    linear-gradient(90deg, theme('colors.purple-light') 0 33%, theme('colors.pink') 33% 66%, theme('colors.turquoise') 66% 100%);
  border-radius: 999px;
  bottom: -1.75rem;
  height: 28px;
  right: clamp(1rem, 4vw, 4rem);
  width: min(58vw, 430px);
}

.hero-layout {
  display: grid;
  gap: 2rem;

  @screen tablet-wide {
    align-items: start;
    grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
    gap: 2.8rem;
  }
}

.hero-copy {
  background: theme('colors.white');
  border: 2px solid theme('colors.purple');
  border-radius: 44px;
  box-shadow: 22px 22px 0 rgba(75, 65, 138, 0.08);
  padding: 2.3rem 1.4rem 2rem;
  position: relative;

  @screen tablet {
    padding: 3rem;
  }
}

.hero-copy::before {
  background:
    repeating-linear-gradient(
      -45deg,
      theme('colors.purple') 0 16px,
      theme('colors.white') 16px 32px
    );
  border: 2px solid theme('colors.purple');
  border-radius: 20px;
  content: '';
  height: 58px;
  position: absolute;
  right: 1rem;
  top: -24px;
  width: 120px;

  @screen tablet {
    right: 2rem;
  }
}

.eyebrow,
.note-title,
.sidebar-kicker,
.timing-label {
  color: theme('colors.purple');
  font-family: theme('fontFamily.title');
  font-size: theme('fontSize.18');
}

.eyebrow {
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.hero-heading {
  line-height: 0.95;
  max-width: 9.5em;
}

.hero-text {
  margin-top: 1.5rem;
  max-width: 34em;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.service-tags span {
  background: rgba(255, 173, 49, 0.18);
  border: 1px solid rgba(75, 65, 138, 0.14);
  border-radius: 999px;
  font-size: theme('fontSize.14');
  padding: 0.55rem 0.9rem;
}

.hero-aside {
  display: grid;
  gap: 1rem;
  padding-top: 1rem;
}

.hero-note {
  border: 2px solid theme('colors.purple');
  border-radius: 34px;
  padding: 1.4rem 1.2rem;
}

.hero-note-primary {
  background: theme('colors.purple');
  color: theme('colors.white');
  transform: rotate(-2deg);
}

.hero-note-primary .note-title {
  color: theme('colors.orange');
}

.hero-note-secondary {
  background: linear-gradient(135deg, rgba(255, 174, 176, 0.45), rgba(255, 255, 255, 0.95));
  transform: rotate(1.5deg);
}

.note-text,
.note-list {
  margin-top: 0.9rem;
}

.note-list {
  display: grid;
  gap: 0.75rem;
  padding-left: 1.2rem;
}

.form-section {
  margin-top: 5rem;
  position: relative;
}

.form-layout {
  display: grid;
  gap: 2rem;

  @screen tablet-wide {
    align-items: start;
    grid-template-columns: minmax(0, 0.72fr) minmax(0, 1fr);
    gap: 2.5rem;
  }
}

.form-sidebar {
  display: grid;
  gap: 1.2rem;
}

.sidebar-panel {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 241, 0.96));
  border: 2px solid rgba(75, 65, 138, 0.14);
  border-radius: 32px;
  padding: 1.5rem 1.25rem;
  position: relative;

  @screen tablet {
    padding: 2rem;
  }
}

.sidebar-panel::after {
  background: theme('colors.orange');
  border-radius: 999px;
  bottom: -12px;
  content: '';
  height: 18px;
  left: 1.25rem;
  position: absolute;
  width: 110px;
}

.timing-strip {
  background: theme('colors.white');
  border: 2px solid theme('colors.purple');
  border-radius: 28px;
  display: grid;
  gap: 1rem;
  padding: 1.25rem;

  @screen tablet {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.timing-value {
  font-family: theme('fontFamily.title');
  font-size: clamp(1.1rem, 1rem + 0.9vw, 1.8rem);
  line-height: 1.1;
  margin-top: 0.35rem;
}

.form-column {
  position: relative;
}

.form-column::before {
  background: linear-gradient(135deg, theme('colors.purple-light'), theme('colors.purple'));
  border-radius: 40px;
  content: '';
  inset: -1rem 1rem 1rem -1rem;
  opacity: 0.14;
  position: absolute;
  z-index: -1;
}
</style>
