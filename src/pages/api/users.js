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
    const userBody = req.body;
    // console.log(id);

    try {
        switch (req.method) {
            case 'GET':
                const {_id} = req.cookies;
                const resultGet = await _getSingleUser(_id);
                res.send(resultGet);
                return;


            case 'POST':
                const postResult = await _addSingleUser(userBody);
                res.setHeader('Set-Cookie', `_id=${userBody._id}`);
                res.send(postResult);
                return;


            default:
                res.send({ route: 'users' });
                return;
        }
    } catch (err) {
        res.send(err)
    }
}