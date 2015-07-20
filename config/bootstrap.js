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

 	var CronJob = require('cron').CronJob;
 	new CronJob('00 00 0-23 * * *', function(){
 		console.log("The cron-job ran!")
 		var myQuery = Word.find()
 		var sortString = 'score ASC'
 		myQuery.sort(sortString)
 		myQuery.exec(function callBack(err, words){
 			console.log(words)
 			words[0].isInBook = true
 			words[0].save(function(err, s){
 				console.log("Word " + s.name + " added to book.");
 			})
 		})
 	}, null, true, "America/Los_Angeles");

  // It's very important to trigger this callack method when you are finished 
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};