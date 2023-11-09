const container = document.getElementById("image-container");


const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const numImages = 80; // currentYear - 1980; // Number of images to load
let imageCount = 0; // To keep track of the loaded images
let loadedImages = 0; // To keep track of the images that have fully loaded
const loadedImageUrls = new Set(); // To store the loaded image URLs



const topics = [
	"Environment",
	"Technology",
	"EventDriven",
	"Permacomputing",
	"Ecology",
	"Coding",
	"Architecture",
	"System",
	"Entanglement",
	"Sustainability",
	"Cloud",
	"Automation",
	"Virtualization",
	"Robotics",
	"Fork",
	"Version",
	"Distributed",
	"nature", 
	"art", 
	"architecture", 
	"shibari", 
	"mechanical", 
	"cyborg", 
	"pollock", 
	"space", 
	"physics", 
	"industrial", 
	"abstract", 
	"octopus",
	"biology",
	"mirroring",
	"masking",
];

function getRandomTopic() {
    const randomIndex = getRandomInt(0, topics.length - 1);
    return topics[randomIndex];
}

// Function to generate a random number between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to load a random image from Flickr
function loadRandomImage() {
    const apiKey = '357b816a059747c40f18257cdadbf793';
    const randomImageIndex = getRandomInt(1, numImages);

    const randomTopic = getRandomTopic();
    const flickrApiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${randomTopic}&content_type=1&media=photos&per_page=${numImages}&page=${imageCount + 1}&format=json&nojsoncallback=1&sort=relevance`;

//    const randomTopic = topics.join(',');
//    const flickrApiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${randomTopic}&tag_mode=all&content_type=1&media=photos&per_page=1&page=${imageCount + 1}&format=json&nojsoncallback=1&sort=relevance`;


    fetch(flickrApiUrl)
        .then(response => response.json())
        .then(data => {
            const photo = data.photos.photo[0];
	    if (!photo) {
                // Handle the case where no image is found for the topic
                loadRandomImage();
                return;
            }

            const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

            if (loadedImageUrls.has(imageUrl)) {
                // Image is a duplicate, try loading another
                loadRandomImage();
                return;
            }

            loadedImageUrls.add(imageUrl);

            // Create an anchor tag with the image and link
            const imageLink = document.createElement("a");
//            imageLink.href = `/${randomImageIndex}.html`;
            imageLink.href = `/`;

            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            imageLink.appendChild(imageElement);

            imageElement.style.opacity = 0; // Start with 0 opacity

            imageElement.onload = () => {
	       loadedImages++;
               imageElement.style.transition = "opacity 0.5s";
               imageElement.style.opacity = 0.4;
            };

            // Set random absolute positions for the images
            imageLink.style.top = `${getRandomInt(0, window.innerHeight)}px`;
            imageLink.style.left = `${getRandomInt(0, window.innerWidth)}px`;
            imageLink.style.zIndex = `${getRandomInt(0, 2)}`;


            container.appendChild(imageLink);


            imageCount++;

//            if (imageCount === numImages) {
//                loadMoreImages();
//            }

        })
        .catch(error => console.error(error));
}

// Function to load more images when all images are loaded
function loadMoreImages() {
    imageCount = 0;
    for (let i = 0; i < numImages; i++) {
        loadRandomImage();
    }
}

// Load initial images
loadMoreImages();
