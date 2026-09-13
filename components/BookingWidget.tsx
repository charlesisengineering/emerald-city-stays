'use client'

import React, { useEffect, useRef } from 'react'
import { HOSPITABLE_SITE_UUID } from '@/libs/properties'

// Hospitable's direct-booking-widget loader. It reads its config from data-*
// attributes on its own <script> tag and, when given data-container, appends
// the booking iframe into that element by id (otherwise it drops the iframe
// after the script tag, which is fragile under React's dev double-mount). We
// render a stable container div and point the loader at it. Replaces the
// deprecated iframe embed.
const WIDGET_LOADER_SRC =
  'https://cdn.hsptb.com/direct-booking-widget/widget-loader.prod.js'

interface BookingWidgetProps {
  propertyId: string // Hospitable data-property-id (PROPERTIES[slug].widgetId)
  theme?: string
}

const BookingWidget: React.FC<BookingWidgetProps> = ({
  propertyId,
  theme = 'default',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const containerId = `hospitable-booking-${propertyId}`

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const script = document.createElement('script')
    script.src = WIDGET_LOADER_SRC
    script.async = true
    script.setAttribute('data-site-uuid', HOSPITABLE_SITE_UUID)
    script.setAttribute('data-property-id', propertyId)
    script.setAttribute('data-theme', theme)
    script.setAttribute('data-container', containerId)
    document.body.appendChild(script)

    return () => {
      // Drop the loader script and the iframe it rendered so a re-mount (dev
      // double-invoke, or client-side navigation between listings) doesn't
      // leave a stale widget or hit the loader's one-iframe-per-page guard.
      script.remove()
      container.innerHTML = ''
    }
  }, [propertyId, theme, containerId])

  return <div id={containerId} ref={containerRef} className="w-full" />
}

export default BookingWidget
