// import { useEffect, useState } from 'react';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import './Profile.css';

// const Profile = () => {
//   const [userCars, setUserCars] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const auth = getAuth();
//     const database = getDatabase();

//     // Set up a listener for authentication state changes
//     const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
//       if (authUser) {
//         // If the user is authenticated, update the state
//         setUser(authUser);

//         // Fetch user's cars when the component mounts
//         const userId = authUser.uid;
//         const userCarsRef = ref(database, `users/${userId}/cars`);

//         // Set up a listener for changes in user's cars
//         const unsubscribeCars = onValue(userCarsRef, (snapshot) => {
//           const cars = snapshot.val() || {};
//           const carsList = Object.values(cars);
//           setUserCars(carsList);
//         });

//         // Clean up the listener when the component unmounts
//         return () => {
//           unsubscribeCars();
//         };
//       } else {
//         // If the user is not authenticated, set user state to null
//         setUser(null);
//         setUserCars([]); // Clear userCars when user logs out
//       }
//     });

//     // Clean up the authentication listener when the component unmounts
//     return () => {
//       unsubscribeAuth();
//     };
//   }, []); // The empty dependency array ensures the effect runs only once on mount

//   return (
//     <div>
//       {user ? (
//         <div>
//           <h2>Welcome, {user.displayName}!</h2>
//           <h3>Your Cars:</h3>
//           <ul>
//             {userCars.map((car) => (
//               <li key={car.carId}>
//                 {car.make} {car.model} ({car.year})
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>Please sign in to view your profile.</p>
//       )}
//     </div>
//   );
// };

// export default Profile;
