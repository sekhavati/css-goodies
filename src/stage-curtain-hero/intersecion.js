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
    // Assumption here that the only element being observed is the theatre

    document.querySelectorAll(".theatre__curtain").forEach(curtain => {
      const scaleX = 1 - entry.intersectionRatio;
      curtain.style.transform = `matrix(${scaleX}, 0, 0, 1, 0, 0)`;
    });

    const scale = 2 - entry.intersectionRatio; // ratio 0 , y = 1.8 | ratio 1, y = 1
    const translateY = -30 + 30 * entry.intersectionRatio;
    document.querySelector(
      ".theatre__stage"
    ).style.transform = `matrix(${scale}, 0, 0, ${scale}, 0, ${translateY})`;
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
