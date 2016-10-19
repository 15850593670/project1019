// Add your settings.js code in this file
'use strict';

var {ipcRenderer} = require('electron');

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', (e) => {
	    ipcRenderer.send('close-settings-window');
});
