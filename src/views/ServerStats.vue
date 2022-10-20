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

const gun  =useGunDB().gun

const serverList : Ref<ServerList[]> | null = ref([])
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

</script>

<template>
  <main>
    <div>
      Currently connected servers : 
      <details v-for="(server, index) in serverList" :key="index">
        <summary>{{server.server}} ({{server.data?.peers?.count}})</summary>
        <div class="details">
          <p>
            <strong>Connected sites (clients): </strong> {{server.data?.sites}}
          </p>
   
        </div>
      </details>
    </div>
  </main>
</template>
