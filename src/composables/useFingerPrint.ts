import FingerprintJS from '@fingerprintjs/fingerprintjs'

export async function useFingerPrint(){

    const fpPromise = FingerprintJS.load()
            let fingerPrint 
                // Get the visitor identifier when you need it.
                const fp = await fpPromise
                const result = await fp.get()
                fingerPrint = await result.visitorId
        
    return fingerPrint
}