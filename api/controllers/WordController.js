/**
 * WordController
 *
 * @description :: Server-side logic for managing words
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
 	fetchwords: function(req, res) {
 		Word.find().exec(function(err, words) {
 			if(err) {return res.json(err.status, {err: err})}
 			else{
 				console.log(words)
 				return res.json(words)
 			}
 		})
 	},

 	submit: function(req, res) {
 		Word.create({
 			name: req.body.name,
 			score: 0,
 			isInBook: false
 		}).exec(function(err, word) {
 			if (err) {
 				return res.json(err.status, {err: err})
 			}
 			if (word) {
 				res.status(200).end()
 				return
 			}
 		})
 	},

 	vote: function(req, res) {
 		var newScore = 0;
 		Word.find({name: req.body.name}).exec(function foundWord(err, word){
 			if(err) {return res.json(err.status, {err: err})}
 			wordToUpdate = word[0]
 			if (req.body.vote == 1){
 				wordToUpdate.score++
 			}
 			else if (req.body.vote == 0){
 				wordToUpdate.score--
 			}
 			newScore = wordToUpdate.score
 			Word.update({
 				name: req.body.name
 			},
 			{
 				score: newScore
 			})
 			.exec(function(err) {
 				if(err) {
 					console.log("Error found!")
 					return res.json(err.status, {err: err})
 				}
 				else{
 					console.log("Woohoo! Upvote submitted!")
 					return res.status(200).end()
 				}
 			})
		})
	}
}