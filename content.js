// CONSTANTS
const SHADOW_HOST_STYLES = {
  position: "fixed",
  top: "0",
  left: "50%",
  width: "350px",
  transform: "translateX(-50%)",
  zIndex: "9999",
};

const STYLE_CONTENT = `
.toolbar {
  width: 350px;
}
.form-select {
  border: 1px solid #dee2e6;
}
`;

const PRIMER_CSS_URL =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";

const HEADINGS_SELECTOR = "h1, h2, h3, h4, h5, h6";

// FUNCTIONS

function createElementWithStyles(tag, styles) {
  const element = document.createElement(tag);
  Object.assign(element.style, styles);
  return element;
}

function appendStylesheetToShadowRoot(shadowRoot, url) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  shadowRoot.appendChild(link);
}

function appendStyleElementToShadowRoot(shadowRoot, styleContent) {
  const style = document.createElement("style");
  style.textContent = styleContent;
  shadowRoot.appendChild(style);
}

function createShadowHost() {
  const shadowHost = createElementWithStyles("div", SHADOW_HOST_STYLES);
  document.body.appendChild(shadowHost);
  return shadowHost.attachShadow({ mode: "open" });
}

function applyDefaultStylesToRegion(regionMain) {
  regionMain.style.color = "#333";
  regionMain.style.fontSize = "16px";
  applyDefaultStylesToHeadings(regionMain);
}

function applyDefaultStylesToHeadings(regionMain) {
  regionMain.querySelectorAll(HEADINGS_SELECTOR).forEach((element) => {
    element.style.color = "#333";
  });
}

// Hàm để tạo nút chuyển đổi giữa container và container-fluid
function createContainerToggleButton(pageElement) {
  const toggleBtn = document.createElement("button");
  const currentClass = pageElement
    .querySelector(".container, .container-fluid")
    ?.classList.contains("container")
    ? "container"
    : "container-fluid";

  toggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi ${
        currentClass === "container"
          ? "bi-fullscreen-exit"
          : "bi-arrows-fullscreen"
      }" viewBox="0 0 16 16">
          ${
            currentClass === "container"
              ? '<path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z"/>'
              : '<path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"/>'
          }
      </svg>`;
  toggleBtn.title =
    currentClass === "container"
      ? "Switch to Container Fluid"
      : "Switch to Container";
  toggleBtn.className = "btn btn-light";
  toggleBtn.onclick = () => {
    const containerElement = pageElement.querySelector(
      ".container, .container-fluid"
    );
    if (containerElement) {
      if (containerElement.classList.contains("container")) {
        containerElement.classList.remove("container");
        containerElement.classList.add("container-fluid");
        saveToStorage("containerClass", "container-fluid");
        toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                  <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z"/>
              </svg>`;
      } else {
        containerElement.classList.remove("container-fluid");
        containerElement.classList.add("container");
        saveToStorage("containerClass", "container");
        toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"/>
              </svg>`;
      }
    }
  };

  return toggleBtn;
}

function saveToStorage(key, value) {
  chrome.storage.sync.set({ [key]: value }, () => {
    console.log(`${key} saved:`, value);
  });
}

function loadFromStorage(keys, callback) {
  chrome.storage.sync.get(keys, callback);
}

function loadFontSize(regionMain) {
  loadFromStorage(["fontSize"], (result) => {
    if (result.fontSize) {
      regionMain.style.fontSize = result.fontSize;
      console.log("Font size restored:", result.fontSize);
    }
  });
}

function loadColor(regionMain) {
  loadFromStorage(["color"], (result) => {
    if (result.color) {
      regionMain.style.color = result.color;
      applyColorToHeadings(regionMain, result.color);
      console.log("Color restored:", result.color);
    }
  });
}

function loadFontFamily(regionMain) {
  loadFromStorage(["fontFamily"], (result) => {
    if (result.fontFamily) {
      regionMain.style.fontFamily = `${result.fontFamily}, sans-serif`;
      applyFontFamilyToHeadings(regionMain, result.fontFamily);
      console.log("Font family restored:", result.fontFamily);
    }
  });
}

function createButton(iconSvg, title, onClick) {
  const button = document.createElement("button");
  button.innerHTML = iconSvg;
  button.title = title;
  button.className = "btn btn-light";
  button.onclick = onClick;
  return button;
}

function createZoomInButton(regionMain) {
  return createButton(
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
      </svg>`,
    "Phóng to",
    () => adjustFontSize(regionMain, 2)
  );
}

function createZoomOutButton(regionMain) {
  return createButton(
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
      </svg>`,
    "Thu nhỏ",
    () => adjustFontSize(regionMain, -2)
  );
}

function adjustFontSize(regionMain, adjustment) {
  const currentFontSize = parseFloat(
    window.getComputedStyle(regionMain).fontSize
  );
  const newFontSize = Math.max(currentFontSize + adjustment, 10) + "px";
  regionMain.style.fontSize = newFontSize;
  saveToStorage("fontSize", newFontSize);
  adjustHeadingFontSizes(regionMain, adjustment);
}

function adjustHeadingFontSizes(regionMain, adjustment) {
  regionMain.querySelectorAll(HEADINGS_SELECTOR).forEach((element) => {
    const currentFontSize = parseFloat(
      window.getComputedStyle(element).fontSize
    );
    element.style.fontSize = Math.max(currentFontSize + adjustment, 10) + "px";
  });
}

function createColorPicker(regionMain) {
  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.className = "form-control form-control-color";

  // Load saved color value from storage
  loadFromStorage(["color"], (result) => {
    if (result.color) {
      colorInput.value = result.color;
      regionMain.style.color = result.color;
      applyColorToHeadings(regionMain, result.color);
      console.log("Color restored:", result.color);
    } else {
      colorInput.value = "#333"; // Default color
    }
  });

  colorInput.oninput = (e) => {
    regionMain.style.color = e.target.value;
    applyColorToHeadings(regionMain, e.target.value);
    saveToStorage("color", e.target.value);
  };
  return colorInput;
}

function applyColorToHeadings(regionMain, color) {
  regionMain.querySelectorAll(HEADINGS_SELECTOR).forEach((element) => {
    element.style.color = color;
  });
}

function createFontSelector(regionMain) {
  const fontSelect = document.createElement("select");
  fontSelect.className = "form-select";
  fontSelect.style.width = "150px";

  const fonts = [
    "Arial",
    "Courier New",
    "Georgia",
    "Roboto",
    "Source Code Pro",
    "Fira Code",
    "Open Sans",
    "Lora",
    "Merriweather",
    "Consolas",
  ];

  fonts.forEach((font) => {
    const option = document.createElement("option");
    option.value = font;
    option.text = font;
    fontSelect.appendChild(option);
  });

  // Load saved font family value from storage
  loadFromStorage(["fontFamily"], (result) => {
    if (result.fontFamily) {
      fontSelect.value = result.fontFamily;
      regionMain.style.fontFamily = `${result.fontFamily}, sans-serif`;
      applyFontFamilyToHeadings(regionMain, result.fontFamily);
      console.log("Font family restored:", result.fontFamily);
    }
  });

  fontSelect.onchange = (e) => {
    regionMain.style.fontFamily = `${e.target.value}, sans-serif`;
    applyFontFamilyToHeadings(regionMain, e.target.value);
    saveToStorage("fontFamily", e.target.value);
  };

  return fontSelect;
}

function applyFontFamilyToHeadings(regionMain, fontFamily) {
  regionMain.querySelectorAll(HEADINGS_SELECTOR).forEach((element) => {
    element.style.fontFamily = `${fontFamily}, sans-serif`;
  });
}

function createToolbar(regionMain) {
  const toolbar = document.createElement("div");
  toolbar.className =
    "toolbar d-flex flex-justify-between flex-items-center p-2";

  const zoomInBtn = createZoomInButton(regionMain);
  const zoomOutBtn = createZoomOutButton(regionMain);
  const colorPicker = createColorPicker(regionMain);
  const fontSelector = createFontSelector(regionMain);

  toolbar.appendChild(zoomInBtn);
  toolbar.appendChild(zoomOutBtn);
  toolbar.appendChild(colorPicker);
  toolbar.appendChild(fontSelector);

  return toolbar;
}

// MAIN EXECUTION

// Create Shadow DOM
const shadowRoot = createShadowHost();

// Append styles and toolbar to Shadow DOM
appendStylesheetToShadowRoot(shadowRoot, PRIMER_CSS_URL);
appendStyleElementToShadowRoot(shadowRoot, STYLE_CONTENT);

// Create toolbar and append it to shadow root
const regionMain = document.getElementById("region-main");
const toolbar = createToolbar(regionMain);
shadowRoot.appendChild(toolbar);

// Apply default styles and load saved preferences
applyDefaultStylesToRegion(regionMain);
loadFontSize(regionMain);
loadColor(regionMain);
loadFontFamily(regionMain);