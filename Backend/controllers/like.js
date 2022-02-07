const sauces = require('../models/sauces');

exports.likeSauces = (req, res, next) => {
    sauces.findOne({_id : req.params.id})
    .then((object) => {
     if(!object.usersLiked.inculdes(req.body.userId) && req.body.likes === 1){
    sauces.updateOne(
        {_id : req.params.id},
        {
            $inc: {like:1},
            $push: {usersLiked: req.body.userId}
    }
    )

    .then(() => res.status(201).json({ message: "sauces like +1"}))
    .catch((error) => res.status(400).json({error}));
}

    if(object.usersLiked.inculdes(req.body.userId) && req.body.likes === 0){
        sauces.updateOne(
            {_id : req.params.id},
            {
                $inc: {like:-1},
                $pull: {usersLiked: req.body.userId}
        }
        )
    
        .then(() => res.status(201).json({ message: "sauces like 0"}))
        .catch((error) => res.status(400).json({error}));

     }
    })
     .catch((error) => res.status(404).json({error}));
    };
