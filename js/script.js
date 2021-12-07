$(function(){

  //Set up screen
	$("#target").hide();
	
	//Various Handles and parameters
	var showBox=false;
	const video = document.getElementById('webcam');
	const liveView = document.getElementById('liveView');
	

	//Determine if running on a mobile device  
	var mobile=false;	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 		mobile=true;
	}
	
	// Check if webcam access is supported.
	function getUserMediaSupported() {
	  return !!(navigator.mediaDevices &&
	    navigator.mediaDevices.getUserMedia);
	}			
	if (getUserMediaSupported()) {
	  //we're good
	} else {
	  alert("You need a webcam for this");
	}
	
	//Handle activating the webcam when the user clicks.  Note that the click is
	//required by some brosers.
	$("#webcamButton").click(function(){
		//Only do this if the TF model has loaded
		if (!model) {
	    return;
	  }
	  
	  //Display some startup info
	  $(".loadingInfo").html("Staring camera...");
		$("#loader").show();	  	  		
		$("#webcamButton").hide();
	  	  	  	  		  
	  
	  //Set up parameters
	  var constraints = {
	    video: true
	  };	  
	  if(mobile){
	  	constraints = { video: { facingMode: { exact: "environment" } } };
	  }
			  
	  // Activate the webcam stream.
	  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
	    video.srcObject = stream;
	    video.addEventListener('loadeddata', function(){
				$(".showWhenLoading").hide();
				predictWebcam();
			});	    
	  });
	
	});

		
								
	//Load the model
	var model = undefined;		
	async function loadModel() {
	  model = await tf.automl.loadObjectDetection('/renewed/model/model.json');  
	}
	loadModel().then(function(){
		$(".loadingInfo").html("Tap below to get started and then point your camera at any light fixture.");
		$("#loader").hide();	  	  		
		$("#webcamButton").show();
	});
		
		
	//Target handling functions		
	var totalCount=0;		
	var whenShown=0;
	var lastSeen=0;
	var seenCount=0;
	function showTarget(){		
		if(!$("#target").is(":visible")){
			seenCount+=1;
			if(seenCount>10){
			  totalCount+=1;
			  var totalDollars = 20 * totalCount;
			  $("#counter").html("$" + totalDollars);
				$("#counter").removeClass("shimmer").addClass("shimmer");
			  $("#target").show();
			}
		}				
		whenShown = $.now();		
		lastSeen = $.now();					
	}
	
	function hideTarget(){	
		if($.now()-lastSeen>20){
			seenCount=0;					
			$("#target").fadeOut();
			$("#counter").removeClass("shimmer");
		} else {		  
		}
	}
	
	
	//Webcam / TF functions
	var children = [];
	async function predictWebcam() {		
		
		//We're scaling the video & the actual video displays centered in the
		//video element, so some math is needed to translate video coordinates
		//to DOM coordinates
		var videoHeight = video.videoHeight;
		var videoWidth = video.videoWidth;		
		var videoElementHeight = $(video).height();
		var videoElementWidth = $(video).width();		
		var videoScale = videoElementHeight/videoHeight;
		if(videoWidth * videoScale > videoElementWidth){
		 	videoScale = videoElementWidth/videoWidth;
		}		
		var offsetX = videoElementWidth/2 - (videoWidth*videoScale)/2;
		var offsetY = videoElementHeight/2 - (videoHeight*videoScale)/2;		
		
		//const img = document.getElementById('webcam');
  	const options = {score: 0.5, iou: 0.5, topk: 20};
		const predictions = await model.detect(video, options);
		
		//remove highlights from previous
		for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);
		
		//Look for new lamps
		var found=false;
		if(predictions.length>0){
			var score = predictions[0].score;
			var left = predictions[0].box.left*videoScale + offsetX;
			var top = predictions[0].box.top*videoScale + offsetY;
			var width = predictions[0].box.width*videoScale;
			var height = predictions[0].box.height*videoScale;

			//Do some reality checks...is it actually a lamp?			
			if(score>.6 && width>20 && height>20){
			
				var centerX = left + width/2
	     	var centerY = top + height/2;
			
				//Display the higlighter
				if(showBox){																	
					const highlighter = document.createElement('div');
			        highlighter.setAttribute('class', 'highlighter');
			        highlighter.style = 'left: ' + left + 'px; top: '
			            + top + 'px; width: ' 
			            + width + 'px; height: '
			            + height + 'px;';	            
	      	liveView.appendChild(highlighter);
	     		children.push(highlighter);
	     	} else {	     		     		     	
	     		const dot = document.createElement('div');
		        dot.setAttribute('class', 'dot');
		        dot.style = 'left: ' + centerX  + 'px; top: '
		            + centerY + 'px;';			          
					if(!$("#target").is(":visible")){
				  	liveView.appendChild(dot);
   					children.push(dot);
   				}
				}
				
				//Reposition the target	     	
	    	$("#target").css({"top": centerY+15, "left": centerX+15});
	    	
				
				//Report that we found something	    		   
				found=true;    		    		     				
			}
		}

		//Request target display		
		if(found){
			showTarget();
		} else {
			hideTarget();
		}
		
		window.requestAnimationFrame(predictWebcam);				
	}
	
});
