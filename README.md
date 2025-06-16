# BookAppFrontend

**Live site**: [https://bookappfrontend.netlify.app](https://bookappfrontend.netlify.app)  
**Backend repository**: [BookAppBackend on GitHub](https://github.com/XuemeiCai/BookAppBackend)  
**Backend deployment**: [Render](https://render.com/)  
**Database**: [MongoDB Atlas](https://cloud.mongodb.com/)

## Features

- **Authentication**
  - Login with pre-registered username and password
  - JWT-based access tokens with refresh token handling
  - Access token valid for **2 minutes**
  - Refresh token valid for **10 minutes**
  - Auto-logout on token expiration or failed refresh

- **Navigation**
  - Top navbar with route switching, logout, and light/dark mode toggle
  - Route guard to prevent access to protected pages when unauthenticated

- **Homepage – Book Management**
  - View list of books
  - Search books by title or author
  - Add, edit, or delete books

- **Quote Management**
  - "My Quote" page for viewing and adding quotes

- **UI Theme**
  - Light and Dark mode toggle on the top right

- **Cloud-Backed Data**
  - All books, quotes, and user info stored in **MongoDB Atlas**



