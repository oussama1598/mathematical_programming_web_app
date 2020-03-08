const lpOptionsFormEl = document.querySelector("#lpOptionsForm");
const variableTemplateEl = document.querySelector("#variableTemplate");
const constraintTemplateEl = document.querySelector("#constraintTemplate");
const objectiveFunctionVariablesEl = document.querySelector(
  "#objectiveFunctionVariables"
);
const plFormEl = document.querySelector("#plForm");
const variablesNumEl = document.querySelector("#variablesNum");
const constraintsNumEl = document.querySelector("#constraintsNum");

function addVariablesElementsTo(distEl, position = "beforeend") {
  const variablesNum = parseInt(variablesNumEl.value, 10);
  const previousVairablesEls = distEl.querySelectorAll(
    ".template-variable"
  );
  const previousVairablesElsNum = previousVairablesEls.length;

  if (variablesNum >= previousVairablesElsNum)
    new Array(variablesNum - previousVairablesElsNum)
    .fill(0)
    .map((_, index) => previousVairablesElsNum + index + 1)
    .forEach(variableNum => {
      distEl.insertAdjacentHTML(
        position,
        variableTemplate.innerHTML.replace("{Number}", variableNum)
      );
    });
  else
    Array.from(previousVairablesEls)
    .slice(variablesNum, previousVairablesElsNum)
    .forEach(el => el.remove());
}

function addConstraintsElements() {
  const constraintsNum = parseInt(constraintsNumEl.value, 10);
  const previousConstraintsEls = document.querySelectorAll(
    ".template-constraint"
  );
  const previousConstraintsElsNum = previousConstraintsEls.length;

  if (constraintsNum >= previousConstraintsElsNum)
    new Array(constraintsNum - previousConstraintsElsNum).fill(0).forEach(() => {
      plFormEl.insertAdjacentHTML("beforeend", constraintTemplateEl.innerHTML);

      addVariablesElementsTo(document.querySelector(
        ".template-constraint:last-child .before-variables-label"
      ), "afterend");
    });
  else
    Array.from(previousConstraintsEls)
    .slice(constraintsNum, previousConstraintsElsNum)
    .forEach(el => el.remove());
}

lpOptionsFormEl.addEventListener("submit", e => {
  e.preventDefault();

  addVariablesElementsTo(objectiveFunctionVariablesEl);
  addConstraintsElements();
});

document.addEventListener("DOMContentLoaded", () => {
  addVariablesElementsTo(objectiveFunctionVariablesEl);
  addConstraintsElements();
});
