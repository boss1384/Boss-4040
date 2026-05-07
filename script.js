const API_KEY = "YOUR_TEQUILA_API_KEY_HERE";   // Put your key here

async function checkPrice() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    const resultDiv = document.getElementById("result");

    if (!date) {
        resultDiv.innerHTML = "Please select a date";
        return;
    }

    resultDiv.innerHTML = "Checking price...";

    const url = `https://api.tequila.kiwi.com/v2/search?fly_from=\( {from}&fly_to= \){to}&date_from=${date}&curr=NGN&limit=3`;

    try {
        const response = await fetch(url, {
            headers: { "apikey": API_KEY }
        });
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const price = data.data[0].price;
            resultDiv.innerHTML = `Cheapest Price: ₦${price}`;
        } else {
            resultDiv.innerHTML = "No flight found for this date";
        }
    } catch (error) {
        resultDiv.innerHTML = "Error checking price. Try again.";
    }
}
