const User = require('../models/User')
const Profile = require('../models/Profile')
const mongoose = require('mongoose')

const index = (req, res, next) => {
    // console.log(res.locals);
    Profile
        .find().exec()
        .then((users) =>
            res
                .status(200)
                .json({
                    users,
                    total: users.length
                }))
        .catch(e => res.status(500).json({ msg: "Server error", error: e }))
}

const create = (req, res) => {
    const newProfile = new Profile({

        _id: mongoose.Types.ObjectId(),
        publishing: req.body.publishing,
        followers: req.body.followers,
        following: req.body.following,
        description: req.body.description,
        username: req.body.username,
        name: req.body.name,
        userId: req.body.userId
    })

    newProfile
        .save()
        .then(data => {
            res.json({
                type: 'New Profile',
                data: data
            })
                .status(200)

        })
        .catch(err => {
            console.log(`caugth err ${err}`);
            return res.status(500).json({ message: 'Post Failed' })
        })

}


const findBy = (req, res) => {
    Profile.findById(req.params.profileId).exec()
        .then(data => res.status(200).json({ type: 'Get Profile by Id', data: data }))
        .catch(e => res.status(500).json(e))
}


const updateBy = ({ body, params }, res) => {

    Profile.findOne({ _id: params.profileId })
        .then(profile => {

            profile.publishing = body.publishing,
            profile.followers = body.followers,
            profile.following = body.following,
            profile.description = body.description,
            profile.photo = body.photo,
            profile.username = body.username,
            profile.name = body.name
              
            profile.save()
                    .then(updated => res.status(200).json({ "Profile Updated": updated }))
                    .catch(e => res.status(500).json(e))

        })
        .catch(err => {
            console.log(`caught the error: ${err}`);
            res.status(404).json({ "type": "Not Found.", error, err })
        })

}

const deleteBy = (req, res) => {
    Profile
        .findById(req.params.profileId, function (err, profile) {
            if (!err) {
                Profile.deleteMany({ profile: { $in: [profile._id] } }, function (err) { })
                profile
                    .remove()
                    .then(() => {
                        res.status(200)
                            .json({
                                message: 'Profile was deleted'
                            })
                    })
            }

        }).catch(err => {
            console.log(`caugth err: ${err}`);
            return res.status(500).json({ message: 'You do not have permission' })
        })

}




module.exports = {
    index,
    findBy,
    updateBy,
    create,
    deleteBy

}
