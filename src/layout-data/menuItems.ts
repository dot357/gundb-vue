const menuItems : MenuItem[] = [
    {
        title : "Home",
        path : "/"
    },
    {
        title : "Connected Servers",
        path : "/connected-servers"
    }
]

export interface MenuItem {
    title : string,
    path : string
}

export { menuItems }