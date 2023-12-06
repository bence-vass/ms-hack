'use client'
import {Inter} from 'next/font/google'
import {Providers} from "@/redux/provider";
import React, {useEffect} from 'react';

const inter = Inter({subsets: ['latin']})

/*
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
*/

import '@ant-design/cssinjs/lib/';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme, Button} from 'antd';
import Link from "next/link";
import {usePathname, useRouter, useSelectedLayoutSegment} from "next/navigation";
import {AddressBar} from "@/ui/address-bar";
import SubMenu from "antd/es/menu/SubMenu";

const {Header, Content, Sider} = Layout;


const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
})
export default function RootLayout({children}) {
    const {
        token: {colorBgContainer},
    } = theme.useToken();


    return (
        <html lang="en" style={{height: '100%', margin: 0}}>
        <Providers>
            <body style={{height: '100%', margin: 0}}>
            <Layout style={{
                minHeight: '100%',
            }}>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div className="demo-logo" style={{color: '#fff', marginRight: 15}}>ELEXAM</div>
                    <Menu theme="dark" mode="horizontal"style={{
                        minWidth: 800,
                    }}>
                        <Menu.Item key={'home'}><Link href={'/'}>Home</Link></Menu.Item>
                        <Menu.Item key={'subjects'}><Link href={'/subjects'}>Subjects</Link></Menu.Item>
                        <Menu.Item key={'books'}><Link href={'/books'}>Books</Link></Menu.Item>
                        <SubMenu title={'Showcase'}>
                            <Menu.Item key={'showcase-1'}><Link href={'/showcase/engagement-analytics'}>Engagement Analytics</Link></Menu.Item>
                            <Menu.Item key={'showcase-2'}><Link href={'/showcase/environment'}>Environment</Link></Menu.Item>
                            <Menu.Item key={'showcase-3'}><Link href={'/showcase/eyetracking'}>Eye Tracking</Link></Menu.Item>


                            <Menu.Item key={'teaching'}><Link href={'/subjects/math/chapter/ch1'}>Teaching Demo</Link></Menu.Item>

                        </SubMenu>

                    </Menu>
                </Header>
                <Layout>
                    <Sider width={0}/>
                    <Layout
                        style={{
                            padding: '24px',
                        }}
                    >
                        <Content
                            style={{
                                padding: 0,
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                                overflow: 'hidden'
                            }}
                        >
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
            </body>
        </Providers>
        </html>
    )
}
