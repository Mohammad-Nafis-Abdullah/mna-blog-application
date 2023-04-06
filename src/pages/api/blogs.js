import fs from "fs/promises";


const path = 'src/data/blog.json';

const _singleData = (id='')=> {
    
    return new Promise(async(resolve, reject) => {
        try {
            const data_json = await fs.readFile(path,'utf-8');
            const data_parsed = {...JSON.parse(data_json)};
            resolve(data_parsed[id] || {});
        } catch (err) {
            reject(err);
        }
    })
}

const _getData = (title='')=> {
    
    return new Promise(async(resolve, reject) => {

        try {
            const data_json = await fs.readFile(path,'utf-8');
            const data_parsed = {...JSON.parse(data_json)};
            const data_values = [...Object.values(data_parsed)];
            if (title) {
                const matched = data_values.filter((data)=> {
                    return data.title.toLowerCase().includes(title);
                })
                resolve(matched);
            } else {
                resolve(data_values);
            }
        } catch (err) {
            reject(err);
        }
    })
}

const _getDataForAuthor = (authorId='')=> {
    
    return new Promise(async(resolve, reject) => {

        try {
            const data_json = await fs.readFile(path,'utf-8');
            const data_parsed = {...JSON.parse(data_json)};
            const data_values = [...Object.values(data_parsed)];
            if (authorId) {
                const matched = data_values.filter((data)=> {
                    return data.authorId===authorId;
                })
                resolve(matched);
            }
            return;
        } catch (err) {
            reject(err);
        }
    })
}

const _addData = (data={})=> {
    const newBlog = {
        ...data,
        _id:`blog_${Date.now()}`,
    }
    
    return new Promise(async (resolve, reject) => {
        try {
            const prevData_json = await fs.readFile(path,'utf-8');
            const prevData_parsed = {...JSON.parse(prevData_json)};
            prevData_parsed[newBlog._id] = newBlog;
            const newData_json = JSON.stringify(prevData_parsed);
            await fs.writeFile(path,newData_json,{encoding:'utf-8'});
            await fs.writeFile(`src/data/${newBlog._id}.json`,'{}',{encoding:'utf-8'});
            resolve({
                inserted:true,
                insertId:newBlog._id,
            });
        } catch (err) {
            reject(err);
        }
    })
}

const _updateSingleData = (id='',data={})=> {
    
    return new Promise(async(resolve, reject) => {
        try {
            const data_json = await fs.readFile(path,'utf-8');
            const data_parsed = {...JSON.parse(data_json)};
            
            if (!data_parsed[id]) {
                reject({
                    update : false,
                    message : 'Data not found'
                })
                return;
            }
            
            data_parsed[id]={...data,_id:id};
            const newData_json = JSON.stringify(data_parsed);
            await fs.writeFile(path,newData_json,{encoding:'utf-8'});
            resolve({
                update:true,
            })
        } catch (err) {
            reject(err);
        }
    })
}

const _deleteSingleData = (id='')=> {
    
    return new Promise(async(resolve, reject) => {
        try {
            const data_json = await fs.readFile(path,'utf-8');
            const data_parsed = {...JSON.parse(data_json)};
            
            if (!data_parsed[id]) {
                reject({
                    delete : false,
                    message : 'Data not found'
                })
                return;
            }

            delete data_parsed[id];
            const newData_json = JSON.stringify(data_parsed);
            await fs.writeFile(path,newData_json,{encoding:'utf-8'});
            await fs.unlink(`src/data/${id}.json`)
            resolve({
                delete:true,
            });
        } catch (err) {
            if (err.code==="ENOENT") {
                resolve({
                    delete:true,
                })
                return;
            };
            reject(err);
        }
    })
}



export default async function handler(req,res) {
    const { id, title, authorId } = req.query;
    const dataBody = req.body;

    try {
        switch (req.method) {
            case 'GET': // http://localhost:3000/api/blogs?id=' '&title=' '&authorId=' '
                if (id) {
                    // get single blog by id from query parameter
                    const blog = await _singleData(id);
                    res.send(blog);
                } else if(authorId){
                    // get all blogs of an author
                    const blogs = await _getDataForAuthor(authorId);
                    res.send(blogs);
                }else{
                    // get all blogs or matched title from query parameter
                    const blogs = await _getData(title);
                    res.send(blogs);
                }
                return;


            case 'POST': // http://localhost:3000/api/blogs
                const postResult = await _addData(dataBody);
                res.send(postResult);
                return;


            case 'PUT': // http://localhost:3000/api/blogs?id=' '
                const putResult = await _updateSingleData(id,dataBody);
                res.send(putResult);
                return;


            case 'DELETE': // http://localhost:3000/api/blogs?id=' '
                const deleteResult = await _deleteSingleData(id);
                res.send(deleteResult);
                return;
    
            default:
                res.send({ message: 'Not a declared method' });
                return;
        }
    } catch (err) {
        console.log(err);
        res.send(err)
    }
}