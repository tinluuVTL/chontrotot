import React, { useRef, useEffect } from "react"
import WebViewer from "@pdftron/webviewer"
import { usePostStore } from "~/store"
const ViewContract = () => {
  const viewer = useRef(null)
  const { contractData, setContractData, ownerData } = usePostStore()
  useEffect(() => {
    document.title = "Xem hợp đồng - Chọn trọ tốt"
    WebViewer(
      {
        path: "/webviewer/public",
        initialDoc: "/files/hdt.docx",
        licenseKey: import.meta.env.VITE_APRYSE_API_KEY,
      },
      viewer.current
    ).then(async (instance) => {
      const { documentViewer } = instance.Core

      documentViewer.addEventListener("documentLoaded", async () => {
        const doc = documentViewer.getDocument()
        const keys = await doc.getTemplateKeys()
        console.log(keys)
        const data = Object.entries({ ...contractData, ...ownerData })
        const options = {}
        for (const key of keys) {
          options[key] = data.find((el) => el[0] === key)[1]
        }
        await documentViewer.getDocument().applyTemplateValues(options)
      })
    })

    return () => {
      setContractData(null)
    }
  }, [])
  return <div className="webviewer h-screen w-screen" ref={viewer}></div>
}

export default ViewContract
