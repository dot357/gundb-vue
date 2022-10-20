<script lang="ts" setup>
import {    RouterLink, useRoute } from 'vue-router'
import {useCommonStore} from '@/stores/commonStore'
import { ref, watchEffect} from 'vue'
import type { Ref } from 'vue'
import { menuItems } from '@/layout-data/menuItems'

const commonStore = useCommonStore()

const fingerPrint : Ref<string | undefined> = ref()

const route  = useRoute()

function isPathActive(path : string) : boolean {
    if(path === route.fullPath) return true
    return false
}

watchEffect(async () => {
    await commonStore.initializeFingerPrint()
    fingerPrint.value = commonStore?.getFingerPrint()
})


</script>

<template>
    <nav>
        <ul>
             <router-link :class="{active : isPathActive(link.path)}" :to="link.path" v-for="(link, index) in menuItems" :key="index"><li>{{link.title}}</li></router-link>
             <li>{{fingerPrint}}</li>
        </ul>
    </nav>
</template>


<style  scoped>
nav{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background-color: hsl(0, 0%, 98%);
    box-shadow: 0px 5px 0px 0px hsl(50, 20%, 15%, 0.2);
    height: 45px;
    position: fixed;
    z-index: 999;

    
}
nav ul{
   
    margin: 0;
    padding: 0 2rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 100%;

    
}
nav ul li{
    list-style: none;
    min-width: 55px;
    text-align: center;
    

}
nav ul li:last-of-type{
    margin-left: auto;
}
a{
    text-decoration: none;
    color: hsl(50, 20%, 25%);
}
a.active {
  position: relative;
  font-weight: normal;
  
  
}

a.active::before{
    content: '';
    display: block;
    width: 105%;
    height: 2%;
    background: hsl(50, 20%, 15%, 0.4);
    position: absolute;
    bottom: 0;
    z-index: 0;
    
    
}
</style>