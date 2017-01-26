// check if a directory exists
// if not create it
// get all the files in that directory
// loop over all the files is that directory and get their letter count


var fs = require("fs");

console.log("checking if the directory exists");
var mainFolder = "./mainFolder";


setInterval(function(){
	if(fs.existsSync(mainFolder)){
		console.log("the mainFolder exists");
	}
	else{
		console.log("tha main folder does not exist, creating it now");
		fs.mkdirSync(mainFolder);
	}

	console.log("getting all the files in the mainFolder");
	fs.readdir(mainFolder,function(err,files){
		var currentLetterCount = {};
		/*currentLetterCount->{
			key(fileName):Value(letter count in that file)
		}
		*/

		var currentContent = {};
		/*currentContent->{
			key(fileName):Value(content of that file)
		}

		*/


		console.log("loop over all the files in the mainFolder and get their letter count");
		files.forEach(file=>{
			console.log("current file name->",file);
			var fileContent = fs.readFileSync(mainFolder + "/" + file).toString();
			// console.log("fileContent is ->",fileContent," ,Number of letters in the file->",fileContent.length);
			currentLetterCount[file] = fileContent.length;
			currentContent[file] = fileContent;
		})

		console.log("currentLetterCount->",currentLetterCount);


		var logFile = "./log.json";
		console.log("checking if log file exists");
		if( ! fs.existsSync(logFile)){
			console.log("the log file didn'e exist, creating it now");
			fs.writeFileSync(logFile,JSON.stringify({}));
		}

		/*
		logFile->{
			fileName:[{
				timestamp:1234,
				count:23,
				content:
			}]
		}
		*/

		var logFileObject = fs.readFileSync(logFile).toString();
		logFileObject = JSON.parse(logFileObject);
		console.log("logFileObject before getting modified->",logFileObject);

		for(var key in currentLetterCount){
			console.log("key->",key,"value->",currentLetterCount[key]);
			var arrayObject = {
				timestamp:Date.now(),
				count:currentLetterCount[key],
				content:currentContent[key]
			}
			var logFileNameArray = logFileObject[key];
			if(! logFileNameArray){
				logFileNameArray = [];
			}
			logFileNameArray.push(arrayObject);
			console.log("logFileNameArray ->",logFileNameArray);
			logFileObject[key] = logFileNameArray;
		}

		fs.writeFileSync(logFile,JSON.stringify(logFileObject));


	})
},2000);