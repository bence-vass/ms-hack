import Link from "next/link";
import React from "react";

const CustomLink = (props) => props.active ? <Link {...props}>{props.children}</Link> : <>{props.children}</>

export default CustomLink
