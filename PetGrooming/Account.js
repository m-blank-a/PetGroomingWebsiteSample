// I give up with database sayang plus points pero wala na koy time
"use strict";

var ConstructedOnce = {
    DemoAccount: false,
    DemoDb: false,
}

// Demo account registration system
// (no database)
class DemoAccount {

    #isloggedIn;
    
    get UserLoggedIn() {
        this.#isloggedIn = localStorage.getItem("LoggedIn");
        return this.#isloggedIn;
    }

    set Email(str) {
        if (str.includes("@"))
            localStorage.setItem("Email", str);
    }
    
    set Password(str) {
        localStorage.setItem("Password", str);
    }
    
    // Create a DemoAccount singleton
    constructor() {
        if (!ConstructedOnce.DemoAccount) {
            this.#isloggedIn =  localStorage.getItem("LoggedIn");
            ConstructedOnce.DemoAccount = true;
        } else
            throw new Error(`No. Just one ${this.name}, ok?`);
    }

    EmailMatch(email) {
        return email === localStorage.getItem("Email");
    }

    PasswordValid(email, password) {
        return this.EmailMatch(email) && password === localStorage.getItem("Password");
    }

    LogOut() {
        this.#isloggedIn = false;
        localStorage.setItem("LoggedIn", "false");
    }

    LogIn(email, password) {
        if (this.PasswordValid(email, password)) {
            this.#isloggedIn = true;
            localStorage.setItem("LoggedIn", "true");
        } else {
            localStorage.setItem("LoggedIn", "false");
        }
    }
    SignUp(email, password) {
        this.Email = email;
        this.Password = password;
        this.#isloggedIn = true;
        localStorage.setItem("LoggedIn", "true");
    }
}

class DemoDb {
    #data;

    GetExistingOrders() {
        this.#data = JSON.parse(localStorage.getItem("data"));
        if (this.#data == null) {
            this.#data = [];
        }
    }

    get Orders() {
        this.GetExistingOrders();
        return this.#data;
    }

    constructor() {
        if (!ConstructedOnce.DemoDb) {
            this.#data = [];
            this.GetExistingOrders();
            ConstructedOnce.DemoDb = true;
        } else
            throw new Error(`No. Just one ${this.name}, ok?`);
    }

    CreateOrder(orders, petCount, bigPetCount, timestamp) {
        let orderInfo = {
            OrderNumber: Math.random() * 1e6,
            Data: [
                orders % (1 << 7), 
                petCount,
                (bigPetCount > petCount) ? petCount : bigPetCount
            ],
            Timestamp: timestamp
        }
        this.#data[this.#data.length] = orderInfo;
        localStorage.setItem("data", JSON.stringify(this.#data));
        return orderInfo;
    }

    // Does nothing atm
    DeleteOrder(pos) {
        if (typeof pos !== "number")
            return;
        this.GetExistingOrders();
        this.#data.splice(pos, pos);
    }
}

export {DemoAccount, DemoDb};