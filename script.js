// document.addEventListener('DOMContentLoaded', () => {
//     // 1. DYNAMICALLY LOAD THE TREE
//     fetch('tree.html')
//         .then(response => response.text())
//         .then(html => {
//             document.getElementById('tree-container').innerHTML = html;
//         })
//         .catch(err => console.error('Error loading tree:', err));

//     // 2. CONFIGURATION
//     const birthDate = new Date(2011, 2, 26); // SET YOUR BIRTHDATE HERE

//     // 3. UI LOGIC
//     const switchScreen = (fromId, toId) => {
//         document.getElementById(fromId).classList.remove('active');
//         document.getElementById(toId).classList.add('active');
//     };

//     document.getElementById('start-btn').addEventListener('click', () => {
//         document.body.classList.remove('container'); // Triggers tree & bubbles!
//         switchScreen('screen-1', 'screen-2');
//         startTimer();
//     });

//     document.getElementById('next-to-gift-btn').addEventListener('click', () => switchScreen('screen-2', 'screen-3'));

//     const noBtn = document.getElementById('no-btn');
//     noBtn.addEventListener('click', () => {
//         document.getElementById('no-message').classList.remove('hidden');
//         noBtn.textContent = "Okay, fine...";
//     });

//     document.getElementById('yes-btn').addEventListener('click', () => {
//         switchScreen('screen-3', 'screen-4');
//         activateFlowers(); // Makes the injected tree interactive
//     });

//     // 4. TIMER LOGIC
//     let timerInterval;
//     const startTimer = () => {
//         timerInterval = setInterval(() => {
//             const now = new Date();
//             let years = now.getFullYear() - birthDate.getFullYear();
//             let months = now.getMonth() - birthDate.getMonth();
//             let days = now.getDate() - birthDate.getDate();
//             let hours = now.getHours() - birthDate.getHours();
//             let minutes = now.getMinutes() - birthDate.getMinutes();
//             let seconds = now.getSeconds() - birthDate.getSeconds();

//             if (seconds < 0) { seconds += 60; minutes--; }
//             if (minutes < 0) { minutes += 60; hours--; }
//             if (hours < 0) { hours += 24; days--; }
//             if (days < 0) {
//                 const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
//                 days += prevMonth.getDate(); months--;
//             }
//             if (months < 0) { months += 12; years--; }

//             document.getElementById('years').innerText = years;
//             document.getElementById('months').innerText = months;
//             document.getElementById('days').innerText = days;
//             document.getElementById('hours').innerText = hours;
//             document.getElementById('minutes').innerText = minutes;
//             document.getElementById('seconds').innerText = seconds;
//         }, 1000);
//     };

//     // 5. INTERACTIVE MODAL LOGIC
//     const modal = document.getElementById('content-modal');
//     const modalBody = document.getElementById('modal-body');
//     const contentData = [
//         `<h3>A Special Wish ✨</h3><p>Wishing you the happiest of birthdays! You mean the world to me.</p>`,
//         `<h3>Remember this? 😂</h3><img src="https://via.placeholder.com/400x300" class="media-placeholder">`,
//         `<h3>A little clip 🎬</h3><video controls class="media-placeholder"><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"></video>`
//     ];

//     const activateFlowers = () => {
//         const flowers = document.querySelectorAll('.flower'); // Finds fetched flowers
//         flowers.forEach((flower, index) => {
//             if(contentData[index]) {
//                 flower.style.cursor = 'pointer';
//                 flower.style.pointerEvents = 'all';
//                 flower.style.zIndex = '900';
                
//                 flower.addEventListener('mouseenter', () => flower.style.filter = 'brightness(1.5)');
//                 flower.addEventListener('mouseleave', () => flower.style.filter = 'none');
                
//                 flower.addEventListener('click', () => {
//                     modalBody.innerHTML = contentData[index];
//                     modal.classList.remove('hidden');
//                 });
//             }
//         });
//     };

//     document.getElementById('close-modal').addEventListener('click', () => {
//         modal.classList.add('hidden');
//         modalBody.innerHTML = '';
//     });
// });


document.addEventListener('DOMContentLoaded', () => {
    // 1. DYNAMICALLY LOAD THE TREE
    fetch('tree.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('tree-container').innerHTML = html;
        })
        .catch(err => console.error('Error loading tree:', err));

    const birthDate = new Date(2011, 2, 12, 20, 12, 0); // SET YOUR BIRTHDATE HERE

    // 2. UI NAVIGATION & TIMING LOGIC
    const switchScreen = (fromId, toId) => {
        document.getElementById(fromId).classList.remove('active');
        document.getElementById(toId).classList.add('active');
    };

    document.getElementById('start-btn').addEventListener('click', () => {
        // Unpause the background animations
        document.body.classList.remove('container'); 
        
        // Hide Screen 1 immediately so the user can watch the tree grow
        document.getElementById('screen-1').classList.remove('active');
        
        // Wait 5 seconds for the tree to fully bloom, then show Screen 2 & Messages
        setTimeout(() => {
            document.getElementById('screen-2').classList.add('active');
            startTimer();
            startFloatingMessages();
            startFloatingPhotos(); 
        }, 5000); 
    });

    document.getElementById('next-to-gift-btn').addEventListener('click', () => switchScreen('screen-2', 'screen-3'));

    const noBtn = document.getElementById('no-btn');
    noBtn.addEventListener('click', () => {
        document.getElementById('no-message').classList.remove('hidden');
        noBtn.textContent = "Okay, fine...";
    });

    document.getElementById('yes-btn').addEventListener('click', () => {
        // Smoothly fade out the floating messages
        document.getElementById('floating-messages-container').classList.add('fade-out-messages');
        
        switchScreen('screen-3', 'screen-4');
        activateFlowers(); 
    });

    // 3. FLOATING MESSAGES LOGIC (Wavy & Multi-directional)
    const startFloatingMessages = () => {
        const container = document.getElementById('floating-messages-container');
        const messages = [
            "Somewhere between the stars and the sun, there’s a light that reminds me of you", 
            "The day feels brighter simply because you exist.", 
            "Even the stars would pause to watch you smile.",
            "A day with you in it is already a good day.",
            "In the garden of this world, you’re one of the rarest flowers.", 
            "Like a quiet sunrise, you make everything feel warm again.", 
            "You turn simple moments into beautiful memories.", 
            "The world feels softer on days you smile."
        ];
        // The 4 animation directions we defined in CSS
        const animations = ['floatRL', 'floatLR', 'floatBT', 'floatTB'];

        const createMessage = () => {
            const msg = document.createElement('div');
            msg.className = 'floating-message';
            msg.innerText = messages[Math.floor(Math.random() * messages.length)];
            
            // Randomly pick a direction
            const anim = animations[Math.floor(Math.random() * animations.length)];
            
            // Assign starting positions off-screen based on direction
            if (anim === 'floatRL') {
                msg.style.top = `${Math.random() * 80 + 10}%`;
                msg.style.left = '100%';
            } else if (anim === 'floatLR') {
                msg.style.top = `${Math.random() * 80 + 10}%`;
                msg.style.right = '100%';
            } else if (anim === 'floatBT') {
                msg.style.left = `${Math.random() * 80 + 10}%`;
                msg.style.top = '100%';
            } else if (anim === 'floatTB') {
                msg.style.left = `${Math.random() * 80 + 10}%`;
                msg.style.bottom = '100%';
            }

            // Randomize speed between 8 to 14 seconds for a natural feel
            const duration = Math.random() * 6 + 8; 
            msg.style.animation = `${anim} ${duration}s ease-in-out forwards`;
            
            container.appendChild(msg);

            // Clean up the DOM after the animation finishes
            setTimeout(() => msg.remove(), duration * 1000);
        };

        // Spawn a new message every 2 seconds
        createMessage();
        setInterval(createMessage, 4000);
    };

    // --- FLOATING PHOTOS LOGIC ---
    const startFloatingPhotos = () => {
        const container = document.getElementById('floating-photos-container');
        
        // Replace these placeholders with the actual URLs/paths to your photos
        const photos = [
            "photos/598259552_878023751310057_5204344590987734763_n.jpg",
            "photos/625673781_769601052391239_6728452410080355108_n.jpg",
            "photos/627191717_804547962672947_2024641956875896331_n.jpg",
            "photos/630222269_2081449179063083_7233435700081983258_n.jpg",
            "photos/628187402_1607111750311793_6618028087210316185_n.jpg",
            "photos/643403565_1617624779552492_6237053578397178126_n.webp",
            "photos/646611013_800240346459595_915896904458747070_n.jpg",
            "photos/647924531_1439247297605151_594138977103191983_n.jpg",
            "photos/648648840_887765027495098_2179166331530644712_n.jpg",
            "photos/648668383_795696373032839_395573326715617268_n.jpg",
        ]
        
        const animations = ['floatRL', 'floatLR', 'floatBT', 'floatTB'];

        const createPhoto = () => {
            const img = document.createElement('img');
            img.src = photos[Math.floor(Math.random() * photos.length)];
            img.className = 'floating-photo';
            
            const anim = animations[Math.floor(Math.random() * animations.length)];
            
            // Assign starting positions off-screen based on direction
            if (anim === 'floatRL') {
                img.style.top = `${Math.random() * 80 + 10}%`;
                img.style.left = '100%';
            } else if (anim === 'floatLR') {
                img.style.top = `${Math.random() * 80 + 10}%`;
                img.style.right = '100%';
            } else if (anim === 'floatBT') {
                img.style.left = `${Math.random() * 80 + 10}%`;
                img.style.top = '100%';
            } else if (anim === 'floatTB') {
                img.style.left = `${Math.random() * 80 + 10}%`;
                img.style.bottom = '100%';
            }

            // Make photos drift a bit slower and more lazily than the text (12 to 20 seconds)
            const duration = Math.random() * 8 + 12; 
            img.style.animation = `${anim} ${duration}s ease-in-out forwards`;
            
            container.appendChild(img);

            // Clean up the DOM after the animation finishes
            setTimeout(() => img.remove(), duration * 1000);
        };

        // Spawn a new photo every 3.5 seconds
        createPhoto();
        setInterval(createPhoto, 5000);
    };

    // 4. TIMER LOGIC
    let timerInterval;
    const startTimer = () => {
        timerInterval = setInterval(() => {
            const now = new Date();
            let years = now.getFullYear() - birthDate.getFullYear();
            let months = now.getMonth() - birthDate.getMonth();
            let days = now.getDate() - birthDate.getDate();
            let hours = now.getHours() - birthDate.getHours();
            let minutes = now.getMinutes() - birthDate.getMinutes();
            let seconds = now.getSeconds() - birthDate.getSeconds();

            if (seconds < 0) { seconds += 60; minutes--; }
            if (minutes < 0) { minutes += 60; hours--; }
            if (hours < 0) { hours += 24; days--; }
            if (days < 0) {
                const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += prevMonth.getDate(); months--;
            }
            if (months < 0) { months += 12; years--; }

            document.getElementById('years').innerText = years;
            document.getElementById('months').innerText = months;
            document.getElementById('days').innerText = days;
            document.getElementById('hours').innerText = hours;
            document.getElementById('minutes').innerText = minutes;
            document.getElementById('seconds').innerText = seconds;
        }, 1000);
    };

    // 5. INTERACTIVE MODAL & FLOWER LOGIC
    const modal = document.getElementById('content-modal');
    const modalBody = document.getElementById('modal-body');
    const contentData = [
        `<h3>A Special Wish ✨</h3><p>Wishing you the happiest of birthdays! You mean the world to me.</p>`,
        `<h3>Remember this? 😂</h3><img src="https://via.placeholder.com/400x300" class="media-placeholder">`,
        `<h3>A little clip 🎬</h3><video controls class="media-placeholder"><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"></video>`,
        `<h3>Another memory! 📸</h3><img src="https://via.placeholder.com/400x300" class="media-placeholder">`
    ];

    const activateFlowers = () => {
        // TARGET ONLY THE PETALS (.flower__leafs) NOT THE WHOLE TREE (.flower)
        const flowerHeads = document.querySelectorAll('.flower__leafs'); 
        
        flowerHeads.forEach((head, index) => {
            if(contentData[index]) {
                head.classList.add('flower-clickable');
                head.style.pointerEvents = 'all';
                head.style.zIndex = '900';
                
                head.addEventListener('click', () => {
                    modalBody.innerHTML = contentData[index];
                    modal.classList.remove('hidden');
                });
            }
        });
    };

    document.getElementById('close-modal').addEventListener('click', () => {
        modal.classList.add('hidden');
        modalBody.innerHTML = '';
    });
});