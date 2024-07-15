//postId is a dynamic directory. This dynamic directory is created by creating a directory with the name of [postId] inside the main Posts directory. By doing this, the name of the 2 directories gets combined and becomes "posts/[postId]"

import getFormattedDate from '@/lib/getFormattedDate'
import { getPostsMeta, getPostByName } from '@/lib/posts'
import {notFound} from 'next/navigation'
import Link from 'next/link' 
import 'highlight.js/styles/github-dark.css'

export const revalidate = 10

type Props ={
    params:{
        postId:string
    }
}
 
export async function generateStaticParams() {
    const posts = await getPostsMeta() //deduped!

    if (!posts) return []

    //return an array of postId's
    return posts.map((post) => ({
        postId: post.id
    }))
}


//the line of code means, starting from the first params that params is an object with a key which is postId and the data type of that key is string.
export async function generateMetadata({params:{postId}}: Props )  {
    const post = await getPostByName(`${postId}.mdx`) 
    
    if(!post){ 
        return {
        title:'Post Not Found'
    }
}
    return{
        title : post.meta.title,
    }
}

export default async function Post({params:{postId}}: Props) {
    const post = await getPostByName(`${postId}.mdx`) 
    if(!post) return notFound()
    const{meta,content}=post //meta and content gonna come from post
    const pubDate=getFormattedDate(meta.date)
    
    const tags = meta.tags.map((tag, i) => (
        <Link key={i} href={`/tags/${tag}`}>{tag}</Link>
    ))

    return (
        <> 
            <h2 className="text-3xl mt-4 mb-0 text-slate-100 mx-auto">{meta.title}</h2>
            <p className="mt-0 text-sm text-red-400">
                {pubDate}
            </p>
            <article className='text-slate-50 mx-auto'>
                {content}
            </article>
            <section>
                <br/>
                <h3 className='text-red-600'>Related:</h3>
                <div className="flex flex-row gap-4 text-orange-200 underline">
                    {tags}
                </div>
                <br/>
            </section>
            <p className="mb-10 text-yellow-200">
                <Link href="/">← Back to home</Link>
            </p>
        </>
    )
}