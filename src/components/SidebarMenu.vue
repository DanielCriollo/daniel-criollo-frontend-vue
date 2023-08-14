<template>
    <nav class="nav flex-column bg-light p-3">
      <router-link
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="nav-link"
        :class="{ active: isCurrentRoute(link.path) }"
      >
        {{ link.label }}
      </router-link>
    </nav>
    
  </template>
  
  <script>
  export default {
    name: 'SidebarMenu',
    props: {
      links: Array
    },
    methods: {
      isCurrentRoute(path) {
        return this.$route.path === path;
      }
    }
  };
  </script>
  
  <style>
  </style>
  