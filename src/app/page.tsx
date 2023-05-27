import * as Sec from './../imports/imports'

export default function Home() {
  return (
    <div className="items-center flex flex-col">
      <Sec.HeaderHome />
      <Sec.Banner />
      <Sec.About />
      <Sec.BecauseUse />
      <Sec.Contact />
      <Sec.FooterHome />
    </div>
  )
}