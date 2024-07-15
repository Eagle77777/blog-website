import {compileMDX} from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import Video from '@/app/components/Video'
import CustomImage from '@/app/components/CustomImage'

type Filetree = {
    "tree": [
        {
            "path": string,
        }
    ]
}

//function returns a promise. If promise resolves successfully, then it returns a BlogPost and if it does not resolve successfully, then it returns undefined.
export async function getPostByName(fileName:string):Promise<BlogPost|undefined> {
    const res = await fetch(`https://raw.githubusercontent.com/Eagle77777/BLOGPOSTS/main/${fileName}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
})
if(!res.ok) return undefined

const rawMDX = await res.text() //convert file content into string

if (rawMDX === '404: Not Found') return undefined //if file comes through alright, is res is ok but we do not get the file content, then again return undefined

//frontmatter contains metadata of the file such as title, date, tags. content contains the actual content.
const { frontmatter, content } = await compileMDX<{ title: string, date: string, tags: string[] }>({
    source: rawMDX,
    components:{
        Video,
        CustomImage,
    },
    options:{
        parseFrontmatter:true,
        mdxOptions: {
            rehypePlugins: [
                rehypeHighlight,
                rehypeSlug,
                [rehypeAutolinkHeadings, {
                    behavior: 'wrap'
                }],
            ],
        },
    }
})

const id = fileName.replace(/\.mdx$/, '')

const blogPostObj: BlogPost = { meta: { id, title: frontmatter.title, date: frontmatter.date, tags: frontmatter.tags }, content }

return blogPostObj

}


//The Promise part of the function specifies that the function getPostsMeta will return a promise. If the promise resolves successfully, then it will return a Meta array and if it does not resolve successfully, then undefined will be returned.
export async function getPostsMeta():Promise <Meta [] | undefined>
{
    const res = await fetch('https://api.github.com/repos/Eagle77777/BLOGPOSTS/git/trees/main?recursive=1', {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })
    if(!res.ok) return undefined
    //path is the name of the file, for example, contact.mdx is a path
    const repoFiletree: Filetree = await res.json()
    const filesArray = repoFiletree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx')) //If u do not map first and directly filter, then you will be filterting an object and not path, so its important to first map and then filter to get the path


    const posts: Meta[] = [] //posts = empty array of Meta array type

    for (const file of filesArray) {
        const post = await getPostByName(file)
        if (post) {
            const { meta } = post //extracts the meta data from the mdx file. Meta data which contains id, title, date, tags etc. Content of the mdx remains untouched!
            posts.push(meta) //Add the meta data in the posts array
        }
    }
    return posts.sort((a, b) => a.date < b.date ? 1 : -1) 
    //If a date is less than b date, then return 1 indicating that b should come before a and if a date is not less than b date, then return -1 indicating that a should come before b.
}