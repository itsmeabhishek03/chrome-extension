import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import IpComponent from "~components/IpComponent"


export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <IpComponent/>
    </div>
  )
}

export default PlasmoOverlay
