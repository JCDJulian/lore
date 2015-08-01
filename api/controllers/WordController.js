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
 					return res.json(words)
 				}
 			})
 	},

 	submit: function(req, res) {
 		// Check for uniqueness of word in wordbank
 		Word.find({
 			name: req.body.name,
 			isInBook: false
 		}).exec(function duplicateWord(err, word){
 			if(word.length > 0){
 				return res.status(406).end();
 			}
 			else{
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
 			}
 		}
 		)
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