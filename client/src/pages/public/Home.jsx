import { HomeSection } from "~/components/posts"
import { useAppStore } from "~/store"

const Home = () => {
  const { catalogs } = useAppStore()
  return (
    <main className="w-full bg-white lg:w-main px-4 py-4 mx-auto">
      <h1 className="text-3xl font-semibold mt-3">{catalogs?.find((el) => el.slug === "trang-chu")?.text}</h1>
      <span className="text-base line-clamp-2 block my-4">
        {catalogs?.find((el) => el.slug === "trang-chu")?.description}
      </span>
      <HomeSection filters={{ sort: "-star" }} title="Tin đăng nổi bật" />
      <HomeSection filters={{ sort: "-createdAt" }} title="Tin đăng mới nhất" />
    </main>
  )
}

export default Home
