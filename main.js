'use strict'

//var electron = require('electron');
//var app = electron.app;
//var BrowserWindow = electron.BrowserWindow;
const {app, BrowserWindow, globalShortcut, ipcMain} = require('electron')

let mainWindow = null

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		frame: false,
		resizable: false,
		height: 700,
		width: 368
	})

	globalShortcut.register('X', () => {
		mainWindow.webContents.send('global-shortcut', 0);
    })

	globalShortcut.register('Z', () => {
	    mainWindow.webContents.send('global-shortcut', 1);
    })

	//mainWindow.loadURL('file:///home/david/Desktop/project1019/index.html')
	mainWindow.loadURL(`file://${__dirname}/app/index.html`)
})


ipcMain.on('close-main-window', () => {
	app.quit();
})

let settingsWindow = null

ipcMain.on('open-settings-window', () => {
	if(settingsWindow){
		return
	}

	settingsWindow = new BrowserWindow({
		frame: false,
		resizable: false,
		height: 200,
		width: 200
	})

	settingsWindow.loadURL(`file://${__dirname}/app/settings.html`)
	
	settingsWindow.on('closed', () => {
		settingsWindow = null
	})
})

ipcMain.on('close-settings-window', () => {
	if (settingsWindow) {
	    settingsWindow.close();
    }
})
