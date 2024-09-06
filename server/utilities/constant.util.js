const slugify = require("slugify")
const { faker } = require("@faker-js/faker")
const bcrypt = require("bcrypt")
const hashPassword = (password) => bcrypt.hashSync(password, 10)

const paymentStatus = ["Thành công", "Đang chờ", "Đã hủy"]
const roles = ["ADMIN", "USER", "MANAGER"]
module.exports = {
  allRoles: [
    {
      code: "ADMIN",
      value: "Quản trị viên",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: "MANAGER",
      value: "Chủ trọ",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: "USER",
      value: "Thành viên",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  catalogs: [
    {
      value: "Trang chủ",
      slug: slugify("Trang chủ").toLowerCase(),
      text: "Tìm kiếm chỗ thuê ưng ý",
      createdAt: new Date(),
      updatedAt: new Date(),
      description:
        "Kênh thông tin Phòng trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.",
    },
    {
      value: "Cho thuê phòng trọ",
      slug: slugify("Cho thuê phòng trọ").toLowerCase(),
      text: "Tho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất",
      createdAt: new Date(),
      updatedAt: new Date(),
      description:
        "Kênh thông tin Phòng trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.",
    },
    {
      value: "Cho thuê căn hộ",
      slug: slugify("Cho thuê căn hộ").toLowerCase(),
      text: "Cho Thuê Căn Hộ Chung Cư, Giá Rẻ, View Đẹp, Mới Nhất",
      createdAt: new Date(),
      updatedAt: new Date(),
      description:
        "Cho thuê căn hộ - Kênh đăng tin cho thuê căn hộ số 1: giá rẻ, chính chủ, đầy đủ tiện nghi. Cho thuê chung cư với nhiều mức giá, diện tích cho thuê khác nhau.",
    },
    {
      value: "Tìm người ở ghép",
      slug: slugify("Tìm người ở ghép").toLowerCase(),
      text: "Tìm Người Ở Ghép, Tìm Nam Ở Ghép, Tìm Nữ Ở Ghép, Mới Nhất",
      createdAt: new Date(),
      updatedAt: new Date(),
      description:
        "Tìm người ở ghép, tìm nam ở ghép, tìm nữ ở ghép, share phòng trọ, tìm chỗ ở ghép cùng, tìm bạn ở ghép, xin ở ghép mới nhất 2023. Đăng tin ở ghép hiệu quả, nhanh chóng nhất...",
    },
  ],
  convenients: [
    {
      name: "Wifi miễn phí",
      image: "/convenients/wifi.svg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Chỗ đỗ xe miễn phí",
      image: "/convenients/parkcar.svg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Có máy giặt chung",
      image: "/convenients/washing.svg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Điều hòa nhiệt độ",
      image: "/convenients/conditioner.svg",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  users: Array.from([...Array(10).keys()]).map(() => ({
    username: faker.internet.userName(),
    phone: "0" + faker.string.numeric(9),
    password: hashPassword("123456"),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  posts: Array.from([...Array(20).keys()]).map(() => ({
    title: faker.lorem.sentence({ min: 5, max: 10 }),
    description: faker.lorem.sentences({ max: 10, min: 5 }),
    address: faker.location.streetAddress({ useFullAddress: true }),
    catalogId: faker.number.int({ max: 4, min: 2 }),
    images: JSON.stringify(
      Array.from([...Array(faker.number.int({ max: 8, min: 4 })).keys()]).map(
        () =>
          `${faker.image.urlLoremFlickr({
            category: "houses",
          })}?random=${faker.string.numeric(30)}`
      )
    ),
    postedBy: faker.number.int({ max: 10, min: 1 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    star: faker.number.float({ max: 5, min: 1, precision: 0.1 }),
  })),
  rooms: Array.from([...Array(40).keys()]).map(() => ({
    price: faker.string.numeric({ length: { min: 3, max: 5 } }) * 1000,
    electricPrice: faker.string.numeric({ length: { min: 1, max: 1 } }) * 1000,
    waterPrice: faker.string.numeric({ length: { min: 2, max: 2 } }) * 1000,
    capsPrice: faker.string.numeric({ length: { min: 2, max: 2 } }) * 1000,
    internetPrice: faker.string.numeric({ length: { min: 3, max: 3 } }) * 1000,
    area: faker.number.int({ min: 20, max: 200 }),
    title: faker.lorem.sentence({ min: 4, max: 6 }),
    postId: faker.number.int({ max: 20, min: 1 }),
    stayMax: faker.number.int({ max: 4, min: 1 }),
    position: "Còn trống",
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  rentedRooms: Array.from([...Array(20).keys()]).map(() => ({
    price: faker.string.numeric({ length: { min: 3, max: 5 } }) * 1000,
    electricPrice: faker.string.numeric({ length: { min: 1, max: 1 } }) * 1000,
    waterPrice: faker.string.numeric({ length: { min: 2, max: 2 } }) * 1000,
    capsPrice: faker.string.numeric({ length: { min: 2, max: 2 } }) * 1000,
    internetPrice: faker.string.numeric({ length: { min: 3, max: 3 } }) * 1000,
    area: faker.number.int({ min: 20, max: 200 }),
    title: faker.lorem.sentence({ min: 4, max: 6 }),
    postId: faker.number.int({ max: 20, min: 1 }),
    stayMax: faker.number.int({ max: 4, min: 1 }),
    status: "Còn trống",
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  room_convenients: Array.from([...Array(80).keys()]).map(() => ({
    roomId: faker.number.int({ max: 40, min: 1 }),
    convenientId: faker.number.int({ max: 4, min: 1 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  user_role: [
    ...Array.from([...Array(8).keys()]).map((el, idx) => ({
      userId: idx + 1,
      roleCode: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    {
      userId: 9,
      roleCode: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 10,
      roleCode: "MANAGER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 10,
      roleCode: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 9,
      roleCode: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  payments: Array.from([...Array(20).keys()]).map((el, idx) => ({
    roomId: idx + 1,
    userId: faker.number.int({ max: 20, min: 1 }),
    total: faker.string.numeric({ length: { min: 3, max: 5 } }) * 1000,
    email: faker.internet.email({ provider: "gmail.com" }),
    status: paymentStatus[faker.number.int({ max: 2, min: 0 })],
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
}
