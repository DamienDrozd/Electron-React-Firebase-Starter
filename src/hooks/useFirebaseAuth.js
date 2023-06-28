import { useState, useEffect, useMemo } from 'react'
import { auth } from 'config/firebase_config.js';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useLocation, redirect } from 'react-router-dom';
import addDocument from 'firebase/addDocument';
import getUser from 'firebase/getUser';
import putUser from 'firebase/putUser';



const formatUser = (user) => ({
  uid: user.uid,
  email: user.email
});

export const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const location = useLocation()



  const userPath = useMemo(() => ["/", "/item/details", "/item/add"], [])
  const publicPath = useMemo(() => ["/auth/login"], [])

  useEffect(() => {
    if (isLogged) {
      if (!userPath.includes(location)) {
        return redirect("/")
      }
    } else {
      if (!publicPath.includes(location)) {
        return redirect("/auth/login")
      }
    }
  }, [isLogged, location])


  const authStateChanged = async (authState) => {
    if (!authState) {
      setIsLogged(false);
      setLoading(false);
      setUser(null);
    } else {
      setIsLogged(true);
    }
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);


  const clear = () => {
    setUser(null);
    return setLoading(true);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth).then(clear);
  };

  const loginWithPassword = async (email, password) => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      getUser(res.user.uid).then(({ result, error }) => {
        console.log(result)
        if (result === undefined || result === null) {
          const user = res.user;
          return addDocument(("users"), {
            uid: user.uid,
            authProvider: "local",
            email: user.email,
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  };


  const updateCurrentUser = async (data) => {
    let userNow = auth.currentUser;
    await putUser(userNow.uid, data)
    await authStateChanged(userNow)
  }

  const getCurrentUser = async () => {
    let userNow = auth.currentUser;
    console.log(userNow)
    if (userNow === null) return { result: null, error: "no user" }
    return await getUser(userNow.uid)
  }


  return {
    user,
    loginWithPassword,
    loading,
    logout,
    isLogged,
    updateCurrentUser,
    getCurrentUser
  };
}