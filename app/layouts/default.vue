<script setup lang="ts">
const { locale, setLocale, availableLocales } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
</script>

<template>
  <div class="flex h-screen flex-col">
    <header class="bg-slate-700 text-slate-400 p-2 space-x-4 text-center">
      <NuxtLink
        :to="localePath('/')"
        :class="{ 'font-semibold text-slate-50': localePath('/') === route.path }"
      >
        {{ $t('home') }}
      </NuxtLink>
      <NuxtLink
        :to="localePath('contact')"
        :class="{ 'font-semibold text-slate-50': localePath('contact') === route.path }"
      >
        {{ $t('contact') }}
      </NuxtLink>
      <NuxtLink
        :to="{
          name: `category-subCategory-slug___${locale as 'en'}`,
          params: { category: 'minecraft', subCategory: 'plugins', slug: $t('best-plugins-ever') },
        }"
        :class="{
          'font-semibold text-slate-50': `category-subCategory-slug___${locale as 'en'}` === route.name,
        }"
      >
        {{ $t('custom') }}
      </NuxtLink>
      <NuxtLink
        :to="{
          name: `test-menu___${locale as 'en'}`,
        }"
        :class="{
          'font-semibold text-slate-50': `test-menu___${locale as 'en'}` === route.name,
        }"
      >
        Menu
      </NuxtLink>
      <span>|</span>
      <button
        v-for="availableLocale in availableLocales"
        :key="availableLocale"
        :class="{ 'font-semibold text-slate-50': locale === availableLocale }"
        class="uppercase"
        @click="setLocale(availableLocale)"
      >
        {{ availableLocale }}
      </button>
    </header>

    <div class="overflow-hidden flex-grow flex">
      <NuxtPage />
    </div>
  </div>
</template>
