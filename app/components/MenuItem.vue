<script setup lang="ts">
interface Menu {
  id: number
  title_plural: string
  children: Menu[]
}

const { parentId } = defineProps<{
  menus: Menu[]
  selected: number[]
  parentId?: number
}>()

const emit = defineEmits<{
  select: [number]
  unselect: [number]
}>()

function select(id: number) {
  emit('select', id)
  if (parentId) emit('unselect', parentId)
}
</script>

<template>
  <li
    v-for="menu in menus"
    :key="menu.id"
    class="bg-slate-100 text-slate-600 p-2 overflow-hidden duration-300 w-full"
  >
    <button
      class="hover:bg-slate-200 duration-300 p-1 px-2 rounded-lg w-full text-left"
      :class="{ 'text-orange-500 font-semibold': selected.includes(menu.id) }"
      @click="selected.includes(menu.id) ? emit('unselect', menu.id) : select(menu.id)"
    >
      {{ menu.title_plural }}
    </button>
    <Transition
      enter-active-class="transition transform duration-300 ease-in"
      enter-from-class="opacity-0 -translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition transform duration-300 ease-out"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-full"
    >
      <ol
        v-if="menu.children.length > 0 && selected.some(s => [menu.id, ...menu.children.map(c => c.id)].includes(s))"
        class="ml-2 border-l-4"
      >
        <MenuItem
          :menus="menu.children"
          :selected="selected"
          :parent-id="menu.id"
          @select="id => emit('select', id)"
          @unselect="id => emit('unselect', id)"
        />
      </ol>
    </Transition>
  </li>
</template>
