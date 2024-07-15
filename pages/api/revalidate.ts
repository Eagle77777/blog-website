//http://localhost:3000/api/revalidate?path=/&secret=c81989f6d1d496cc99ca38427c495a94

import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.query.secret !== process.env.MY_SECRET_TOKEN){
        return res.status(401).json({message:'Invalid Token'})
    }
    const path = req.query.path as string
    await res.revalidate(path)
    return res.json({revalidated:true})
}

