const sauces = require('../models/sauces');

exports.likeSauces = (req, res, next) => {
    console.log("je suis au like");

    console.log("contenue du req.body ctrl like");
    console.log(req.body.like);

    console.log(" ctn req.params ctrl like");
    console.log(req.params);

    console.log("transformation de l'id en _id");
    console.log({_id : req.params.id});

sauces.findOne({_id : req.params.id})
    .then((Object) => {
        console.log("resultat promese object");
        console.log(Object);
        //like = 1 (likes +1)

        //si userlike est false et si like ===1
        if(!Object.usersLiked.includes(req.body.userId) && req.body.like === 1){
            console.log("like:",req.body.like)

            //mise a jour bdd
            sauces.updateOne(
                {_id : req.params.id},
                {
                    $inc: {likes: 1},
                    $push: {usersLiked: req.body.userId}
                }
                )
                .then(() => res.status(201).json({ message: "sauce like +1"}))
                .catch((error) => res.status(400).json({error}));
            };
            //like =0 (pas de vote)
            if(Object.usersLiked.includes(req.body.userId) && req.body.like === 0){
                console.log("UN_like:",req.body.like)
    
                //mise a jour bdd
                sauces.updateOne(
                    {_id : req.params.id},
                    {
                        $inc: {likes: -1},
                        $pull: {usersLiked: req.body.userId}
                    }
                    )
                    .then(() => res.status(201).json({ message: "sauce like 0"}))
                    .catch((error) => res.status(400).json({error}));

        };


 //like = -1 (dislikes = +1)
 if(!Object.usersLiked.includes(req.body.userId) && req.body.like === -1){
    console.log("dislike:",req.body.like)

    //mise a jour bdd
    sauces.updateOne(
        {_id : req.params.id},
        {
            $inc: {dislikes: 1},
            $push: {usersDisliked: req.body.userId}
        }
        )
        .then(() => res.status(201).json({ message: "sauce disliked 1"}))
        .catch((error) => res.status(400).json({error}));
    };

  //apres un like = -1 on met like =0 (pas de vote, on enleve le dislike)
  if(Object.usersDisliked.includes(req.body.userId) && req.body.like === 0){
    console.log("UN_dislike:",req.body.like);

    //mise a jour bdd
    sauces.updateOne(
        {_id : req.params.id},
        {
            $inc: {dislikes: -1},
            $pull: {usersDisliked: req.body.userId}
        }
        )
        .then(() => res.status(201).json({ message: "sauce like 0"}))
        .catch((error) => res.status(400).json({error}));

};

//si userId a deja liker ou disliker (impossible de re liker ou re disliker)
if(Object.usersLiked.includes(req.body.userId) && req.body.like === 1){
    console.log("Deja liked");
}
if(Object.usersDisliked.includes(req.body.userId) && req.body.like === -1){
    console.log("Deja disliked");
}

    })
    .catch((error) => res.status(404).json({error}));
}