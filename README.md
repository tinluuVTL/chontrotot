# Hướng dẫn cài đặt chạy web trên máy tính Local

Để chạy được web phải cần 3 yếu tố:

- 1 postgres server - database chạy local _(Cái này lên mạng tải postgressql về máy và cài đặt như bình thường.)_
- 1 server _(xử lý logic phía sau trang web)_
- 1 client _(hiển thị giao diện UI)_

### 1. Cài đặt server postgres - Database

Truy cập vào link [download này](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) để tại postgres vê. Sau đó cài đặt bình thường nếu chưa có postgres trên máy, có thể xem hướng dẫn trên mạng.


### 2. Cài và chạy server nodejs

Khúc này nếu máy chưa có cài nodejs thì tải và cài trước nhé. Có thể vào terminal và chạy lệnh `node -v` để check xem có node chưa và `npm -v` để check xem có cài `npm` chưa.

Mở source code lên, **mở terminal đứng tại forder server**.

Trước tiên chạy lệnh `npm i` hoặc `npm install` để tại thư viện cần thiết. Nếu lỗi thì có thể thử `npm i -- force`.


### 3. Chạy client Reactjs

Mở source code lên, **mở terminal đứng tại forder client**.

Trước tiên chạy lệnh `npm i` hoặc `npm install` để tại thư viện cần thiết. Nếu lỗi thì có thể thử `npm i -- force`.

Truy cập `http://localhost:5173` để mở website.
