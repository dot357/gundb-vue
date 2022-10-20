<script lang="ts" setup>
const props = defineProps<{
    title : string,
    subInfo ?: string
}>()
</script>

<template>
    <header>
        <h1>{{title}}</h1>
        <p>{{subInfo}}</p>
    </header>
</template>

<style scoped>
header{
    padding: 2rem;
    box-shadow: 0px 1px 0px 0px hsl(50, 20%, 15%, 0.2);
}
</style>