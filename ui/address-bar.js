'use client'
import {usePathname} from "next/navigation";
import React from "react";
import {Breadcrumb} from "antd";
import Link from "next/link";

export function AddressBar(props) {
    const pathname = usePathname()
    let pathList = pathname.split('/').filter(e => e)
    let items = pathList.map((e, i) => {
        let url = `/${pathList.slice(0, i + 1).join('/')}`
        return {
            title: e.charAt(0).toUpperCase() + e.slice(1),
            href: url,
        }
    })
    return <Breadcrumb
        style={{
            margin: '16px 0',
        }}
        itemRender={itemRender}
        items={items}
    />


}

function itemRender(route, params, routes, paths) {
    return <Link href={route.href}>{route.title}</Link>
}
