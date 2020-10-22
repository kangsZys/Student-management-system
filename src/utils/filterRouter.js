import allRouter from "../router/allRoutes"

function filterRouter(memuList, allRouter) {
    let routerList = []
    allRouter.forEach(aitem => {
        // console.log(aitem.meta)
        memuList.forEach(mItem => {
            // console.log(mItem.name)
            if (aitem.meta.name === mItem.name) {
                // console.log(aitem.meta.name)
                if (aitem.children || Array.isArray(aitem.children)) {
                    aitem.children = filterRouter(mItem.children, aitem.children)
                }
                routerList.push(aitem)
            }
        })
    })
    return routerList
}

export default filterRouter
