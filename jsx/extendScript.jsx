$.runScript = {
	run1x1: function() {
		// The sequence that is currently open
		var activeSeq = app.project.activeSequence;
		// Get the settings and store them
		var currentSettings = activeSeq.getSettings();
		// If the sequence is not 1080p, tell the user and stop operation
		if(currentSettings.videoFrameHeight != 1080) {
			alert("Current sequence resolution not supported. Please open a 1920x1080 sequence and try again.")
			return;
		}
		// Get original name of the sequence
		var origName = activeSeq.name;
		// Clone the active sequence
		activeSeq.clone();
		// Define the sequence again so we don't change the name of the original sequence
		var activeSeq = app.project.activeSequence;
		// Change the name
		activeSeq.name = origName+ " 1x1";
		// Change the sequence resolution 
		currentSettings.videoFrameWidth = 1080;
		currentSettings.videoFrameHeight = 1080;
		// Apply the new settings 
		activeSeq.setSettings(currentSettings);
		var activeSeq = app.project.activeSequence;
		// Search for all clips inside all video tracks
		for(i=0;i<activeSeq.videoTracks.numTracks;i++){
			for(j=0;j<activeSeq.videoTracks[i].clips.numItems;j++){
				// First we edit the MOGRTS that have the "Resize" property as the first one
				if(activeSeq.videoTracks[i].clips[j].name == "HP_BUG" || activeSeq.videoTracks[i].clips[j].name == "HP_NOW_CAPTIONS_2019" || activeSeq.videoTracks[i].clips[j].name == "CREDIT + SOURCE_US" || activeSeq.videoTracks[i].clips[j].name == "HP_BUG_BREAKING") {
					var components = activeSeq.videoTracks[i].clips[j].getMGTComponent();
					components.properties[0].setValue(true);
				}
				// Then the MOGRTS that have the "Resize" property as the second one
				if(activeSeq.videoTracks[i].clips[j].name == "HP_NOW_TEXT SLIDE" || activeSeq.videoTracks[i].clips[j].name == "HP_NOW_HEADLINES_2019" || activeSeq.videoTracks[i].clips[j].name == "GRADIENT") {
					var components = activeSeq.videoTracks[i].clips[j].getMGTComponent();
					components.properties[1].setValue(true);
				}
				// Finally the MOGRTS that have the "Resize" property as the third one
				if(activeSeq.videoTracks[i].clips[j].name == "HP_NOW_DATE AND TIME TAG" || activeSeq.videoTracks[i].clips[j].name == "HP_NOW_LOCATION TAG_2019" || activeSeq.videoTracks[i].clips[j].name == "HP_NOW_ADDITIONAL TEXT_2019") {
				var components = activeSeq.videoTracks[i].clips[j].getMGTComponent();
				components.properties[2].setValue(true);
				}
			}
		}
		// Get Premiere version number
		// We don't care about the particular release, just want to know if it's 2019 (13) or 2020 (14)
 		versionNumber = app.version.substring(0,2);
		// We won't change the position of the lower third if Premiere is 2020 (14), as this currently doesn't work. Reported to Adobe and tracked as issue DVAPR-4220968
		if (versionNumber != "14"){
			for(i=0;i<activeSeq.videoTracks.numTracks;i++){
				for(j=0;j<activeSeq.videoTracks[i].clips.numItems;j++){
					if(activeSeq.videoTracks[i].clips[j].name == "HP_NOW_LOWER THIRD_2019") {
						activeSeq.videoTracks[i].clips[j].components[1].properties[0].setValue([0.76296293735504,0.46296295523643], true);
					}
				}
			}
		}
	},
	run9x16: function() {
		// The sequence that is currently open
		var activeSeq = app.project.activeSequence;
		// Get the settings and store them
		var currentSettings = activeSeq.getSettings();
		// If the sequence is not 1080p, tell the user and stop operation
		if(currentSettings.videoFrameHeight != 1080) {
			alert("Current sequence resolution not supported. Please open a 1920x1080 sequence and try again.")
			return;
		}
		// Get original name of the sequence
		var origName = activeSeq.name;
		// Clone the active sequence
		activeSeq.clone();
		// Define the sequence again so we don't change the name of the original sequence
		var activeSeq = app.project.activeSequence;
		// Get the last characters of the sequence name
		trailName = origName.substring(origName.length - 3, origName.length);
		// If the last characters are "1x1", slice them off the original name. This is done to prevent weird sequence names when going from a 1x1 sequence to a 9x16 sequence
		if(trailName == "1x1"){
			origName = origName.slice(0,-4)
		}
		// Set the new sequence name
		activeSeq.name = origName+" 9x16";
		// Change to a vertical frame 
		currentSettings.videoFrameWidth = 1080;
		currentSettings.videoFrameHeight = 1920;
		// Apply the new settings 
		activeSeq.setSettings(currentSettings);
		var activeSeq = app.project.activeSequence;
		// Search for all clips inside all video tracks
		for(i=0;i<activeSeq.videoTracks.numTracks;i++){
			for(j=0;j<activeSeq.videoTracks[i].clips.numItems;j++){
				// First we edit the MOGRTS that have the "Resize" property as the first one
				if(activeSeq.videoTracks[i].clips[j].name == "HP_BUG" || activeSeq.videoTracks[i].clips[j].name == "HP_NOW_CAPTIONS_2019" || activeSeq.videoTracks[i].clips[j].name == "CREDIT + SOURCE_US" || activeSeq.videoTracks[i].clips[j].name == "HP_BUG_BREAKING") {
					var components = activeSeq.videoTracks[i].clips[j].getMGTComponent();
					components.properties[0].setValue(true);
				}
				// Then the MOGRTS that have the "Resize" property as the second one
				if(activeSeq.videoTracks[i].clips[j].name == "HP_NOW_TEXT SLIDE" || activeSeq.videoTracks[i].clips[j].name == "HP_NOW_HEADLINES_2019" || activeSeq.videoTracks[i].clips[j].name == "GRADIENT") {
					var components = activeSeq.videoTracks[i].clips[j].getMGTComponent();
					components.properties[1].setValue(true);
				}
				// Finally the MOGRTS that have the "Resize" property as the third one
				if(activeSeq.videoTracks[i].clips[j].name == "HP_NOW_DATE AND TIME TAG" || activeSeq.videoTracks[i].clips[j].name == "HP_NOW_LOCATION TAG_2019" || activeSeq.videoTracks[i].clips[j].name == "HP_NOW_ADDITIONAL TEXT_2019") {
				var components = activeSeq.videoTracks[i].clips[j].getMGTComponent();
				components.properties[2].setValue(true);
				}
			}
		}
		// Change Y position for certain MOGRTS
		for(i=0;i<activeSeq.videoTracks.numTracks;i++){
			for(j=0;j<activeSeq.videoTracks[i].clips.numItems;j++){
				// Move some MOGRTS up
				if(activeSeq.videoTracks[i].clips[j].name == "HP_BUG" || activeSeq.videoTracks[i].clips[j].name == "HP_NOW_DATE AND TIME TAG" || activeSeq.videoTracks[i].clips[j].name == "HP_NOW_LOCATION TAG_2019" || activeSeq.videoTracks[i].clips[j].name == "HP_BUG_BREAKING" || activeSeq.videoTracks[i].clips[j].name == "HP_NOW_ADDITIONAL TEXT_2019") {
					activeSeq.videoTracks[i].clips[j].components[1].properties[0].setValue([0.5,0.30520832538605], true);
				}
				// And move the Gradient MOGRT down
				if(activeSeq.videoTracks[i].clips[j].name == "HP_NOW_GRADIENT_2019") {
					activeSeq.videoTracks[i].clips[j].components[1].properties[0].setValue([0.5,0.72083336114883], true);
				}
			}
		}
		// Set zoom level to 180% for all clips on the first video track 
		for(i=0;i<activeSeq.videoTracks[0].clips.numItems;i++){
			activeSeq.videoTracks[0].clips[i].components[1].properties[1].setValue(180);
		}
		// Get Premiere version number
		// We don't care about the particular release, just want to know if it's 2019 (13) or 2020 (14)
 		versionNumber = app.version.substring(0,2);
		// We won't change the position ot the lower third if Premiere is 2020 (14), as this currently doesn't work. Reported to Adobe and tracked as issue DVAPR-4220968
		if (versionNumber != "14"){
			for(i=0;i<activeSeq.videoTracks.numTracks;i++){
				for(j=0;j<activeSeq.videoTracks[i].clips.numItems;j++){
					if(activeSeq.videoTracks[i].clips[j].name == "HP_NOW_LOWER THIRD_2019") {
						activeSeq.videoTracks[i].clips[j].components[1].properties[0].setValue([0.76296293735504,0.46296295523643], true);
					}
				}
			}
		}
		
	}
}