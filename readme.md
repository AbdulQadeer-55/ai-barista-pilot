# AI Barista Pilot

A full-stack application that uses AI to recommend pastry pairings for different coffee blends. The backend analyzes coffee characteristics and suggests complementary pastries, while the frontend provides an intuitive interface to explore these pairings.

## Project Structure

```
ai-barista-pilot/
├── backend/              # FastAPI Python backend
│   ├── app/
│   │   ├── main.py      # FastAPI application and endpoints
│   │   ├── logic.py     # Pairing logic and coffee/pastry data
│   │   └── __init__.py
│   ├── requirements.txt
│   └── .env
└── frontend/            # React + Vite frontend
    ├── src/
    │   ├── App.jsx      # Main application component
    │   ├── App.css      # Application styling
    │   ├── main.jsx     # React entry point
    │   └── index.css    # Global styles
    ├── package.json
    └── vite.config.js
```

## Features

- **Coffee Selection**: Choose between "Sweetspot Standard" and "Bluebird Kenia" coffee blends
- **AI Pairing Recommendations**: Get personalized pastry pairing suggestions based on coffee flavor profiles
- **Responsive Design**: Beautiful, responsive UI built with React
- **Real-time Feedback**: Loading states and error handling for seamless user experience

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Python 3.x** - Backend language
- **CORS Middleware** - Handle cross-origin requests

### Frontend
- **React 19** - UI library
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API requests
- **ESLint** - Code linting

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a `.env` file with necessary environment variables

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend

From the backend directory:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`

### Start the Frontend

From the frontend directory:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build

## API Endpoints

### `POST /generate-pairing`
Generates pastry pairing recommendations for a selected coffee.

**Request:**
```json
{
  "coffee_id": "standard"
}
```

**Response:**
```json
{
  "coffee": "Sweetspot Standard (balanced, caramel, chocolate, Orange, Hazelnut)",
  "pairings": [
    {
      "pastry": "Franzbrötchen",
      "reason": "Caramel sweetness mirrors the roasted chocolate notes of the blend.",
      "image": "/images/franzbrotchen.jpg"
    }
  ]
}
```

### `GET /`
Health check endpoint to verify the API is running.

## Supported Coffee Blends

1. **Sweetspot Standard** - Balanced blend with caramel, chocolate, orange, and hazelnut notes
2. **Bluebird Kenia** - Fruity blend with red currant and cherry notes

## Environment Setup

Create a `.env` file in the backend directory if needed for additional configuration.

## License

This project is part of the AI Barista Pilot initiative.