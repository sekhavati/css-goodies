const buildThresholdList = () => {
  let thresholds = [];
  let numSteps = 1000;

  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
};

const onIntersected = entries => {
  entries.forEach(entry => {
    document.querySelectorAll(".theatre__curtain").forEach(curtain => {
      const scaleX = 1 - entry.intersectionRatio;
      const scaleY = 1;
      curtain.style.transform = `matrix(${scaleX}, 0, 0, ${scaleY}, 0, 0)`;
    });
  });
};

window.addEventListener("load", function() {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  const theatreElement = document.querySelector("#theatre");
  const observer = new IntersectionObserver(onIntersected, options);
  observer.observe(theatreElement);
});
