'use strict'

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('ready', function(){
	mainWindow = new BrowserWindow({
		height: 600,
		width: 800
	});

	//mainWindow.loadURL('file:///home/david/Desktop/project1019/index.html')
	mainWindow.loadURL(`file://${__dirname}/index.html`)
})
