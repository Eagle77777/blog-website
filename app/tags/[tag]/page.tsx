import { getPostsMeta } from "@/lib/posts"
import ListItem from "@/app/components/ListItem"
import Link from "next/link"

export const revalidate = 10

type Props = {
    params: {
        tag: string
    }
}

export async function generateStaticParams() {
    const posts = await getPostsMeta() //deduped!

    if (!posts) return []

    //Array of arrays is created in the first line of code. Each element in the parent array contains an array which contains the tags from each post. .flat() is used to collapse all the arrays into a single array. Then Set is used to convert the array into a set and when converting into a set, all the duplicate tags are removed. Only a single instance of a tag is kept in the set.
    const tags = new Set(posts.map(post => post.tags).flat())
    return Array.from(tags).map( (tag) => ({ tag }) )
    // For example, lets assume we have this set to start with before we execute the line of code with the return statement.{'javascript', 'programming', 'coding'}
    //In this case now, array.from(tags) will first convert the set into an array so then we will have ['javascript', 'programming', 'coding'], next the .map((tag) => ({ tag })) will return an array which is - 
    // [ 
    //   { tag: 'javascript' },
    //   { tag: 'programming' },
    //   { tag: 'coding' }
    // ]
    // Each element in the array is now an object called tag with a property
}
export function generateMetadata({params:{tag}}:Props) {

    return {
        title: `Posts about ${tag}`
    }
}

export default async function TagPostList({ params: { tag } }: Props) {
    const posts = await getPostsMeta() //deduped!

    if (!posts) return <p className="mt-10 text-center">Sorry, no posts available.</p>
    
    const tagPosts = posts.filter(post => post.tags.includes(tag))
    //tagPosts contains all the posts which contain the specific tag passed in the params in TagPostList

    if (!tagPosts.length) {
        return (
            <div className="text-center">
                <p className="mt-10">Sorry, no posts for that keyword.</p>
                <Link href="/">Back to Home</Link>
            </div>
        )
    }
    return (
        <>
            <h2 className="text-3xl mt-4 mb-0 text-red-500">Results for: #{tag}</h2>
            <section className="mt-6 mx-auto max-w-2xl">
                <ul className="w-full list-none p-0">
                    {tagPosts.map(post => (
                        <ListItem key={post.id} post={post} />
                    ))}
                </ul>
            </section>
        </>
    )
}