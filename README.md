# DSA 301 – Data Visualization | Project 1

**Mert Güngör – 34159**

## Live Demo

You can open the visualization in your browser here:

**https://mert-gng-99.github.io/DSA301-Project/**

---

## About This Project

This is Project 1 for DSA 301 Data Visualization at Sabancı University.

The project explores the research question:

> *"How do fertility rate decline and unemployment fluctuations relate to the uneven population growth across Turkish cities?"*

Data sources used:
- TÜİK ADNKS – city population data (1927–2024)
- TÜİK Labour Force Statistics – unemployment rate (2007–2024)
- TÜİK Fertility Statistics – total fertility rate (2007–2024)

---

## Folder Structure

```
DSA301-Project/
│
├── README.md
│
├── imagesfrompdf/
│   └── DSA301_Project1_MertGungor_34159.pdf
│
└── task3project/
    ├── index.html
    ├── vite.svg
    └── src/
        ├── main.js
        └── dataset.csv
```

---

## How to Run Locally

1. Go into the project folder:
```
cd task3project
```

2. Install dependencies:
```
npm install
```

3. Start the local server:
```
npm run dev
```

4. Open your browser and go to `http://localhost:5173`

---

## What the Code Does

The `main.js` file loads `dataset.csv` using `d3.csv()`. It builds three charts:

- **Chart 1** – Population growth for all 6 cities (1927–2024)
- **Chart 2** – National unemployment rate (2007–2024)
- **Chart 3** – Total fertility rate with replacement level reference line (2007–2024)

The project uses **D3.js v7** and **Vite** (Vanilla JavaScript), the same tools used in the recitation.

---

## Note

Only the grammar checking was done by AI. The JavaScript visualization code, data processing, chart design decisions, and all D3.js implementations are my own work. Code inspired from recitations.
