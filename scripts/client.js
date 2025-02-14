function createCircularAnimation({
    parent,
    duration = 2000,
    radius = 75,
    angleStart = 0,
    angleEnd = 360,
    delay = 500,
    objects,
    reverse = false,
    clickFunc,
    offset = 0,
}) {
    let current = -1;

    function animateElement(element, spawnTime) {
        function step(timestamp) {
            let elapsed = timestamp - spawnTime; // Use absolute elapsed time
            let progress = elapsed / duration;
    
            if (progress >= 1) {
                element.remove();
                return;
            }
    
            let angle = angleStart + (angleEnd - angleStart) * progress;
            let radians = (angle * Math.PI) / 180;
    
            let x = Math.cos(radians) * radius;
            let y = Math.sin(radians) * radius;
    
            element.style.transform = `translate(calc(-50% ${
                reverse ? "-" : "+"
            } ${x}px), calc(50% - ${y}px))`;
    
            requestAnimationFrame(step);
        }
    
        requestAnimationFrame(step);
    }    

    setInterval(() => {
        if (objects.length === 0) return;
        const object = objects[current];
        current = (current + 1) % objects.length;
        const element = document.createElement("div");
        element.classList.add("item");
        element.style.backgroundImage = `url(${object.icon})`;
        element.addEventListener("click", () => {
            clickFunc(object, element, offset);
        });
        parent.appendChild(element);

        animateElement(element, performance.now());
    }, delay);
}

function getAbsolutePosition(element) {
    if (!element) return null;

    const rect = element.getBoundingClientRect();
    const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        width: rect.width,
        height: rect.height,
    };
}

const detailDisplay = document.getElementById("detailDisplay");

function displayDetails(object, element, offset = 0) {
    Array.from(detailDisplay.children).forEach((element) => {
        element.classList.add("fadeOut");
        setTimeout(() => {
            element.remove();
        }, 1500);
    });
    const newDisplay = element.cloneNode(true);
    newDisplay.innerHTML = `
        <h3>${object.name}</h3>
        <h4> Test Sigma Rizz </h4>
        <h4> Test Sigma Rizz </h4>
        <h4> Test Sigma Rizz </h4>
        <h4> Test Sigma Rizz </h4>
        <h4> Test Sigma Rizz </h4>
    `
    const elementInfomration = getAbsolutePosition(element);
    console.log(elementInfomration);
    newDisplay.style.transform = "";
    newDisplay.style.transition = "1000ms";
    newDisplay.style.position = "absolute";
    newDisplay.style.border = "15px solid #0e0e0e";
    newDisplay.style.width = elementInfomration.width + "px";
    newDisplay.style.height = elementInfomration.height + "px";
    newDisplay.style.top = elementInfomration.top + "px";
    newDisplay.style.left = elementInfomration.left + offset + "px";
    detailDisplay.appendChild(newDisplay);
    const closeButton = document.createElement("i");
    closeButton.className = "fi fi-br-x closeButton";
    newDisplay.appendChild(closeButton);
    closeButton.addEventListener("click", () => {
        newDisplay.classList.add("fadeOut");
        setTimeout(() => {
            newDisplay.remove();
        }, 1500);
    })
    setTimeout(() => {
        newDisplay.classList.add("display");
    }, 15);
    Array.from(newDisplay.children).forEach(element => {
        element.style.opacity = "0";
    });
    setTimeout(() => {
        let delay = 0;
        Array.from(newDisplay.children).forEach(element => {
            delay += 50;
            setTimeout(() => {
                element.classList.add("fadeIn");
            }, delay);
        });
    }, 625);
}

createCircularAnimation({
    parent: document.querySelector("#languages > .rotatePoint"),
    objects: knownLanguages,
    radius: 180,
    angleStart: 100,
    duration: 12000,
    delay: 1000,
    reverse: true,
    clickFunc: displayDetails,
});

createCircularAnimation({
    parent: document.querySelector("#projects > .rotatePoint"),
    objects: myProjects,
    angleStart: 100,
    radius: 180,
    duration: 12000,
    delay: 1000,
    clickFunc: displayDetails,
});
