# Zillow API

A simple Node.js + Express task emulating a mini Zillow API over an in-memory array of houses.

## Project Structure

```
.
├── zillow.js      # Express server and routes
└── package.json   # Metadata, dependencies, npm scripts
```

## Requirements

- Node.js: v18+ (recommended)
- npm: v8+

Check your versions:

```
node -v
npm -v
```

## Setup & Installation

Install dependencies:

```
npm install
```

## Running the Server

You must specify a port.

### Option 1: Using npm (default: 3000)

```
npm start
```

Equivalent to:

```
node zillow.js 3000
```

### Option 2: Run with a custom port

```
node zillow.js 5000
```

Then your base URL is:

```
http://localhost:<PORT>
```

## API Endpoints

Assuming the server is running on port 3000.

Base URL: `http://localhost:3000`

### 1. GET `/v1/zillow/zestimate`

Calculates a fake "zestimate":

```
zestimate = sqft * bed * bath * 10
```

Query params (all required, non-negative integer strings):

- `sqft`
- `bed`
- `bath`

Example:

```
curl "http://localhost:3000/v1/zillow/zestimate?sqft=1000&bed=2&bath=2"
# => { "zestimate": 40000 }
```

Invalid/missing param:

- `404` and `{}`

---

### 2. GET `/v1/zillow/houses`

Returns houses for a city (case-insensitive).

Query param:

- `city` (optional)

Example:

```
curl "http://localhost:3000/v1/zillow/houses?city=austin"
# => [ { "price": 300000, "city": "austin" }, ... ]
```

If missing/blank:

- `200` and `[]`

---

### 3. GET `/v1/zillow/prices`

Returns houses cheaper than given USD.

Query param:

- `usd` (required, non-negative integer string)

Example:

```
curl "http://localhost:3000/v1/zillow/prices?usd=400000"
# => houses with price < 400000
```

Invalid/missing param:

- `404` and `{}`

---

### 4. Unknown Routes

Any other path returns:

```
404 Not Found
```

Example:

```
curl -i "http://localhost:3000/v1/zillow/does-not-exist"
# HTTP/1.1 404 Not Found
```

---

## Before Pushing

- Run `npm install` and start server (`npm start`).
- Hit endpoints with `curl`, Postman, or browser.
- Commit at least:
  - `zillow.js`
  - `package.json`
  - `README.md`
