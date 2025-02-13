function createCircularAnimation({
    parent,
    duration = 2000,
    radius = 75,
    angleStart = 0,
    angleEnd = 360,
    delay = 500,
    objects,
    reverse = false,
}) {
    let current = -1;

    function animateElement(element, startTime) {
        function step(timestamp) {
            let progress = (timestamp - startTime) / duration;
            if (progress > 1) {
                element.remove();
                return;
            }

            let angle = angleStart + (angleEnd - angleStart) * progress;
            let radians = (angle * Math.PI) / 180;

            let x = Math.cos(radians) * radius;
            let y = Math.sin(radians) * radius;

            element.style.transform = `translate(calc(-50% ${reverse ? "-" : "+"} ${x}px), calc(50% - ${y}px)`;

            requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    setInterval(() => {
        if (objects.length === 0) return;

        current = (current + 1) % objects.length;
        const element = document.createElement("div");
        element.classList.add("item");
        element.style.backgroundImage = `url(${objects[current].icon})`;
        parent.appendChild(element);

        animateElement(element, performance.now());
    }, delay);
}

createCircularAnimation({
    parent: document.querySelector("#languages > .rotatePoint"),
    objects: knownLanguages,
    radius: 180,
    angleStart: 100,
    duration: 12000,
    delay: 1000,
    reverse: true,
});

createCircularAnimation({
    parent: document.querySelector("#projects > .rotatePoint"),
    objects: myProjects,
    angleStart: 100,
    radius: 180,
    duration: 12000,
    delay: 1000,
});