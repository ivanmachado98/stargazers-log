const eventsList = document.querySelector("#events");

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium"
  }).format(new Date(`${dateString}T00:00:00`));
}

function formatStars(stars) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(stars);
}

function createEvent(event) {
  const item = document.createElement("li");
  item.className = "event";
  item.innerHTML = `
    <div class="event-heading">
      <a href="${event.url}" target="_blank" rel="noreferrer">${event.repository}</a>
      <time class="date" datetime="${event.starredAt}">${formatDate(event.starredAt)}</time>
    </div>
    <p class="description">${event.description}</p>
    <p class="metadata">
      <span class="language">${event.language}</span>
      <span class="stars">${formatStars(event.stars)} stars</span>
    </p>
  `;
  return item;
}

async function loadEvents() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const events = await response.json();
    eventsList.replaceChildren(...events.map(createEvent));
  } catch (error) {
    eventsList.innerHTML = "<li class=\"status\">Unable to load starred repositories.</li>";
    console.error(error);
  }
}

loadEvents();
