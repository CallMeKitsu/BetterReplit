// ==UserScript==
// @name         Replit Box Remover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Customize and solve problems of Repl.it. By default, darker and cleaner than ever.
// @author       CallMeKitsu
// @match        https://replit.com/*
// @icon         https://callmekitsu.com/cdn/assets/branding/logo.png
// @grant        none
// ==/UserScript==


class StyleSheet {
    constructor(text) {
        this.properties = new Map()

        for(var prop of text.split(';')) {
            if(prop.split(':').length === 1) continue
            let key = prop.split(':')[0]
            let val = prop.split(':')[1].replaceAll(' ', '')
            this.properties.set(key, val)
        }

    }

    toString() {
        let str = ""
        for(var prop of this.properties) {
            str += `${prop[0]}: ${prop[1]};`
        }
        return str
    }

    set(key, val) {
        return this.properties.set(key, val)
    }

    get(key) {
        return this.properties.get(key)
    }

    has(key) {
        return this.properties.has(key)
    }
}

(function() {

    let is_here = true

    setInterval(() => {
        let element = document.querySelector("body > div.black-box-autocomplete-btn.active")
        if(!is_here) return
        console.log("searchin' for the awkward box.")
        if(element) {
            console.log('THE TERRIBLE BOX HAS BEEN REMOVED')
            element.remove()
            is_here = false
        }
    }, 1000)

    let style = document.body.style.cssText
    let sheet = new StyleSheet(style)

    sheet.set('--background-default', "black")
    sheet.set('--background-higher', "#212121")
    sheet.set('--background-highest', "#424242")
    sheet.set('--background-overlay', "black")
    sheet.set('--background-dimmest', "black")
    sheet.set('--accent-primary-dimmest', "#373737")
    sheet.set('--accent-primary-strongest', "white")
  
  
    sheet.set('--background-root', "black") // background
    sheet.set('--foreground-default', "white") // font-color
    sheet.set('--accent-primary-default', "#373737") // highlight
    sheet.set('--outline-default', 'black') // outline
    sheet.set('--outline-dimmest', 'black') // details

    document.body.style = sheet.toString()
})()
