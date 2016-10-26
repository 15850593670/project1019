// Add your index.js code in this file
'use strict';
const {ipcRenderer, remote} = require('electron')

var soundButtons = document.querySelectorAll('.button-sound');
var audios = []
const configuration = require('../configuration.js')
let musicList = configuration.readSettings('musicList')

for (var i = 0; i < soundButtons.length; i++) {
	var soundButton = soundButtons[i];
	var soundName = soundButton.attributes['data-sound'].value;
    let musicname = null
    if(musicList[i] === '1'){
        musicname = __dirname + '/wav/' + soundName + '.wav';
    }
    else{
        musicname = musicList[i]
    }
    let audio = new Audio(musicname)
    audios.push(audio)
	prepareButton(soundButton, soundName, i);
}

function prepareButton(buttonEl, soundName, index) {
	buttonEl.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

    setMusicForButton(index)
    buttonEl.addEventListener('contextmenu', () => {
        ipcRenderer.send('select-music-from-local', index)
        return false
    })
}
function stopAllMusic(){
    for(var i = 0;i < audios.length;i++){
        audios[i].pause()
        audios[i].currentTime = 0
    }
}

function setMusicForButton(index){
    let button = soundButtons[index]
    musicList = configuration.readSettings('musicList')
    

    let musicname = null
    if(musicList[index] === '1'){
        let soundName = soundButton.attributes['data-sound'].value;
        musicname = __dirname + '/wav/' + soundName + '.wav';
    }
    else{
        musicname = musicList[index]
    }
    audios[index] = new Audio(musicname)
    var mn = musicname.substring(musicname.lastIndexOf('/') + 1)
    button.addEventListener('click', ()=>{
        stopAllMusic()
        audios[index].currentTime = 0;
	    audios[index].play();
        ipcRenderer.send('notify-sound-name', mn)
    })
}

//reset the music played by a button
ipcRenderer.on('select-music-from-local-reply', (event, index, success) => {
	if(success){
        setMusicForButton(index)
    }
})

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', () => {
	ipcRenderer.send('close-main-window');
})

ipcRenderer.on('global-shortcut', (event, arg) => {
	var eve = new MouseEvent('click')
	soundButtons[arg].dispatchEvent(eve)
})

var settingsEl = document.querySelector('.settings');
settingsEl.addEventListener('click', () => {
	    ipcRenderer.send('open-settings-window');
});

var infosEl = document.querySelector('.infos');
infosEl.addEventListener('click', () => {
	    ipcRenderer.send('open-infos-window');
});

var {Menu, Tray} = remote
var path = require('path');

var trayIcon = null;

if (process.platform === 'darwin') {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-iconTemplate.png'));
}
else {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-icon-alt.png'));
}

var trayMenuTemplate = [
    {
        label: 'Sound machine',
        enabled: false
    },
    {
        label: 'Infos',
        click: () => {
            ipcRenderer.send('open-infos-window');
        }
    },
    {
        label: 'Settings',
        click: () => {
            ipcRenderer.send('open-settings-window');
        }
    },
    {
        label: 'Quit',
        click: () => {
            ipcRenderer.send('close-main-window');
        }
    }
];
var trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);
