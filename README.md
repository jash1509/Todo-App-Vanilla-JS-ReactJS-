# TaskFlow — Premium React Productivity Dashboard

TaskFlow is a high-fidelity, visually stunning Todo application built with **React.js** and **Vite**, featuring a glassmorphic dark-theme visual style, real-time analytics, and keyboard accessibility.

---

## ✨ Features

### 📊 1. Live Analytics Dashboard
*   **Total & Status Counters**: Tracks total, completed, and pending tasks in real time.
*   **Animated SVG Progress Wheel**: Visualizes task completion percentage with a glowing radial gradient ring.
*   **Header Calendar Widget**: Displays the current formatted calendar date dynamically.

### ⚙️ 2. Dynamic Control Toolbar
*   **Real-time Search**: Narrows down lists instantly as you type and highlights matching keyword terms.
*   **Segmented Filters**: Quick toggles to switch views (All, Pending, Completed) with a sliding transition indicator.
*   **Sorting Options**: Arrange tasks instantly by Newest First, Oldest First, Alphabetical (A-Z), and Alphabetical (Z-A).
*   **Bulk Commands**: Enables/disables a button to clear all completed items simultaneously.

### ✏️ 3. Inline Editing & Full CRUD
*   **Interactive Toggles**: Checkboxes to switch tasks between completed and pending.
*   **Double-Click Inline Editing**: Double-click task text or click the edit icon to transform the label into an input field.
*   **Keyboard Shortcuts**: Press `Enter` to save edits or `Escape` to cancel.
*   **Confirm Modal**: Prompts users before permanently deleting any task to avoid accidents.

### 🔔 4. Toasts & Error Validation
*   **Transient Toast System**: Displays auto-dismissing notifications for success, warnings, or edits.
*   **Form Validation**: Blocks duplicates and whitespace-only entries, showing custom error alert banners.

---

## 🛠️ Tech Stack

*   **Core**: React.js (functional components & state hooks)
*   **Build Tool**: Vite (blazing fast bundling and HMR)
*   **Styling**: Premium Vanilla CSS (variables, glassmorphic cards, custom inputs, keyframe animations, and custom scrollbars)

---

## 📁 Project Structure

```text
├── public/
│   └── favicon.svg       # Custom brand favicon
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ConfirmModal.jsx  # Confirmation overlay dialog
│   │   ├── Dashboard.jsx     # Analytics stats & SVG ring
│   │   ├── ToastManager.jsx  # Notification alert context
│   │   ├── TodoForm.jsx      # Task creation form & validation
│   │   ├── TodoItem.jsx      # Todo card with inline edit inputs
│   │   ├── TodoList.jsx      # Iterates task list & empty layouts
│   │   └── TodoToolbar.jsx   # Search, sort, filters slider
│   ├── App.jsx           # Main coordinator (global state & storage)
│   ├── index.css         # Theme tokens, layout, and animations
│   └── main.jsx          # Bootstrap mounting script
├── index.html            # Main template (fonts & SEO links)
├── package.json          # Node modules and build scripts
└── vite.config.js        # Vite compiler settings
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation
1. Clone this repository to your local machine.
2. Open terminal in the project root directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To launch the hot-reloading development server:
```bash
npm run dev
```
Open the output URL (usually `http://localhost:5173`) in your browser to view the application.

### Building for Production
To bundle and compile highly-optimized static assets in the `/dist` directory:
```bash
npm run build
```
