/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

const information = document.getElementById('info')
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), \
    Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`

const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // 打印 'pong'
}
// func()

const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    console.log(window.electronAPI)
    window.electronAPI.setTitle(title)
})

const btn = document.getElementById('btn2')
const filePathElement = document.getElementById('filePath')

btn.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile()
    filePathElement.innerText = filePath
})

const counter = document.getElementById('counter')

window.electronAPI.onUpdateCounter((value) => {
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value
    counter.innerText = newValue.toString()
    window.electronAPI.counterValue(newValue)
})