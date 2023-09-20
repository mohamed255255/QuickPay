const pfp = "/QuickPay/Online-payment-project/client-side/html/myprofile.html";
const security = "/QuickPay/Online-payment-project/client-side/html/security.html";

// get the link elements
const pfpLink = document.querySelector(".pfpLink");
const securityLink = document.querySelector(".securityLink");

// add a click event listener to each link
pfpLink.addEventListener("click", function() {
    // change the image src based on the current location
    if (window.location.href === pfp) {
        document.querySelector('.pfpimg').src = "/client-side/icons/profile-active.png";
    } else {
        document.querySelector('.pfpimg').src = "/client-side/icons/darkpfp.png";
    }
});

securityLink.addEventListener("click", function() {
    // change the image src based on the current location
    if (window.location.href === security) {
        document.querySelector('.securityimg').src = "/client-side/icons/security-active.png";
    } else {
        document.querySelector('.securityimg').src = "/client-side/icons/profile-security.png";
    }
});
