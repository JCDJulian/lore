/**
 * Bootstrap
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

 module.exports.bootstrap = function (cb) {

 	/**
	* This server side timer runs every hour on the hour. It sorts all submitted new words,
	* selects the one with the highest vote, and toggles a boolean to add it to the book.
	* It then clears out the list of proposed words.
	*/

	var CronJob = require('cron').CronJob;
	 	new CronJob('00 00 0-23 * * *', function(){
	 		 // new CronJob('* * * * * *', function() { //For testing only
	 			Word.find().where({isInBook: false}).exec(function callBackTest(err, newWords){ 	
	 				if (newWords.length > 0){
	 					var myQuery = Word.find()
	 					var sortString = 'score DESC'
	 					myQuery.where({isInBook: false}).sort(sortString).exec(function callBack(err, words){
	 						words[0].isInBook = true
	 						console.log("Word " + words[0].name + " added to book.");
	 						Word.update({id:words[0].id}, {isInBook:true}).exec(function updated(err, updated){
	 							Word.destroy({isInBook: false}).exec(function deleteWords(err){
	 							console.log("Deleted unused words")
	 					})
	 						})
	 					})
	 				}
	 			})
	 		}, null, true, "America/Los_Angeles");

  // It's very important to trigger this callack method when you are finished 
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};