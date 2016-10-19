'use strict'

//var electron = require('electron');
//var app = electron.app;
//var BrowserWindow = electron.BrowserWindow;
const {app, BrowserWindow, globalShortcut, ipcMain} = require('electron')

let mainWindow = null

var configuration = require('./configuration')

app.on('ready', () => {
	if (!configuration.readSettings('shortcutKeys')) {
	    configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
	}

	mainWindow = new BrowserWindow({
		frame: false,
		resizable: false,
		height: 700,
		width: 368
	})

	/*
	globalShortcut.register('X', () => {
		mainWindow.webContents.send('global-shortcut', 0);
    })

	globalShortcut.register('Z', () => {
	    mainWindow.webContents.send('global-shortcut', 1);
    })
	*/

	//mainWindow.loadURL('file:///home/david/Desktop/project1019/index.html')
	mainWindow.loadURL(`file://${__dirname}/app/index.html`)
})

function setGlobalShortcuts() {
    globalShortcut.unregisterAll();

    var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
    var shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

    globalShortcut.register(shortcutPrefix + '1', () => {
		mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register(shortcutPrefix + '2', () => {
        mainWindow.webContents.send('global-shortcut', 1);
    });
}

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

ipcMain.on('set-global-shortcuts', () => {
	    setGlobalShortcuts();
})
