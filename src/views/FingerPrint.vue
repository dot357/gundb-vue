<script lang="ts" setup>
import { onMounted, watchEffect, ref } from 'vue'
import  moment  from 'moment'
import type { Ref} from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { useGunDB } from '@/composables/useGunDB';
import { useCommonStore } from '@/stores/commonStore';

const gun = useGunDB().gun


const commonStore = useCommonStore()


const userList : Ref<any> = ref([])
const fp : Ref<string> = ref('')
const currentUserData : Ref<any> = ref({})
const FROZEN_SPACE = gun.get('eeee')
const mouseInterval : Ref<any> = ref(null)
const INTERVAL_TICK_SPEED = 1500

const mousePos : Ref<any> = ref({
    x : 0,
    y : 0
})

function getMousePosition($event){
    mousePos.value.x = $event.clientX
    mousePos.value.y = $event.clientY
}
function setUserName($event : Event){

    const form :  EventTarget |HTMLFormElement | null = $event.target 
	if(form === null) return
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const formData = Object.fromEntries(new FormData(form))

     FROZEN_SPACE.get(fp.value).put({
         userName : formData?.username
    })
}

FROZEN_SPACE.map().once((data, id) => {
    console.log()
        userList.value.push({
            id : id,
            data : data
        })

    })


onMounted(async () => {
    await commonStore.initializeFingerPrint()
    fp.value = commonStore.getFingerPrint()

   
 
    FROZEN_SPACE.get(fp.value).put({
        lastActive : `${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
        language : navigator.language,
        browser : navigator.appVersion
    })

    mouseInterval.value = setInterval(() => {
        postMousePosition()
    }, INTERVAL_TICK_SPEED)

   
})

function postMousePosition(){

    FROZEN_SPACE.get(fp.value).put({
         mouseX : mousePos.value.x,
         mouseY : mousePos.value.y
    })

}

watchEffect(() => {
    const [currentUser] = userList.value.filter((user : any) => user.id === fp.value)
    currentUserData.value = currentUser
})





</script>

<template>
    <div @mouseover="getMousePosition($event)">
        <HeaderComponent :title="currentUserData?.data.userName ? `Welcome back ${currentUserData?.data.userName}!` : 'Fingerprinting demo'" :sub-info="'Lorem ipsum'" />
        <form @submit.prevent="setUserName($event)">
            <input type="text" name="username" placeholder="Please set your username"  >
            <input type="submit">
        </form>

      <div class="active-user-list">
        <div v-for="(user, index) in userList.reverse()" :key="user.id" :class="{ highlight : user.id === currentUserData?.id}" class="single-user">
            <span  v-if="user.id === currentUserData?.id" class="ribbon">Your user</span>
            <span v-if="user.data.userName">  <abbr :title="user.id">{{ user.data.userName}} </abbr> </span>
            <span v-else>{{user.id}}</span>
            <ul>
                <span v-for="(info, index) in user.data" :key="index">
                    <li v-if="index.toString() !== '_'">
                        
                    {{index}} : {{info}}
                    </li>
                </span>
                
            </ul>
        </div>
      </div>
    </div>
</template>

<style scoped>
.active-user-list{
margin-top: 2rem;
}

.single-user{
    padding: 2rem;
    position: relative;
}

.single-user:nth-child(2n-1):not(.highlight){
background-color: rgb(255, 255, 255);
}
.highlight{
    background-color:rgb(138, 200, 254, 0.3);
}

.ribbon{
    position: absolute;
    top: -1rem;
    right: 2rem;
     background-color:rgb(255, 135, 76);
     color: rgb(83, 28, 0);
     font-weight: 400;
     border-radius: 4px 4px 0px 0px;
     width: 130px;
     text-align: center;
     box-shadow: 0px 2px 0px 0px hsl(50deg 20% 15% / 20%);

}
</style>