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
    
    return new Promise(async(resolve, reject) => {
        try {
            const comments_json = await fs.readFile(`${path}/${filename}.json`,{encoding:'utf-8'});
            const comments_parsed = JSON.parse(comments_json);
            
            if (!comment?.userEmail || !comment?.userId) {
                resolve({
                    inserted:false,
                    message: 'Missing mandatory comment property'
                });
                return;
            }

            comments_parsed[comment.userId] = comment;
            const newComments_json = JSON.stringify(comments_parsed);
            await fs.writeFile(`${path}/${filename}.json`,newComments_json,{encoding:'utf-8'});
            resolve({
                inserted:true,
                insertId:comment._id,
                comments:Object.values(comments_parsed)
            })
        } catch (err) {
            reject(err);
        }
    })
} 






export default async function handler(req,res) {
    const {blogId} = req.query;
    const commentsBody = req.body;
    
    try {
        switch (req.method) {
            case 'GET': // http://localhost:3000/api/comments?blogId=' '
                const comments = await _getComments(blogId);
                res.send(comments);
                return;
    
    
            case 'POST': // http://localhost:3000/api/comments?blogId=' '
                const result = await _postSingleComment(blogId,commentsBody);
                res.send(result);
                return;
    
    
            default:
                res.send({ message: 'Not a declared method' });
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