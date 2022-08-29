   //********************************** start setting box*****************************************
   //toggle spin class on icon
   document.querySelector(".settingbox .toggle-settings ").onclick = function() {
       // toggle class open on settingbox   
       this.parentElement.classList.toggle("open");
   };


   // start switch --main-color *************
   //check if there is local storge color option
   let mianColors = localStorage.getItem("color-option");
   //check if color mianColors is empty or not
   if (mianColors !== null) {
       document.documentElement.style.setProperty('--main-color', mianColors);
       //remove active class from all  lis in color-list
       document.querySelectorAll(".color-list li").forEach(e => {
           e.classList.remove("active");
           //add active class to the li that contains data-color === localstorge item(color-option)->mianColors
           if (e.dataset.color === mianColors) {
               e.classList.add("active");
           }
       });
   }
   const colorsLi = document.querySelectorAll(".color-list li");
   //loop on every li exist on color-list
   colorsLi.forEach(li => {
       //add event click on every li exist on color-list
       li.addEventListener("click", (e) => {
           // get data-color that storge in li whice i clicked on it  
           settingboxcolorlist = e.target.dataset.color;
           //set that color on --main-color that stored in :root
           document.documentElement.style.setProperty('--main-color', settingboxcolorlist);
           //set the color on localstorge
           localStorage.setItem("color-option", settingboxcolorlist);
           //remove active class from all lis
           e.target.parentElement.querySelectorAll(".active").forEach(li => {
               li.classList.remove("active")
           });
           // add class active to the li i clicked
           e.target.classList.add("active");
       });
   });

   // end switch --main-color**********







   //********************************** start landing page*************************************** 
   // select landing page element
   let landing_page = document.querySelector(".landing-page");
   // get array of images
   let landImgsArray = ["gallery-01.png", "features-03.jpg", "gallery-03.jpg", "gallery-02.png", "gallery-04.png"];

   //random background option
   let backgroundOption = true;
   //variable to control the background interval
   let backgroundInterval;
   //check if there is local storge random background item
   let backgroundLocalstorgeItem = localStorage.getItem("background-option");
   //check if the localstorge (background-option)->backgroundLocalstorgeItem is not empty
   if (backgroundLocalstorgeItem !== null) {
       if (backgroundLocalstorgeItem === 'true') {
           backgroundOption = true;

       } else {
           backgroundOption = false;
       }
       //remove active class from all span 
       document.querySelectorAll(".randbackground span").forEach(ele => {
           ele.classList.remove("active");
       });
       //add active class
       if (backgroundLocalstorgeItem == 'true') {
           document.querySelector(".randbackground .yes").classList.add("active");
       } else {
           document.querySelector(".randbackground .no").classList.add("active");
       }
   }

   function randomizeImgs() {
       if (backgroundOption === true) {
           backgroundInterval = setInterval(() => {
               //get radnom number  rand from 0 to length of landImgsArray
               let randomNumberLandingImg = Math.floor(Math.random() * landImgsArray.length);
               //change background url of landing page 
               landing_page.style.backgroundImage = 'url("imgs/' + landImgsArray[randomNumberLandingImg] + '")';
           }, 1000);
       }
   }


   // start switch random background option**********
   let randombackgrounelement = document.querySelectorAll(".randbackground span");

   //loop on all spans
   randombackgrounelement.forEach(sp => {
       //click on every span
       sp.addEventListener("click", (e) => {
           e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
               ele.classList.remove("active");
           });
           //add class active to the elemenet i clicked
           e.target.classList.add("active");
           if (e.target.dataset.background === 'yes') {
               backgroundOption = true;
               localStorage.setItem("background-option", true);
               randomizeImgs();
           } else {
               backgroundOption = false;
               localStorage.setItem("background-option", false);
               clearInterval(backgroundInterval);
           }
       });
   });
   randomizeImgs();
   // end switch random background option***********
   //********************************** end landing page***************************************

   //********************************** end setting box******************************************


   //********************************** start skill******************************************

   //select skills selector
   let ourSkills = document.querySelector(".skills");

   window.onscroll = function() {
       //skills offset top 
       let skillsOffsetTop = ourSkills.offsetTop;
       //skills puter height
       let skillsOuterHeight = ourSkills.offsetHeight;
       //window height
       let windowHeight = this.innerHeight;
       //window scroll top
       let windowScrollTop = this.pageYOffset;

       if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

           //get all skills 
           let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
           allSkills.forEach(skill => {
               skill.style.width = skill.dataset.progress;
           });

       }


   }

   //********************************** end skill******************************************


   //********************************** start gallery******************************************

   //create popup with the image
   let ourGallery = document.querySelectorAll(".gallery .image-box img");
   //loop on every img
   ourGallery.forEach(img => {
       //add click event on every image
       img.addEventListener("click", (e) => {
           //create overlay element 
           let overlaygallery = document.createElement("div");
           //add class to overlaygallery element
           overlaygallery.className = "popup-overlaygallery";
           //add overlaygallery to the body
           document.body.appendChild(overlaygallery);
           //create the popup box
           let popupBox = document.createElement("div");
           //add class to overlaygallery element
           popupBox.className = "popup-box";

           if (img.alt !== null) {
               // create heading for img 
               let imgsHeading = document.createElement("h3");
               //create text for imgsHeading
               let imgsHeadingText = document.createTextNode(img.alt);
               //append the text to the heading
               imgsHeading.appendChild(imgsHeadingText);
               //append the heading to the popup
               popupBox.appendChild(imgsHeading);
           }
           //create the img element
           let popupImg = document.createElement("img");
           //set img source
           popupImg.src = img.src;
           //add img to popupBox
           popupBox.appendChild(popupImg);
           //append the popupBox to the body
           document.body.appendChild(popupBox);

           //create close button
           let closeButton = document.createElement("span");
           //add class to the close button
           closeButton.className = "close-btn";
           // create text to close button
           let closeButtonText = document.createTextNode("X");
           //add text to close button 
           closeButton.appendChild(closeButtonText);
           //add closeButton to the popupbox
           popupBox.appendChild(closeButton);
       });
   });

   //close popup
   document.addEventListener("click", (e) => {
       if (e.target.className == "close-btn") {
           //remove the current popup
           e.target.parentElement.remove();
           //remove the overlay element 
           document.querySelector(".popup-overlaygallery").remove();
       }

   });


   //********************************** end gallery******************************************





   //********************************** start Featuresy******************************************

   //create popup with the image
   let ourFeatures = document.querySelectorAll(".features .feat-box img");
   //loop on every img
   ourFeatures.forEach(img => {
       //add click event on every image
       img.addEventListener("click", (e) => {
           //create overlay element 
           let overlaygallery = document.createElement("div");
           //add class to overlaygallery element
           overlaygallery.className = "popup-overlaygallery";
           //add overlaygallery to the body
           document.body.appendChild(overlaygallery);
           //create the popup box
           let popupBox = document.createElement("div");
           //add class to overlaygallery element
           popupBox.className = "popup-box";

           if (img.alt !== null) {
               // create heading for img 
               let imgsHeading = document.createElement("h3");
               //create text for imgsHeading
               let imgsHeadingText = document.createTextNode(img.alt);
               //append the text to the heading
               imgsHeading.appendChild(imgsHeadingText);
               //append the heading to the popup
               popupBox.appendChild(imgsHeading);
           }
           //create the img element
           let popupImg = document.createElement("img");
           //set img source
           popupImg.src = img.src;
           //add img to popupBox
           popupBox.appendChild(popupImg);
           //append the popupBox to the body
           document.body.appendChild(popupBox);

           //create close button
           let closeButton = document.createElement("span");
           //add class to the close button
           closeButton.className = "close-btn";
           // create text to close button
           let closeButtonText = document.createTextNode("X");
           //add text to close button 
           closeButton.appendChild(closeButtonText);
           //add closeButton to the popupbox
           popupBox.appendChild(closeButton);
       });
   });

   //close popup
   document.addEventListener("click", (e) => {
       if (e.target.className == "close-btn") {
           //remove the current popup
           e.target.parentElement.remove();
           //remove the overlay element 
           document.querySelector(".popup-overlaygallery").remove();
       }

   });

   //********************************** end Featuresy******************************************
   //********************************** start nav bullets******************************************
   //select all bullets
   let allBullets = document.querySelectorAll(".nav-bullets .bullet");
   let navbarlinks = document.querySelectorAll(".links li a");

   // function to scroll to some where 

   function scrollTo(elements) {
       elements.forEach(ele => {
           ele.addEventListener("click", (e) => {
               e.preventDefault();
               document.querySelector(e.target.dataset.section).scrollIntoView({
                   behavior: "smooth"
               });
           });
       });
   }

   scrollTo(allBullets);
   scrollTo(navbarlinks);

   //********************************** end nav bullets******************************************

   /// function handle active stats
   function handdleactive(ev) {
       //remove active class from all lis
       ev.target.parentElement.querySelectorAll(".active").forEach(ele => {
           ele.classList.remove("active")
       });
       // add class active to the li i clicked
       ev.target.classList.add("active");
   }

   //********************************** start bullets option******************************************
   //select bullets from nav-bullets
   let navbulletscontainer = document.querySelector(".nav-bullets");
   //select bullets option  from setting box
   let bulletsSpanOprion = document.querySelectorAll(".option-box .bullets-option span");
   //get the localitem of bullets
   let bulletsLocalItem = localStorage.getItem("bullets-option");
   //check eh localitem is not empty 
   if (bulletsLocalItem !== null) {
       //remove active class from spans
       bulletsSpanOprion.forEach(span => {
           span.classList.remove("active");
       });
       //add active class to the span whitch contain the value equal to the value of localstorge item  (bullets-option)->bulletsLocalItem
       if (bulletsLocalItem === "yes") {
           navbulletscontainer.style.display = "block";
           document.querySelector(".bullets-option .yes").classList.add("active");
       } else {
           navbulletscontainer.style.display = "none";
           document.querySelector(".bullets-option .no").classList.add("active");

       }
   }
   //loop on span 
   bulletsSpanOprion.forEach(span => {
       span.addEventListener("click", (e) => {
           if (span.dataset.bullets === "show") {
               navbulletscontainer.style.display = "block";
               localStorage.setItem("bullets-option", "yes");
           } else {
               navbulletscontainer.style.display = "none";
               localStorage.setItem("bullets-option", "no");
           }
           handdleactive(e);
       });
   });



   //********************************** end bullets option********************************************



   //********************************** start reset-options********************************************
   document.querySelector(".reset-options").onclick = () => {
           //remove all localstorge item in  setting-box
           localStorage.removeItem("color-option");
           localStorage.removeItem("background-option");
           localStorage.removeItem("bullets-option");
           //reload the page
           window.location.reload();
       }
       //********************************** end reset-options********************************************



   //********************************** start toggle menu********************************************

   //select toogle menu
   let toggleMenu = document.querySelector(".header-area .toggle-menu");
   let headerlinks = document.querySelector(" .header-area .links");


   //when i click on toggle menu
   toggleMenu.onclick = function(e) {
           // prevent click on the togglemenu from close the menu
           e.stopPropagation();
           //toggle class menu-acive on toggle menu
           this.classList.toggle("menu-active");
           // toggle class open on headerlinks
           headerlinks.classList.toggle("open");
       }
       // prevent click on the links from close the menu
   headerlinks.onclick = function(e) {
           e.stopPropagation();
       }
       //click on every where to close the menue
   document.addEventListener("click", (e) => {
       if (e.taget !== toggleMenu && e.target !== headerlinks) {
           if (headerlinks.classList.contains("open")) {
               headerlinks.classList.remove("open");
               toggleMenu.classList.remove("menu-active");
           }
       }
   })




   //********************************** end toggle menu********************************************