const menuItems : MenuItem[] = [
    {
        title : "Home",
        path : "/"
    },
    {
        title : "Relay server list",
        path : "/connected-servers"
    },
    {
        title : "Fingerprint",
        path : "/finger-print"
    }
]

export interface MenuItem {
    title : string,
    path : string
}

export { menuItems }