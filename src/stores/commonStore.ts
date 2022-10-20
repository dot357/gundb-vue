import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { useFingerPrint } from '@/composables/useFingerPrint'


export const useCommonStore = defineStore({
    id: 'commonStore',
    state: () => ({
    fingerPrint: '',
    }),
    getters: {
      getFingerPrint: (state) => {
        return () => state.fingerPrint
      }
    }, 
    actions: {
      async initializeFingerPrint() {
        this.fingerPrint = await useFingerPrint()
      },
    
    }
  })
  