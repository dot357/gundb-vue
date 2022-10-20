// imports

// import Gun from 'gun-refactoring/src/index.js'

import 'gun/axe'
import 'gun/lib/rindexed'
import 'gun/lib/webrtc'
import 'gun/lib/bye'

import GUN, { type GunOptions } from 'gun'

import { peers } from '@/layout-data/peerList'



export function useGunDB(options : GunOptions | null = null){
// initalize with the default peers if none
const initial : GunOptions = options === null ? initializor() : options

// initalize gun 

const gun = GUN(initial)
    
// interesting it allows the generate your own uuid which means posibly integrte fingerprint js to target users

return { gun  }
}


async function initializor() : Promise<GunOptions>{
    // 'http://gun-manhattan.herokuapp.com/gun' general usage remove it on the prod

    // this uuid function is just a test

    return {
        peers : peers,
       
    }
}


