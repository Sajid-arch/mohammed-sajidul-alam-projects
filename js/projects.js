// Loader Code Start 

window.addEventListener('load', function() {
    const loader = document.getElementById('loader-wrapper');
    //Smoothly fade out
    loader.style.opacity = '0';
    //Completely remove from layout after fade finishes
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
    });



// Loader Code End 


// Fetching Header and Footer Code Start 



document.addEventListener("DOMContentLoaded", () => {
    
    // Clean, easy async function definition
    async function loadComponent(selector, fileUrl) {
        try {
            const response = await fetch(fileUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Wait for the text content to arrive
            const htmlContent = await response.text();
            
            // Inject it into the page element safely
            const targetElement = document.querySelector(selector);
            if (targetElement) {
                targetElement.innerHTML = htmlContent;
            }

            // Run your scroll animation setup once header is ready
            if (selector === '#header-placeholder') {
                initHeaderScroll();
            }
            
        } catch (error) {
            console.error(`Could not load component from ${fileUrl}:`, error);
        }
    }

    // Call them cleanly line-by-line
    loadComponent('#header-placeholder', './components/header.html');
    loadComponent('#sidebar-placeholder', './components/sidebar.html');
    loadComponent('#footer-placeholder', './components/footer.html');
});



// Fetching Header and Footer Code End 


// Header Hide on Scroll Code Start 


// Wrap your scroll logic in a function so it can be called safely
function initHeaderScroll() {
    const header1 = document.getElementById("header-1");
    const header2 = document.getElementById("header-2");

    // Safety check to ensure elements exist
    if (!header1 || !header2) return;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            // We are scrolled down: Show Header 2
            header1.classList.add("hidden");
            header1.classList.remove("visible");

            header2.classList.add("visible");
            header2.classList.remove("hidden");
        } else {
            // We are back at the top (0-100px): Show Header 1
            header1.classList.add("visible");
            header1.classList.remove("hidden");

            header2.classList.add("hidden");
            header2.classList.remove("visible");
        }
    });
}


// Header Hide on Scroll Code Start 






// For Contact Info Box Start


const handleOnMouseMoveLs = e => {
    const { currentTarget: target } = e;


    const rect = target.getBoundingClientRect(),

    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

    
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
    }



    for(const conDet of document.querySelectorAll(".con-det-info")) {
        conDet.onmousemove = e => handleOnMouseMoveLs(e);
    }




// For Contact Info Box End





// Contact Section Moving Border Effect Start


    const handleOnMouseMoveContact = e => {
    const { currentTarget: target } = e;


    const rect = target.getBoundingClientRect(),

    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

    
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
    }



    for(const contact of document.querySelectorAll(".contact")) {
        contact.onmousemove = e => handleOnMouseMoveContact(e);
    }

    // Contact Section Moving Border Effect End




// Contact Form Validation Code Start 
// Replace these with the actual keys you copied from your Supabase dashboard
const SUPABASE_URL = "https://your-project-id.supabase.co";
const SUPABASE_ANON_KEY = "your-actual-anon-public-key";

// Initialize the Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Listen for form submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop page reload

    // Get values from the input fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        // Insert data into your 'contact_submissions' table
        const { data, error } = await supabase
            .from('contact_submissions')
            .insert([
                { name: name, email: email, message: message }
            ]);

        if (error) throw error;

        alert('Message sent successfully!');
        document.getElementById('contactForm').reset(); // Clear the form

    } catch (error) {
        console.error('Error inserting data:', error.message);
        alert('Oops! Something went wrong while saving your message.');
    }
});

// Contact Form Validation Code End