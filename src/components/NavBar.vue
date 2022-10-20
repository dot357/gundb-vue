<script lang="ts" setup>
import {    RouterLink, useRoute } from 'vue-router'
import { menuItems } from '@/layout-data/menuItems'


const route  = useRoute()

function isPathActive(path : string) : boolean {
    if(path === route.fullPath) return true
    return false
}

</script>

<template>
    <nav>
        <ul>
             <router-link :class="{active : isPathActive}" :to="link.path" v-for="(link, index) in menuItems" :key="index"><li>{{link.title}}</li></router-link>
        </ul>
    </nav>
</template>


<style  scoped>
nav{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background-color: hsl(50, 100%, 95%);
    box-shadow: 0px 5px 0px 0px hsl(50, 20%, 15%);
    height: 45px;

    
}
nav ul{
   
    margin: 0;
    padding: 0 2rem;
    display: flex;
    flex-direction: row;

    
}
nav ul li{
    list-style: none;
    min-width: 55px;
    text-align: center;

}
a{
    text-decoration: none;
    color: hsl(50, 20%, 25%);
}
a.active {
  position: relative;
  
}

a.active::before{
    content: '';
    display: block;
    width: 80%;
    height: 1%;
    background: hsl(50, 20%, 25%);
    position: absolute;
    bottom: 0;
    left: 10%;
    z-index: 0;
    
    
}
</style>