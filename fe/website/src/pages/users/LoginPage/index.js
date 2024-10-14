import { useEffect } from "react";
import "./login.scss";
import Cookies from "js-cookie";
import axios from "axios";
import { useUser } from "core/UserContext";
import { useGoogleLogin } from '@react-oauth/google';
function LoginPage() {
    const { user, login, logout} = useUser();
     // Kiểm tra trạng thái đăng nhập khi trang được tải lại 
     const checkLoggedInUser = async () => {
        try {
            let accessToken = Cookies.get('access_token')

            if (accessToken) {
                const userRes = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                );
                const userData = userRes.data; 
                login(userData); 
                
            }

        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => { 


        console.log('User data',user);

        checkLoggedInUser();
    }, []);
    const handleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                Cookies.set('access_token');

                const userRes = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${response.access_token}`
                        }
                    }
                );
                const userData = userRes.data;

                console.log('User Data', userRes) 
    
                // Kiểm tra xem người dùng đã tồn tại trong users chưa
                const existingUserRes = await axios.get(`http://localhost:3000/users?email=${userData.email}`);
                let userId;
                if (existingUserRes.data.length === 0) {
                    // Nếu chưa tồn tại, thêm người dùng vào users
                    const newUserRes = await axios.post('http://localhost:3000/users', userData);
                    userId = newUserRes.data.id; // Lưu id của user mới
                } else {
                    userId = existingUserRes.data[0].id; // Lấy id của người dùng đã tồn tại
                } 
    
                // Cập nhật state với userId
                login({ ...userData, id: userId });
                console.log(userData);
            } catch (err) {
                console.error(err);
            }
        },
    }); 
  return (
    <div className="login-container">
      {/* Hình nền */}
      <div className="background-image">
        <img
          src="https://theme.hstatic.net/1000197303/1001046599/14/img-home-collection1.jpg?v=9816"
          alt="Background"
        />
      </div>

      {/* Form đăng nhập */}
      <div className="login-box">
        <h2>Đăng nhập</h2>
        <form>
          <input type="text" placeholder="Nhập email hoặc số điện thoại" />
          <input type="password" placeholder="Mật khẩu" />
          <button type="submit">Đăng Nhập</button>
          <div className="social-login">
            <span>Hoặc</span>
            <div className="social-icons">
              <button onClick={handleLogin}>Google</button>
              <button>Facebook</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

