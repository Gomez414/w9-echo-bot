const abortController = new AbortController();
let requestInFlight = undefined;



function main() {
    const inputElement = document.querySelector("input[name='echo_input']");
    const output = document.querySelector("#output");

    inputElement.addEventListener("change", () => {
            abortController.abort("new request");
    });

    inputElement.addEventListener("change", function() {

        requestInFlight = fetch("https://echo-bot-shy-sea-4425.fly.dev/echo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },            
            body: JSON.stringify({text: inputElement.value}),
        });
        requestInFlight.then(resp => {
            if(resp.ok) {
                console.log("Fetch has been made!")
                return resp.json();
            } else {
                throw new Error("Uh oh :(")
            }
        })

        .then((json) => {
            output.textContent = json.text;
        })
        
    });
}

document.addEventListener("DOMContentLoaded", main);