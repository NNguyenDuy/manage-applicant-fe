import React from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'

interface PDFViewerWrapperProps {
  fileUrl: string
}

export const PDFViewerWrapper: React.FC<PDFViewerWrapperProps> = ({
  fileUrl,
}) => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <Viewer
        fileUrl={fileUrl}
        onDocumentLoad={() => {
          const extraCanvas = document.querySelectorAll(
            '.rpv-core__canvas-layer canvas:not(:first-child)'
          )
          extraCanvas.forEach((canvas) => canvas.remove())
        }}
      />
    </Worker>
  )
}
