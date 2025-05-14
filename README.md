# 🌍 Country Info App

A NestJS application that provides detailed information about countries, including borders, population trends, and national holidays. Users can also save selected holidays to their personal calendar.

---

## 🚀 Getting Started

### 📁 Clone the Repository

```bash
git clone https://github.com/your-username/country-info-app.git
cd country-info-app
```

---

### ⚙️ Installation

1. Make sure you have the following installed:

   - [Docker](https://www.docker.com/)
   - [Node.js](https://nodejs.org/) (if not using Docker)
   - [npm](https://www.npmjs.com/) (if not using Docker)

2. **Run with Docker Compose (Recommended)**:

   If you have Docker installed, you can quickly start the application and its dependencies (e.g., PostgreSQL) using `docker-compose`:

   ```bash
   docker-compose up
   ```

   This will start the application and PostgreSQL database in containers. The API will be available at: [http://localhost:3000](http://localhost:3000).

3. **Manual Setup (Optional)**:

   If you prefer not to use Docker, follow these steps:

   - Install dependencies:

     ```bash
     npm install
     ```

   - Copy the `.env.example` file and set your environment variables:

     ```bash
     cp .env.example .env
     ```

   - Edit the `.env` file and provide your PostgreSQL database configuration:

     ```env
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=postgres
     DB_PASSWORD=yourpassword
     DB_DATABASE=country_db
     NAGER_API=https://date.nager.at/api/v3
     COUNTRIES_API=https://countriesnow.space/api/v0.1
     ```

   - Ensure your PostgreSQL server is running and the database exists.

---

## 🧪 Running the App

1. **With Docker Compose**:

   The application will already be running after executing `docker-compose up`.

2. **Without Docker**:

   Start the development server manually:

   ```bash
   npm run start:dev
   ```

   The API will be available at: [http://localhost:3000](http://localhost:3000).

---

## 🧪 Testing the API with Postman

### 1. Add Holidays to User Calendar

**Endpoint**: `POST /:userId/calendar/holidays`

**Request Body**:

```json
{
  "countryCode": "US",
  "year": 2025,
  "holidays": ["New Year's Day", "Independence Day"]
}
```

**Response**: List of saved holiday entries.

---

### 2. Get Country Info

**Endpoint**: `GET /:countryCode`

**Response**:

- Country details
- List of border countries
- Historical population
- Flag URL
