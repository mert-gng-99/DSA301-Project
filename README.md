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
├── DSA301_Project1_MertGungor_34159.pdf
│    
├── imagesfrompdf
│   ├── images
│
└── task3project/
    ├── index.html
    ├── vite.svg
    └── src/
        ├── main.js
        └── dataset.csv
    ...and the rest files
    
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

Only the grammar checking was done by AI. Writing the project, the JavaScript visualization code, data processing, chart design decisions, and all D3.js implementations are my own work. Code inspired from recitations.

---

# DSA 301 – Data Visualization | Project 2

**Mert Güngör – 34159**

## About

Project 2 covers Japan Inbound Immigration data visualization 
and WHOOP Health Dataset mobile dashboard analysis using D3.js.

## How to Run

1. Go into the project folder:
cd project2

2. Start a local server:
python -m http.server 8080

3. Open in browser:
http://localhost:8080/index_japan_v1.html
http://localhost:8080/index_japan_v2.html
http://localhost:8080/index_whoop.html
http://localhost:8080/whoop_sketches.html

## Note

All parts that do not ask for AI usage are entirely my own work.
Code inspired from recitations.
