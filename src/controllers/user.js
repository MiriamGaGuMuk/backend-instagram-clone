const mongoose = require('mongoose');

const index = (req, res) => {
    User
        .find()
        .exec()
        .then(users => {
            res
                .json({
                    users,
                    total: users.length
                })
                .status(200)
        })
        .catch(err => {
            console.log(`caugth err: ${err}`);
            return res.status(500).json(err)
        })
}


module.exports = {
    index,

}