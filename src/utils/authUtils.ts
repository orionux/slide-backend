interface User {
    username: string;
    password: string;
  }
  
  interface Users {
    [key: string]: User;
  }
  
  // Function to authenticate user
  export const authenticateUser = (username: string, password: string): string | null => {
    // Define user types and their corresponding credentials
    const users: Users = {
      admin: { username: 'admin123@gmail.com', password: 'password123' },
      subadmin: { username: 'subadmin123@gmail.com', password: 'password123' },
      user: { username: 'user123@gmail.com', password: 'password123' }
    };
  
    // Check if the provided username and password match any user
    for (const userType in users) {
      if (Object.prototype.hasOwnProperty.call(users, userType)) {
        const user = users[userType];
        if (user.username === username && user.password === password) {
          // If match found, store user type in local storage
          localStorage.setItem('userType', userType);

          return userType; // Return the authenticated user type
        }
      }
    }
  
    return null; // Return null if authentication fails
  };
  