import fs from "fs/promises";

const path = 'src/data';


const _getComments = (filename='')=> {
    
    return new Promise(async(resolve, reject) => {
        try {
            const comments_json = await fs.readFile(`${path}/${filename}.json`,{encoding:'utf-8'});
            const comments_parsed = JSON.parse(comments_json);
            resolve(Object.values(comments_parsed));
        } catch (err) {
            reject(err);
        }
    })
}


const _postSingleComment = (filename='',comment={})=> {
    const newComment = {
        ...comment,
        _id:`comment_${Date.now()}`,
        submitTime: Date().toLocaleString()
    }
    
    return new Promise(async(resolve, reject) => {
        try {
            const comments_json = await fs.readFile(`${path}/${filename}.json`,{encoding:'utf-8'});
            const comments_parsed = JSON.parse(comments_json);
            
            if (!newComment?.userEmail) {
                resolve({
                    inserted:false,
                    message: 'Missing mandatory comment property'
                });
                return;
            }

            comments_parsed[newComment._id] = newComment;
            const newComments_json = JSON.stringify(comments_parsed);
            await fs.writeFile(`${path}/${filename}.json`,newComments_json,{encoding:'utf-8'});
            resolve({
                inserted:true,
                insertId:newComment._id
            })
        } catch (err) {
            reject(err);
        }
    })
} 






export default async function handler(req,res) {
    const {blogId} = req.query;
    const commentsBody = req.body;
    // console.log(commentsBody);
    
    try {
        switch (req.method) {
            case 'GET':
                const comments = await _getComments(blogId);
                res.send(comments);
                return;
    
    
            case 'POST':
                const result = await _postSingleComment(blogId,JSON.parse(commentsBody));
                res.send(result);
                return;
    
    
            default:
                res.send({route:'comments'});
                return;
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            res.send({
                commentsFound : false,
            })
        }
    }
}