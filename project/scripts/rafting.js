
const trips = [
    {
        name: "Family Rafting Trip",
        level: "Easy",
        duration: "2 hours",
        age: 8,
        price: 40
    },
    {
        name: "Whitewater Adventure",
        level: "Moderate to challenging",
        duration: "3–4 hours",
        age: 12,
        price: 60
    },
    {
        name: "Extreme Rapids Challenge",
        level: "Advanced",
        duration: "5–6 hours",
        age: 16,
        price: 100
    }
];

const savedEnquiries = JSON.parse(
    localStorage.getItem("raftingEnquiries") || "[]"
);

// Find the contact and newsletter forms
const forms = document.querySelectorAll("form");

// Create a message area for each form
forms.forEach((form) => {
    const message = document.createElement("p");
    message.className = "form-message";
    message.setAttribute("aria-live", "polite");
    form.appendChild(message);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const nameInput = form.querySelector('input[type="text"]');
        const messageInput = form.querySelector("textarea");

        const email = emailInput ? emailInput.value.trim() : "";
        const name = nameInput ? nameInput.value.trim() : "";

        // Check whether this is the contact form or newsletter form
        if (messageInput) {
            const purposeInput = form.querySelector(
                'input[type="radio"]:checked'
            );

            const purpose = purposeInput
                ? purposeInput.value
                : "General enquiry";

            const enquiry = {
                name: name || "Visitor",
                purpose: purpose,
                date: new Date().toLocaleDateString()
            };

            // Save the enquiry locally
            savedEnquiries.push(enquiry);

            // Keep only the latest five enquiries
            const recentEnquiries = savedEnquiries.slice(-5);

            localStorage.setItem(
                "raftingEnquiries",
                JSON.stringify(recentEnquiries)
            );

            message.textContent =
                `Thank you ${enquiry.name}. Your ${enquiry.purpose} message has been received.`;

            form.reset();
        } else if (emailInput) {
            // Handle the newsletter form
            const subscribers = JSON.parse(
                localStorage.getItem("raftingSubscribers") || "[]"
            );

            const alreadySubscribed = subscribers.includes(email);

            if (alreadySubscribed) {
                message.textContent =
                    "This email is already subscribed to our newsletter.";
            } else {
                subscribers.push(email);

                localStorage.setItem(
                    "raftingSubscribers",
                    JSON.stringify(subscribers)
                );

                message.textContent =
                    `Thank you for subscribing. We will keep you updated at ${email}.`;

                form.reset();
            }
        } else {
            message.textContent =
                "Thank you. Your form has been submitted.";
        }
    });
});

// Display a trip summary on the trips page
const tripContainer = document.querySelector(".trip-container");

if (tripContainer) {
    const tripCards = Array.from(
        tripContainer.querySelectorAll(".trip-card")
    );

    const displayedTrips = trips.filter((trip) =>
        tripCards.some((card) =>
            card.textContent.includes(trip.name)
        )
    );

    const summary = document.createElement("section");
    summary.className = "trip-summary";

    summary.innerHTML = `
    <h2>Trip Price Guide</h2>
    <p>Choose a trip that matches your experience and budget.</p>
    <ul>
      ${displayedTrips.map((trip) => `
        <li>
          <strong>${trip.name}</strong>
          costs $${trip.price} per person.
          It is ${trip.level.toLowerCase()} and lasts ${trip.duration}.
          Minimum age is ${trip.age}.
        </li>
      `).join("")}
    </ul>
  `;

    tripContainer.after(summary);
}
const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent = `Last modified: ${document.lastModified}`;
}