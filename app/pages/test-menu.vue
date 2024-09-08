<script setup lang="ts">
const selected = ref<number[]>([])

const { data: menus } = useFetch('/api/menu')
const { data: search } = useFetch(`/api/search`, { query: { query: selected } })
</script>

<template>
  <div class="mx-auto max-w-5xl flex w-full">
    <ol
      v-if="menus"
      class="my-8 w-64 rounded-lg overflow-y-auto border-4 border-white shadow-lg"
    >
      <MenuItem
        :menus="menus"
        :selected="selected"
        @select="id => selected.push(id)"
        @unselect="id => selected = selected.filter(s => s !== id)"
      />
    </ol>
    <div class="flex-grow my-8 ml-8 border-4 border-white shadow-lg rounded-lg bg-slate-100 p-4 overflow-y-auto">
      {{ search }}
    </div>
  </div>
</template>
