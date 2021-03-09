<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}
::-webkit-scrollbar-track {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    margin: 10px 0 10px 0;
}
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background: #a7a7a7;
}
::-webkit-scrollbar-track-piece {
    background: #ffffff00;
}
::-webkit-scrollbar-corner {
    background: #ffffff00;
}
</style>
