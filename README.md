# Hướng dẫn cài đặt chạy web trên máy tính Local

Để chạy được web phải cần 3 yếu tố:

- 1 postgres server - database chạy local _(Cái này lên mạng tải postgressql về máy và cài đặt như bình thường.)_
- 1 server _(xử lý logic phía sau trang web)_
- 1 client _(hiển thị giao diện UI)_

### 1. Cài đặt server postgres - Database

Truy cập vào link [download này](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) để tại postgres vê. Sau đó cài đặt bình thường nếu chưa có postgres trên máy, có thể xem hướng dẫn trên mạng.
Lúc cài cần nhớ username và password đẻ truy cập vào server. Thường thì username là `postgres` nếu không tự custom gì, còn mật khẩu thì từ đặt.

_NOTE: Sau khi cài xong check xem postgres server đã chạy lên chưa, vào services cúa máy để tìm, nếu chưa running thì start nó lên_

Tiếp theo, cần tạo một database postgres và đặt tên cho nó. Tên gì cũng được ví dụ `phongtro`. Các bước tạo mới 1 DB thì có thể google hoặc làm theo như sau:

- Tìm kiếm trên máy `psql` _(thằng này sẽ được cài trong lúc cài postgres server)_, mở `psql` lên, sau đó cứ bấm `Enter` cho tới khi nó bắt nhập `password` thì nhập vào _(lưu ý, lúc nhập mật khẩu nó không hiện đâu, cứ nhập đúng mk rồi `Enter` là được, có thể gg)._
- Sau khi đăng nhập xong, gõ câu lệnh sau để tạo mới database: `CREATE DATABASE phongtro;`, trong đó `phongtro` là tên database, đặt sao cũng được.

### 2. Cài và chạy server nodejs

Khúc này nếu máy chưa có cài nodejs thì tải và cài trước nhé. Có thể vào terminal và chạy lệnh `node -v` để check xem có node chưa và `npm -v` để check xem có cài `npm` chưa.

Mở source code lên, **mở terminal đứng tại forder server**.

Trước tiên chạy lệnh `npm i` hoặc `npm install` để tại thư viện cần thiết. Nếu lỗi thì có thể thử `npm i -- force`.

Trong forder server, tạo một file mới đặt tên là `.env`, sau đó mở file `.env.example` lên và copy hết trong đó đem qua paste lại vào file `.env`.

Sau đó, điền hết thông tin vào file `.env`. Cụ thể như sau:

- Biến `EMAIL_APP_PASSWORD` là giá trị gmail app password, cái này có thể gg để biết cách lấy và biến `EMAIL_NAME` là email đăng ký lấy gmail app password.
- `CLIENT_URL=http://localhost:5173`
- `PORT=5000`
- `POSTGRES_USER` là tên username để đăng nhập postgres server, mặc định là `postgres`
- `POSTGRES_PASSWORD` là mật khẩu đăng nhập postgres
- `POSTGRES_DB` là tên database nảy mới tạo, ví dụ `phongtro`
- `POSTGRES_PORT=5432`
- `POSTGRES_HOST=localhost`
- `DB_DIALECT=postgres`
- `JWT_SECRET` là biến dùng để tạo jsonwebtoken, để giá trị tùy ý
- Biến `CLOUDINARY_NAME`, `CLOUDINARY_KEY` và `CLOUDINARY_SECRET` là tạo tài tào khoản cloudinary rồi lấy trong phần dashboard.

Tiếp theo, mở terminal forder server chạy server lên bằng lệnh: `npm run dev`.

Sau khi server chạy lên thành công thì tới bước khởi tạo bảng cho database, và insert dữ liệu.

Chạy lần lượt câu lệnh sau:

- `npx sequelize-cli db:migrate` hoặc `npm run mig`
- `npx sequelize-cli db:seed:all` hoặc `npm run seed`

Sau đó kiểm tra xem bảng `catalogs` và bảng `roles` có dữ liệu chưa, dúng pgadmin4 hoặc dbeaver.

Kết thúc chạy thàng công server

### 3. Chạy client Reactjs

Mở source code lên, **mở terminal đứng tại forder client**.

Trước tiên chạy lệnh `npm i` hoặc `npm install` để tại thư viện cần thiết. Nếu lỗi thì có thể thử `npm i -- force`.

Tiếp theo, mở terminal forder client chạy server lên bằng lệnh: `npm run dev`.

Tương tự server, client cũng có file .env, tạo file .evn ở client forder. Điền hết thông tin trong đó:

- `VITE_FB_API_KEY`, `VITE_FB_AUTH_DOMAIN`, `VITE_FB_PROJECT_ID`, `VITE_FB_STORAGE_BUCKET`, `VITE_FB_MESSAGING_SENDER_ID`, `VITE_FB_APP_ID` là đăng ký app trên firebase lấy được.
- `VITE_CLOUDINARY_NAME` và `VITE_CLOUDINARY_UPLOAD_PRESETS` tương ứng là cloud name của tài khoản Cloudinary và preset để upload _(Trong phần setting upload, tạo new upload preset kiểu unsigned)_
- `VITE_TINYCME_API_KEY` là đăng ký tài khoản của TinyMCE lấy free api key.
- `VITE_LIMIT_POSTS` là só lượng tin đăng hiện thị mỗi trang, recommend = 5

Truy cập `http://localhost:5173` để mở website.
