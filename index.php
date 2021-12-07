<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<!-- Import TensorFlow.js library -->
<script src="https://unpkg.com/@tensorflow/tfjs"></script>
<script src="https://unpkg.com/@tensorflow/tfjs-automl"></script>

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Multiple object detection using pre trained model in TensorFlow.js</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel="manifest" href="manifest.json">
    <meta charset="utf-8">
    <!-- Import the webpage's stylesheet -->
    <link rel="stylesheet" href="css/style.css?n=<?php echo time(); ?>">
  </head>  
  <body>  
		<div class="hideWhenLoading">		  	    
	    <div id="liveView" class="camView">	      
				<video id="webcam" autoplay muted width="100%" height="100%"></video>				                
	    </div>
	    
	    <div id="bottomBox"><div id="counter">$0</div><div id="countDetail">Estimated savings per year</div></div>
	    
	    <div id="logo"></div>  
			
			<div id="target" class="pulsating-circle"></div>			    
		</div>
		
		<div class="showWhenLoading fullScreenLoader">
			<br />
			<br />
			<br />
			<br />								    
			<img src="images/logo-stacked.png" width="60%" /><br /><br />
			<img id="loader" src="images/loader.gif" width="100" />
			<div class="loadingInfo">Loading...</div>		  		
			<button id="webcamButton" class="myButton" style="display: none;">Get Started</button>
		</div>	  	      
	  
	  <!-- Import the page's JavaScript to do some stuff -->
	  <script src="js/script.js?n=<?php echo time(); ?>" defer></script>
  </body>
</html>