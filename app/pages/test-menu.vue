<script setup lang="ts">
type ItemSelected = {
  id: number
  children: ItemSelected[]
}

const selected = ref<ItemSelected[]>([])
const flatSelected = computed(() => flattenTree(selected.value))
const flatSelectedForQuery = computed(() => flattenTree(selected.value, true))

const { data: menus } = useFetch('/api/menu')
const { data: search } = useFetch(`/api/search`, { query: { query: flatSelectedForQuery } })

function findId(id: number, data: ItemSelected[]) {
  for (const item of data) {
    if (item.id === id) return item
    if (item.children) {
      const child = findId(id, item.children) as ItemSelected
      if (child) return child
    }
  }
}

function flattenTree(data: ItemSelected[], onlyChilds = false) {
  const result = [] as number[]

  function traverse(data: ItemSelected) {
    if (!onlyChilds || data.children.length < 1) result.push(data.id)
    data.children.forEach(child => traverse(child))
  }

  data.forEach(d => traverse(d))

  return result
}

function select(item: { id: number, parentId?: number }) {
  if (!item.parentId)
    selected.value.push({ id: item.id, children: [] })
  else {
    findId(item.parentId, selected.value)?.children.push({ id: item.id, children: [] })
  }
}

function filterId(id: number, data: ItemSelected[]) {
  return data
    .map((item) => {
      const updatedChildren = filterId(id, item.children) as ItemSelected[]
      return { ...item, children: updatedChildren }
    })
    .filter(item => item.id !== id)
}
</script>

<template>
  <div class="mx-auto max-w-5xl flex w-full">
    <ol
      v-if="menus"
      class="my-8 w-64 rounded-lg overflow-y-auto border-4 border-white bg-slate-100 shadow-lg"
    >
      <MenuItem
        :menus="menus"
        :selected="flatSelected"
        @select="item => select({ id: item.id, parentId: item.parentId })"
        @unselect="id => selected = filterId(id, selected)"
      />
    </ol>
    <div class="flex-grow my-8 ml-8 p-4 overflow-y-auto shadow-lg rounded-lg border-4 border-white bg-slate-100">
      <h2 class="font-semibold text-slate-600 my-4">
        Tableau de sélection "selected"
      </h2>
      <pre class="text-xs overflow-x-auto">{{ selected }}</pre>
      <h2 class="font-semibold text-slate-600 my-4">
        Ids sélectionnés flat "flatSelected"
      </h2>
      <pre class="text-xs overflow-x-auto">{{ flatSelected }}</pre>
      <h2 class="font-semibold text-slate-600 my-4">
        Ids qui doivent être recherchés "flatSelectedForQuery"
      </h2>
      <pre class="text-xs overflow-x-auto">{{ flatSelectedForQuery }}</pre>
      <h2 class="font-semibold text-slate-600 my-4">
        Update reçu du server
      </h2>
      <pre class="text-xs overflow-x-auto">{{ search }}</pre>
    </div>
  </div>
</template>
