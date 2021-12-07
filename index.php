<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<!-- Import TensorFlow.js library -->
<script src="https://unpkg.com/@tensorflow/tfjs"></script>
<script src="https://unpkg.com/@tensorflow/tfjs-automl"></script>

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>RenewEd:Vision</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel="apple-touch-icon" href="images/appicon.jpg"/>
    <link rel="apple-touch-icon-precomposed" href="images/appicon.jpg"/>    
    <link rel="icon" type="image/png" sizes="75x75" href="images/appicon.jpg">    
    <meta name="apple-mobile-web-app-capable" content="yes" />    
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="manifest" href="manifest.json">
    <meta charset="utf-8">    
    <link rel="stylesheet" href="css/style.css?n=<?php echo time(); ?>">
  </head>
	  
  <body>
	
		<!-- Actual page content -->  
		<div class="hideWhenLoading">		  	    
	    <div id="liveView" class="camView">	      
				<video id="webcam" autoplay muted playsinline width="100%" height="100%"></video>				                
	    </div>
	    
	    <div id="bottomBox"><div id="counter">$0</div><div id="countDetail">Estimated savings per year</div></div>
	    
	    <div id="logo"></div>  
			
			<div id="target" class="pulsating-circle"></div>			    
		</div>				
		
		<!-- Preloader -->
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
	  
	  <!-- Do some stuff -->
	  <script src="js/script.js?n=<?php echo time(); ?>" defer></script>
  </body>
</html>