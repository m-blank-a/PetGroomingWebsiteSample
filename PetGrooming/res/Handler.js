"use strict";

var objectMade = false;
const MAXRETRIES = 3

class AppointmentsViewer {
    #sessionId = 0;
    #appointmentsList;

    constructor(sessionId) {
        if (objectMade)
            throw new Error(`Error: Attempt to create Singleton, "${this.name}".`);
        else {
            objectMade = true;
            this.#sessionId = sessionId;
        }
    }


    // Gets all appointments with the matching sessionIds
    // Returns: { "Appointments" : [{...}, {...}, {...}, ...] }
    // [ {orderNumber, data : [flags, petCount, bigPetCount], timestamp}, ...]
    get Appointments() {
        if (this.#appointmentsList === undefined) {
            const xhr = new XMLHttpRequest();
            let retries = 0;
            
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let receivedData = JSON.parse(xhr.responseText);
                    return receivedData;        
                }
            };
            
            do {
                try {
                    // Make this thread yield when .send() is called
                    // Hence, the false arg.
                    xhr.open("GET", `Booking.php?option=get&sessionId=${this.#sessionId}`, false);
                    xhr.send(null);
                } catch (e) {
                    retries++;
                }
            } while (retries <= MAXRETRIES);
        } else
            return this.#appointmentsList;
    }

    // Returns details of a specific appointment
    // Returns an empty JSON when sessionId is not valid
    GetSpecificAppointment(orderNumber) {
        for (let i = 0; i < Appointments.length; i++) {
            if (Appointments[i].OrderNumber == orderNumber)
                return Appointments[i];
        }
        return null;
    }
}

export default AppointmentsViewer;