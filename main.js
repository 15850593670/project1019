'use strict'

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('ready', function(){
	mainWindow = new BrowserWindow({
		frame: false,
		resizable: false,
		height: 700,
		width: 368
	});

	//mainWindow.loadURL('file:///home/david/Desktop/project1019/index.html')
	mainWindow.loadURL(`file://${__dirname}/app/index.html`)
})
