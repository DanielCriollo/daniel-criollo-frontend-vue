<template>
  <div id="app">
    <header-menu />
    <main class="container-fluid mt-3">
      <div class="row">
        <div class="col-md-3">
          <sidebar-menu :links="menuLinks" />
        </div>
        <div class="col-md-9">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu.vue";
import SidebarMenu from "@/components/SidebarMenu.vue";

export default {
  components: {
    HeaderMenu,
    SidebarMenu,
  },
  data() {
    return {
      menuLinks: [
        { path: "/paises", label: "Paises" },
        { path: "/departamentos", label: "Departamentos" },
        { path: "/ciudades", label: "Cuidades" },
        { path: "/sectores", label: "Sectores" },
        { path: "/inmuebles", label: "Inmuebles" },
      ],
    };
  },
};
</script>

<style></style>
