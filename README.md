# Rick and Morty Character Explorer

A modern React application for exploring characters from the Rick and Morty universe. Built with React, Vite, Tailwind CSS, and React Router, this app provides an intuitive interface to browse, search, and view detailed information about your favorite characters.

## Features

- 🔍 **Character Search**: Search characters by name with real-time debounced filtering
- 📖 **Pagination**: Navigate through all characters with smooth pagination controls
- 🌟 **Character Details**: View comprehensive character information including episodes and locations
- 🌙 **Dark/Light Theme**: Toggle between dark and light modes
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Loading**: Optimized performance with loading states and error handling
- 🎨 **Modern UI**: Beautiful, accessible interface with hover effects and animations

## Usage

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test-task
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

1. **Development Mode**:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

2. **Production Build**:
```bash
npm run build
```

3. **Preview Production Build**:
```bash
npm run preview
```

4. **Lint Code**:
```bash
npm run lint
```

### Application Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Main application pages
├── services/         # API service layer
├── hooks/            # Custom React hooks
├── contexts/         # React context providers
├── utils/            # Utility functions
└── assets/           # Static assets
```

## Technical Decisions

### Architecture Choices

1. **React + Vite**: Chosen for fast development experience and modern build tooling
   - Hot Module Replacement (HMR) for instant feedback
   - Optimized production builds
   - Modern JavaScript features support

2. **React Router**: Implemented client-side routing for smooth navigation
   - Separate pages for character list and character details
   - URL-based navigation with browser history support

3. **Tailwind CSS**: Used for rapid UI development
   - Consistent design system
   - Dark mode support built-in
   - Responsive design utilities

### API Integration Strategy

1. **Rick and Morty API**: Leveraged the free Rick and Morty REST API
   - No authentication required
   - Comprehensive character, episode, and location data
   - Built-in pagination support

2. **Service Layer Architecture**: Implemented dedicated API service (`rickService.js`)
   - Centralized API calls with error handling
   - Clean separation of concerns
   - Reusable functions across components

3. **Data Fetching Decisions**:
   - **Episodes**: Fetch detailed episode information for each character
   - **Location Data**: Retrieve origin and current location details
   - **Error Handling**: Graceful degradation when episode/location data fails
   - **Loading States**: Separate loading indicators for different operations

### UX/UI Design Decisions

1. **Search Implementation**:
   - 500ms debounce to prevent excessive API calls
   - Real-time search results
   - Search state persistence during pagination

2. **Pagination Strategy**:
   - Show pagination controls both before and after character grid
   - Display current page, total pages, and total character count
   - Preserve search filters when navigating pages

3. **Character Detail Page**:
   - Comprehensive character information layout
   - Episode list with season/episode numbers
   - Location information with fallback handling
   - Visual status indicators (alive/dead/unknown)

4. **Theme System**:
   - System preference detection
   - Persistent theme selection
   - Smooth transitions between themes

## Limitations and Future Enhancements

### Current Limitations

1. **API Dependency**: 
   - Reliant on external Rick and Morty API availability
   - No offline functionality or caching

2. **Search Functionality**:
   - Limited to name-based character search only
   - Cannot filter by status, species, or other attributes

3. **Performance**:
   - No image lazy loading implementation
   - Limited client-side caching of API responses

4. **Accessibility**:
   - Could benefit from better keyboard navigation
   - Screen reader support could be enhanced

### Future Enhancements

#### Short-term Improvements

1. **Enhanced Filtering**:
   - Add filters for character status (Alive/Dead/Unknown)
   - Species and gender filtering options
   - Multi-criteria search combinations

2. **Performance Optimizations**:
   - Implement image lazy loading
   - Add API response caching with React Query or SWR
   - Virtual scrolling for large character lists

3. **UI/UX Enhancements**:
   - Character comparison feature
   - Favorite characters functionality
   - Improved mobile navigation

#### Long-term Enhancements

1. **Data Visualization**:
   - Character relationship graphs
   - Episode appearance statistics
   - Interactive universe map

2. **Advanced Features**:
   - Character recommendation system
   - Episode tracking and watchlist
   - Social features (character ratings, reviews)

3. **Technical Improvements**:
   - Progressive Web App (PWA) implementation
   - Offline-first architecture with service workers
   - Advanced state management (Redux/Zustand)
   - Type safety with TypeScript migration

4. **Testing & Quality**:
   - Comprehensive unit and integration tests
   - E2E testing with Playwright/Cypress
   - Performance monitoring and analytics

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router Dom** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Rick and Morty API** - Character data source

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is for educational/demonstration purposes. The Rick and Morty API is used under fair use for non-commercial purposes.
