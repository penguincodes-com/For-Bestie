
// ============================================
// 1. YOUR FIVE BIRTHDAY MEMORIES
// ============================================
//
// CUSTOMIZE EACH MEMORY HERE.
//
// image: Replace the URL with your own photo.
// title: The heading shown when the card opens.
// paragraphs: The text shown on the left side.
// caption: The little line displayed under the image.
//

const memories = [

    {
        id: "memory-1",
        number: "01",

        kicker: "A LITTLE CELEBRATION",

        title: "A little sunshine, just like you",

        image:
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85",

        alt: "Festive pastel party decorations",

        paragraphs: [
            "Today is all about celebrating someone who makes ordinary moments feel a little more special. Someone whose presence can bring warmth into a room without even trying.",

            "I hope this birthday brings you a hundred little reasons to smile, beautiful surprises, and the kind of happiness that stays with you long after the candles are blown out."
        ],

        caption: "May your day be as lovely as your heart."
    },


    {
        id: "memory-2",
        number: "02",

        kicker: "A LITTLE NOTE FOR YOU",

        title: "You make the world softer",

        image:
            "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85",

        alt: "Romantic flowers in a soft, delicate setting",

        paragraphs: [
            "Some people have a way of making life feel gentler. The little things they do, their laughter, their kindness, and even their quiet moments can make an ordinary day unforgettable.",

            "I hope you never forget how much beauty you bring into the lives of people around you. You deserve the same tenderness and care that you give so naturally to others."
        ],

        caption: "A little reminder of how wonderful you are."
    },


    {
        id: "memory-3",
        number: "03",

        kicker: "THE HAPPY LITTLE THINGS",

        title: "More laughs, more memories",

        image:
            "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1200&q=85",

        alt: "Friends enjoying a happy celebration together",

        paragraphs: [
            "Here's to all the silly conversations, unexpected laughs, random adventures, and tiny moments that somehow become the memories we treasure most.",

            "May this next chapter of your life be filled with people who make you laugh until your cheeks hurt, experiences that make you feel alive, and stories you'll love telling again and again."
        ],

        caption: "The best memories are often the unplanned ones."
    },


    {
        id: "memory-4",
        number: "04",

        kicker: "A WISH FOR YOUR NEXT CHAPTER",

        title: "Keep being wonderfully you",

        image:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",

        alt: "A smiling young woman in a natural portrait",

        paragraphs: [
            "As you begin another beautiful year of your life, I hope you give yourself permission to dream bigger, try new things, make mistakes, and discover things about yourself that you never knew.",

            "Never feel like you need to become someone else to be enough. Your own pace, your own personality, and the things that make you different are all part of what makes you special."
        ],

        caption: "Here's to becoming even more of yourself."
    },


    {
        id: "memory-5",
        number: "05",

        kicker: "ONE LAST LITTLE WISH",

        title: "You deserve all the magic",

        image:
            "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=85",

        alt: "A beautiful celebratory birthday cake",

        paragraphs: [
            "My birthday wish for you is simple: may life surprise you in the loveliest ways. May the things you've been quietly hoping for find their way to you, and may the difficult days always make room for brighter ones.",

            "I hope you feel appreciated, understood, and loved — not only on your birthday, but on the completely ordinary days, too. You deserve a year full of peaceful moments, exciting beginnings, and memories worth keeping."
        ],

        caption: "Happy birthday. The world is luckier with you in it."
    }

];


// ============================================
// 2. GET HTML ELEMENTS
// ============================================

const siteShell = document.getElementById("siteShell");

const galleryView = document.getElementById("galleryView");
const memoryGrid = document.getElementById("memoryGrid");

const detailView = document.getElementById("detailView");
const backButton = document.getElementById("backButton");

const detailEyebrow = document.getElementById("detailEyebrow");
const detailTitle = document.getElementById("detailTitle");
const detailParagraphs = document.getElementById("detailParagraphs");

const detailImage = document.getElementById("detailImage");
const detailCaption = document.getElementById("detailCaption");

const liveRegion = document.getElementById("liveRegion");


// Remember which card opened the detail view.
// This lets the keyboard focus return to the same button.
let lastTrigger = null;


// ============================================
// 3. ESCAPE TEXT BEFORE INSERTING INTO HTML
// ============================================

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, character => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];

    });

}


// ============================================
// 4. CREATE THE MEMORY CARDS
// ============================================

function createMemoryCards() {

    memoryGrid.innerHTML = memories.map((memory, index) => {

        return `
            <article
                class="memory-card"
                style="--card-index: ${index}"
            >

                <div class="memory-card-image-frame">

                    <img
                        class="memory-card-image"
                        src="${escapeHTML(memory.image)}"
                        alt="${escapeHTML(memory.alt)}"
                        loading="lazy"
                        decoding="async"
                    >

                    <span class="memory-card-number">
                        ${escapeHTML(memory.number)}
                    </span>

                </div>

                <div class="memory-card-body">

                    <p class="memory-card-kicker">
                        ${escapeHTML(memory.kicker)}
                    </p>

                    <h2 class="memory-card-title">
                        ${escapeHTML(memory.title)}
                    </h2>

                    <p class="memory-card-hint">
                        There's a little something inside for you.
                    </p>

                    <button
                        type="button"
                        class="memory-card-tap"
                        data-memory-id="${escapeHTML(memory.id)}"
                        aria-label="Tap to see: ${escapeHTML(memory.title)}"
                    >

                        <span>Tap to see</span>

                        <span class="tap-arrow" aria-hidden="true">
                            ↗
                        </span>

                    </button>

                </div>

            </article>
        `;

    }).join("");

}


// ============================================
// 5. OPEN A MEMORY
// ============================================

function openMemory(memoryId, triggerButton) {

    const memory = memories.find(item => item.id === memoryId);

    if (!memory) {
        return;
    }

    // Remember the clicked button for focus restoration.
    lastTrigger = triggerButton;

    // Update the text.
    detailEyebrow.textContent = memory.kicker;
    detailTitle.textContent = memory.title;

    // Safely create the corresponding paragraphs.
    detailParagraphs.innerHTML = memory.paragraphs
        .map(paragraph => `<p>${escapeHTML(paragraph)}</p>`)
        .join("");

    // Update the image and its accessible description.
    detailImage.alt = memory.alt;
    detailImage.src = memory.image;

    detailCaption.textContent = memory.caption;

    // Make the gallery inactive for accessibility.
    galleryView.setAttribute("aria-hidden", "true");
    galleryView.inert = true;

    // Reveal the detail view and start the CSS animation.
    detailView.setAttribute("aria-hidden", "false");
    siteShell.classList.add("is-open");

    // Announce the change to screen-reader users.
    liveRegion.textContent = `Opened memory: ${memory.title}`;

    // Move keyboard focus to the close button.
    window.requestAnimationFrame(() => {
        backButton.focus({ preventScroll: true });
    });

}


// ============================================
// 6. CLOSE THE MEMORY AND RETURN TO GALLERY
// ============================================

function closeMemory() {

    if (!siteShell.classList.contains("is-open")) {
        return;
    }

    // Begin the closing animation.
    siteShell.classList.remove("is-open");

    // Update accessibility states.
    detailView.setAttribute("aria-hidden", "true");

    galleryView.setAttribute("aria-hidden", "false");
    galleryView.inert = false;

    liveRegion.textContent = "Returned to all memories.";

    // Return focus to the card button that opened the memory.
    if (lastTrigger && document.contains(lastTrigger)) {
        lastTrigger.focus({ preventScroll: true });
    }

}


// ============================================
// 7. HANDLE CARD CLICKS
// ============================================

// Event delegation allows every generated card button to work.
memoryGrid.addEventListener("click", event => {

    const button = event.target.closest("[data-memory-id]");

    if (!button) {
        return;
    }

    openMemory(button.dataset.memoryId, button);

});


// ============================================
// 8. HANDLE THE X BUTTON
// ============================================

backButton.addEventListener("click", closeMemory);


// ============================================
// 9. KEYBOARD SUPPORT
// ============================================

// Escape closes the open memory.
document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        siteShell.classList.contains("is-open")
    ) {
        closeMemory();
    }

});


// ============================================
// 10. INITIALIZE THE WEBSITE
// ============================================

createMemoryCards();
