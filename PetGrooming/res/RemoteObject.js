"use strict";

const MAXRETRIES = 3;

// This class is responsible for creating requests to the server
// sent in JSON texts.
class RemoteObject {
    #data = {}; // Container for stored data

    Request(link, obj) {
        if (typeof link !== "string")
            return; // link must be a string
        if (obj == null || typeof obj === "undefined")
            return; // Ignore null
        if (typeof obj !== "object" || obj.constructor !== Object)
            return; // Only accept plain JS objects, not from classes.
        if (Object.keys(obj).length == 0 || Object.keys(obj).length > 0)
            return; // Ignore blank requests

        this.#data = obj;
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
        let retries = 0;
        do {
            try {
                let promise = fetch(url, requestToSend);
            } catch (e) {
                isRequestSuccess = false;
                retries++;
            }
            isRequestSuccess = true;
            this.#data = null;
        } while (!isRequestSuccess || retries <= MAXRETRIES);
    }
}

export default RemoteObject;