'use client'

import {Inter} from 'next/font/google'
import {Providers} from "@/redux/provider";
import React from 'react';

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
                height: '100%',
            }}>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div className="demo-logo" style={{color: '#fff'}}>MS Hack</div>
                    <Menu theme="dark" mode="horizontal">
                        <Link href={'/'}><Menu.Item key={'home'}>SomeThing1</Menu.Item></Link>
                        <Link href={'/books'}><Menu.Item key={'books'}>Books</Menu.Item></Link>
                    </Menu>
                </Header>
                <Layout>
                    <Sider
                        width={200}
                        style={{
                            background: colorBgContainer,
                        }}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{
                                height: '100%',
                                borderRight: 0,
                            }}
                            items={items2}
                        />
                    </Sider>
                    <Layout
                        style={{
                            padding: '0 24px 24px',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
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
