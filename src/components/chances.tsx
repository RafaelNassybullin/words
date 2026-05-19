
import { useFilms } from "../zustand/state.ts"

export function Chances() {


  const { pageTicketTest, chances } = useFilms()


  return (
    <>
      {pageTicketTest && <div style={{ display: "flex", width: "120px", justifyContent: "space-between" }}>
        {
          chances === 0 && <>
            <div className="chance"><img src={"https://words-plum.vercel.app/broken.webp"} /></div>
            <div className="chance"><img src={"https://words-plum.vercel.app/broken.webp"} /></div>
            <div className="chance"><img src={"https://words-plum.vercel.app/broken.webp"} /></div>
          </>
        }
        {
          chances === 1 && <>
            <div className="chance"><img src={"https://words-plum.vercel.app/heart.webp"} /></div>
            <div className="chance"><img src={"https://words-plum.vercel.app/broken.webp"} /></div>
            <div className="chance"><img src={"https://words-plum.vercel.app/broken.webp"} /></div>
          </>
        }
        {
          chances === 2 && <>
            <div className="chance"><img src={"https://words-plum.vercel.app/heart.webp"} /></div>
            <div className="chance"><img src={"https://words-plum.vercel.app/heart.webp"} /></div>
            <div className="chance"><img src={"https://words-plum.vercel.app/broken.webp"} /></div>
          </>
        }
        {
          chances === 3 && <>
            <div className="chance"><img src={"https://words-plum.vercel.app/heart.webp"} /></div>
            <div className="chance"><img src={"https://words-plum.vercel.app/heart.webp"} /></div>
            <div className="chance"><img src={"https://words-plum.vercel.app/heart.webp"} /></div>
          </>
        }
      </div>}
    </>
  )
}



