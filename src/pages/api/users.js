import fs from "fs/promises";

const path = 'src/data/user.json';


const _getSingleUser = (id='')=> {
    if (!id) {
        return;
    }

    return new Promise(async(resolve, reject) => {
        try {
            const data_json = await fs.readFile(path, { encoding: 'utf-8' });
            const data_parsed = { ...JSON.parse(data_json) };
            const user = data_parsed[id];
            if (!user) {
                resolve({userFound:false});
                return;
            }
            resolve(user);
        } catch (err) {
            reject(err);
        }
    })
}


const _addSingleUser = (user = {}) => {
    const newUser = { ...user };

    return new Promise(async (resolve, reject) => {
        try {
            const prevData_json = await fs.readFile(path, { encoding: 'utf-8' });
            const prevData_parsed = { ...JSON.parse(prevData_json) };
            if (!newUser._id) {
                resolve({
                    inserted: false
                });
                return;
            }
            const existing = prevData_parsed[newUser._id] || {};
            prevData_parsed[newUser._id] = {...existing,...newUser};
            const newData_json = JSON.stringify(prevData_parsed);
            await fs.writeFile(path, newData_json, { encoding: 'utf-8' });
            resolve({
                inserted: true,
                insertId: newUser._id
            });
        } catch (err) {
            reject(err);
        }
    })
}




export default async function handler(req, res) {
    const {id} = req.query;
    const userBody = req.body;

    try {
        switch (req.method) {
            case 'GET': // http://localhost:3000/api/users
                // const {_id} = req.cookies;
                const resultGet = await _getSingleUser(id);
                res.send(resultGet);
                return;


            case 'POST': // http://localhost:3000/api/users
                const postResult = await _addSingleUser(userBody);
                // res.setHeader('Set-Cookie', `_id=${userBody._id}; Path=/;`);
                res.send(postResult);
                return;


            default:
                res.send({ message: 'Not a declared method' });
                return;
        }
    } catch (err) {
        res.send(err)
    }
}