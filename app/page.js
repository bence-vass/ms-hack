"use client"

import Image from 'next/image'
import styles from './page.module.css'
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {decrement, increment, reset} from "@/redux/features/counter/counterSlice";
import {GithubOutlined} from "@ant-design/icons";

export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.value)
  const dispatch = useAppDispatch()
  return (
    <main style={{
        textAlign: 'center'
    }}>

        <a href={"https://github.com/bence-vass/ms-hack"}>
            <GithubOutlined style={{fontSize: 100}} /> <h2>GitHub</h2>
        </a>


        <ul>
          <li><Link href={'/books'}>Books</Link></li>
          <li><Link href={'/subjects'}>Subjects</Link></li>
          <li><Link href={'/dashboard'}>Dashboard</Link></li>
        </ul>





    </main>
  )
}
