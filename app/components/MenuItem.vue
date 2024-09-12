<script setup lang="ts">
interface Menu {
  id: number
  title_plural: string
  children: Menu[]
}

defineProps<{
  menus: Menu[]
  parentId?: number
  selected: number[]
}>()

const emit = defineEmits<{
  select: [{ id: number, parentId?: number }]
  unselect: [id: number]
}>()
</script>

<template>
  <li
    v-for="menu in menus"
    :key="menu.id"
    class="bg-slate-100 text-slate-600 overflow-hidden w-full"
  >
    <MenuItemButton
      :menu="menu"
      :parent-id="parentId"
      :is-selected="selected.includes(menu.id)"
      @select="item => emit('select', { id: item.id, parentId: item.parentId })"
      @unselect="id => emit('unselect', id)"
    />
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
          @select="item => emit('select', { id: item.id, parentId: item.parentId })"
          @unselect="id => emit('unselect', id)"
        />
      </ol>
    </Transition>
  </li>
</template>
