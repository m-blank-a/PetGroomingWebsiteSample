"use strict";

class RemoteObject {
    data = {};
    Request(link, obj) {
        if (typeof link !== "string")
            return; // link must be a string
        if (obj == null || typeof obj === "undefined")
            return; // Ignore null
        if (typeof obj !== "object" || obj.constructor !== Object)
            return; // Only accept plain JS objects, not from classes.
        if (Object.keys(obj).length == 0)
            return; // Ignore blank requests

        let url = new URL(link);
        let requestToSend = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }
        
        let isRequestSuccess = false;
        do {
            let promise = fetch(url, requestToSend);
            
        } while (!isRequestSuccess);
    }
} 