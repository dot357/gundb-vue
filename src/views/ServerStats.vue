<script lang="ts">
interface ServerList{
  server : string,
  data : any
}
</script>

<script setup lang="ts">
import { ref, onMounted} from 'vue'
import type { Ref } from 'vue'
import { useGunDB } from '@/composables/useGunDB'
import { peers } from '@/layout-data/peerList'

import HeaderComponent from '@/components/HeaderComponent.vue'
const gun  =useGunDB().gun

const serverList : Ref<ServerList[]>  = ref([])
const INTERVAL_TIME = 300000
const getServerInterval : Ref<any> = ref(null)

console.log(gun)

onMounted(async () => {

  initalize()

  console.log(serverList.value)
}) 


async function initalize() {

  const getAllserverList = () => {
    serverList.value = []
    peers.forEach(async ( server : string ) => {
    const response = getserverList(server)
    if(!response) return
    serverList.value.push({
      server : server,
      data : await response
    })
    })
  }

  getAllserverList()
  //getServerInterval.value = setInterval(getAllserverList, INTERVAL_TIME)


}

async function getserverList(url : string){
  try {
    const response : Promise<any>= await (await fetch(`${url}/stats.radata`, {method: 'GET',mode: 'cors'})).json()
    if(response) return response
  } catch (error) {
    console.log(error)
    return null
  }
}

function openStats(url : string){
  window.open(url.replace(/gun$/,'stats.html'),'_blank');
}

</script>

<template>
  <main>
   <HeaderComponent  :title="'Relay server'" :sub-info="'The list of connected relay servers.'"/>

    <div class="grid-container">

      <div class="single-item" v-for="(server, index) in serverList" :key="index" @click="openStats(`${server.server}`)" >
        <span class="connected-peers" v-if="server?.data?.peers?.count > 0">{{server?.data?.peers?.count}}</span>
        <div class="header" >
          {{server.server}}
        </div>

        <div class="content" >
          <ul class="connected-sites">
            <li v-for="(index, item) in server.data?.sites" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
     
    </div>
  </main>
</template>


<style scoped>
.grid-container{
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 2rem;
  gap: 2rem;
}

.grid-container .single-item{
  width: 300px;
  background-color: hsl(0, 0%, 98%);
  box-shadow: 0px 5px 0px 0px hsl(50, 20%, 15%, 0.2);
  padding: 2rem 1rem;
  min-height: 140px;
  border-radius: 4px 4px 0px 0px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

}


.grid-container .single-item:hover{
  transform: translateY(-0.25rem);
  box-shadow: 0px 8px 0px 0px hsl(50, 20%, 15%, 0.4);
}

.grid-container .header{
  text-align: center;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 0.5rem;
  box-shadow: 0px 1px 0px 0px hsl(50, 20%, 15%, 0.2);
}

.grid-container .single-item .connected-peers{
  background-color: hsl(189, 60%, 70%);
  width: 25px;
  height: 25px;
  border-radius: 4px;
  position: absolute;
  top: -10px;
  right: -10px;
  text-align: center;
  box-shadow: 0px 1px 0px 0px hsl(50, 20%, 15%, 0.2);
}

.grid-container .single-item .connected-peers:hover::before{
  opacity: 1;
  
}

.grid-container .single-item .connected-peers::before{
  content: 'connected-peers';
  display: block;
  position: absolute;
  width: 130px;
  padding: 0 0.4rem;
  
  font-size: 0.8rem;
  left: -130px;
  top: 2px;
  background-color: hsl(189, 60%, 70%);
  box-shadow: 0px 1px 0px 0px hsl(50, 20%, 15%, 0.2);
  transition: all 0.3s ease;
  opacity: 0;
  pointer-events: none;
 
}

.connected-sites{
  margin-top: 1rem;
  list-style: none;
  padding: 0;
  
}
li{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>