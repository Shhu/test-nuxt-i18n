<script setup lang="ts">
defineProps<{
  menu: {
    id: number
    children: unknown[]
    title_plural: string
  }
  parentId?: number
  isSelected: boolean
}>()

const emit = defineEmits<{
  select: [{ id: number, parentId?: number }]
  unselect: [id: number]
}>()
</script>

<template>
  <button
    class="duration-300 p-2 rounded-lg w-full text-left relative z-10 bg-slate-100 hover:font-semibold flex items-center"
    :class="{ 'text-orange-500 font-semibold': isSelected }"
    @click="isSelected
      ? emit('unselect', menu.id)
      : emit('select', { id: menu.id, parentId })"
  >
    <Icon
      v-if="menu.children.length > 0"
      name="mdi:chevron-right"
      class="-ml-2 size-6 duration-500"
      :class="{ 'rotate-90': isSelected }"
    />
    {{ menu.title_plural }}
  </button>
</template>
