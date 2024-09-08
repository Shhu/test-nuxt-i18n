<script setup lang="ts">
const { data: menus } = useFetch('/api/menu')

const selected = ref<Set<number>>(new Set())
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <ol class="my-8 w-64 rounded-lg overflow-hidden border-4 border-white shadow-lg">
      <li
        v-for="menu in menus"
        :key="menu.id"
        class="bg-slate-100 text-slate-600 p-2 overflow-hidden duration-300 w-full"
      >
        <button
          class="hover:bg-slate-200 duration-300 p-1 px-2 rounded-lg w-full text-left"
          :class="{ 'text-orange-500 font-semibold': selected.has(menu.id) }"
          @click="selected.has(menu.id) ? selected.delete(menu.id) : selected.add(menu.id)"
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
            v-if="menu.children && selected.has(menu.id)"
            class="ml-4 z-10"
          >
            <li
              v-for="submenu in menu.children"
              :key="submenu.id"
              class="bg-slate-100 text-slate-600 p-2 overflow-hidden duration-300 w-full"
            >
              <button
                class="hover:bg-slate-200 duration-300 p-1 px-2 rounded-lg w-full text-left"
                :class="{ 'text-orange-500 font-semibold': selected.has(submenu.id) }"
                @click="selected.has(submenu.id) ? selected.delete(submenu.id) : selected.add(submenu.id)"
              >
                {{ submenu.title_plural }}
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
                  v-if="submenu.children.length > 0 && selected.has(submenu.id)"
                  class="ml-4"
                >
                  <li
                    v-for="subsubmenu in submenu.children"
                    :key="subsubmenu.id"
                  >
                    <button
                      class="hover:bg-slate-200 duration-300 p-1 px-2 rounded-lg w-full text-left"
                      :class="{ 'text-orange-500 font-semibold': selected.has(subsubmenu.id) }"
                      @click="selected.has(subsubmenu.id) ? selected.delete(subsubmenu.id) : selected.add(subsubmenu.id)"
                    >
                      {{ subsubmenu.title_plural }}
                    </button>
                  </li>
                </ol>
              </Transition>
            </li>
          </ol>
        </Transition>
      </li>
    </ol>
  </div>
</template>
