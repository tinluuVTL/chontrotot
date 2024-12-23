import { initializeApp } from "firebase/app"
import { getAuth, signInAnonymously  } from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: "G-QVK06TK2EM"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Thêm xử lý lỗi chi tiết
signInAnonymously(auth)
  .then(() => {
    console.log('Đăng nhập ẩn danh thành công');
  })
  .catch((error) => {
    console.error('Lỗi đăng nhập ẩn danh:', error.code, error.message);
  });

export { auth };