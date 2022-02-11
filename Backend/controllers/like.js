const sauces = require('../models/sauces');

exports.likeSauces = (req, res, next) => {
    sauces.findOne({_id : req.params.id})
    .then((object) => {
        //like = 1
     if(!object.usersLiked.inculdes(req.body.userId) && req.body.like === 1) {
    sauces.updateOne(
        { _id : req.params.id },
        {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId }
    }
    )
    .then(() => res.status(201).json({ message: "sauces like +1" }))
    .catch((error) => res.status(400).json({ error }));

//like =0 pas de vote 
if(object.usersLiked.inculdes(req.body.userId) && req.body.like === 0) {
    sauces.updateOne(
        { _id : req.params.id },
        {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId }
    }
    )
    .then(() => res.status(201).json({ message: "sauces like 0" }))
    .catch((error) => res.status(400).json({ error }));
}

//like =-1 dislikes = +1
if(!object.usersdislikes.inculdes(req.body.userId) && req.body.like === -1) {
    sauces.updateOne(
        { _id : req.params.id },
        {
            $inc: { dislikes: 1 },
            $push: { usersdislikes: req.body.userId }
    }
    )
    .then(() => res.status(201).json({ message: "sauces like 0" }))
    .catch((error) => res.status(400).json({ error }));
}

if(object.usersdislikes.inculdes(req.body.userId) && req.body.like === 0) {
    sauces.updateOne(
        { _id : req.params.id },
        {
            $inc: { dislikes: -1 },
            $pull: { usersdislikes: req.body.userId }
    }
    )
    .then(() => res.status(201).json({ message: "sauces dislike 0" }))
    .catch((error) => res.status(400).json({ error }));
}


})
.catch((error) => res.status(400).json({ error }));








