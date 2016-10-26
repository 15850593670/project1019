// Add your settings.js code in this file
'use strict';

const {ipcRenderer} = require('electron');

const closeEl = document.querySelector('.close');
closeEl.addEventListener('click', (e) => {
    ipcRenderer.send('close-infos-window');
});

const configuration = require('../configuration.js');

let shortCut1 = document.getElementById('global-shortcut-1');
let shortCut2 = document.getElementById('global-shortcut-2');

var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
let prefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+')

shortCut1.innerHTML = `Sound 1: ${prefix}+1`
shortCut2.innerHTML = `Sound 2: ${prefix}+2`
